import { Global, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ICustomerActivityRepository } from 'src/constants/contracts/customer-activity/ICustomerActivitiesRepository.contract';
import type { ILinkedUsersRepository } from 'src/constants/contracts/linked-users/ILinkedUsersRepository.contract';
import { DITokensRepository } from 'src/constants/enums/DITokens/DITokens.enum';
import { Activity } from 'src/entitites/activity/activity.entity';
import { CustomerActivity } from 'src/entitites/customer-activity/customer-activity.entity';
import { DalyActivities } from 'src/entitites/daly-activities/daly_activities.entity';
import { In, Repository } from 'typeorm';

@Global()
@Injectable()
export class CustomerActivityRepositoryPostgresql implements ICustomerActivityRepository {

    constructor(
        @InjectRepository(CustomerActivity)
        private readonly customerActivityRepository: Repository<CustomerActivity>,
        @InjectRepository(Activity)
        private readonly activitiesRepository: Repository<Activity>,
        @InjectRepository(DalyActivities)
        private readonly dalyActivitiesRepository: Repository<DalyActivities>,
        @Inject(DITokensRepository.LINKED_USERS_REPOSITORY)
        private readonly linkedUsersRepository: ILinkedUsersRepository,
    ) { }

    async createCustomerActivityAsync(customer_activity: CustomerActivity): Promise<void> {
        await this.customerActivityRepository.save(customer_activity);
    }

    async getCustomerActivityAsync(id: string): Promise<CustomerActivity | null> {
        const customerActivity = await this.customerActivityRepository.findOne({ where: { id } });
        return customerActivity;
    }

    async getCustomerActivitiesAsync(customerId: string): Promise<Activity[]> {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const response: Activity[] = [];

        const activities = await this.activitiesRepository.find({
            where: { isGeneral: true },
        });

        const customerActivities = await this.customerActivityRepository.find({
            where: { customer: { id: customerId } },
            relations: ['activity'],
        });

        const linkedUsersId = await this.linkedUsersRepository.getLinkedUsersAsync(customerId);
        let linkedUsersActivities: CustomerActivity[] = [];

        if (linkedUsersId) {
            linkedUsersActivities = await this.customerActivityRepository.find({
                where: { linkedUserId: { id: linkedUsersId.id } },
                relations: ['activity'],
            });
        }

        const dalyActivities = await this.dalyActivitiesRepository
            .createQueryBuilder('da')
            .innerJoinAndSelect('da.activity', 'activity')
            .where('CAST(da.completion_date AS date) = :today', { today })
            .andWhere('da.user_id = :customerId', { customerId })
            .getMany();

        const dalyActivitiesLinked = await this.dalyActivitiesRepository
            .createQueryBuilder('da')
            .innerJoinAndSelect('da.activity', 'activity')
            .where('CAST(da.completion_date AS date) = :today', { today })
            .andWhere('da.linked_user_id = :linkedUserId', { linkedUserId: linkedUsersId?.id })
            .getMany() || [];


        const completedActivityIds = new Set(
            dalyActivities.map((d) => d.activity.id)
        );

        const completedLinkedActivityIds = new Set(
            dalyActivitiesLinked.map((d) => d.activity.id)
        );

        const availableGeneralActivities = activities.filter(
            (a) => !completedActivityIds.has(a.id)
        );

        const availableUserActivities = customerActivities.filter(
            (ua) => !completedActivityIds.has(ua.activity.id)
        );

        const availableLinkedUsersActivities = linkedUsersActivities.filter(
            (lua) => !completedLinkedActivityIds.has(lua.activity.id),
        );

        const userActivities = availableUserActivities.map(x => x.activity);

        userActivities.forEach(activity => {
            const alreadyExists = availableGeneralActivities.some(a => a.id === activity.id);
            if (!alreadyExists) {
                availableGeneralActivities.push(activity);
            }
        });

        const linkedUsersActivitiesMap = availableLinkedUsersActivities.map(x => ({
            ...x.activity,
            isLinkedUsersActivity: true
        }));


        linkedUsersActivitiesMap.forEach(activity => {
            availableGeneralActivities.push(activity);
        });

        response.push(...availableGeneralActivities);

        return response;
    }

    async getCustomerActivitiesByActivityIdAsync(activityId: string): Promise<CustomerActivity[]> {
        const customerActivities = await this.customerActivityRepository.find({
            where: {
                activity: { id: activityId },
            },
            select: ['id']
        });

        return customerActivities;
    }

    async deleteCustomerActivityAsync(id: string): Promise<void> {
        await this.customerActivityRepository.delete(id);
    }

    async getCustomerActivityByCustomerIdAndActivityIdAsync(activityId: string, customerId?: string): Promise<CustomerActivity | null> {
        const customerActivity = await this.customerActivityRepository.findOneBy({
            customer: { id: customerId },
            activity: { id: activityId }
        });

        return customerActivity;
    }

    async getCustomerActivityByLinkedUserIdAndActivityIdAsync(activityId: string, linkedUserId?: string): Promise<CustomerActivity | null> {
        const customerActivity = await this.customerActivityRepository.findOneBy({
            linkedUserId: { id: linkedUserId },
            activity: { id: activityId }
        });

        return customerActivity;
    }

    async assignCustomersToActivityAsync(activityId: string, customerIds: string[]): Promise<void> {
        // 1. Busca todos os registros existentes de uma vez (1 query)
        const existingRecords = await this.customerActivityRepository
            .createQueryBuilder('ca')
            .innerJoinAndSelect('ca.customer', 'customer')
            .where('ca.activity_id = :activityId', { activityId })
            .andWhere('ca.user_id IN (:...customerIds)', { customerIds })
            .getMany();

        // 2. Cria um Set com os customer_ids que já existem (rápido para lookup)
        const existingCustomerIds = new Set(
            existingRecords.map(record => record.customer?.id || record.linkedUserId?.id),
        );

        // 3. Filtra apenas os IDs que NÃO existem
        const newCustomerIds = customerIds.filter(
            id => !existingCustomerIds.has(id)
        );

        // 4. Insere apenas os novos (1 query bulk insert)
        if (newCustomerIds.length > 0) {
            const values = newCustomerIds.map(customerId => ({
                customer: customerId as any,  // ← Nome da propriedade na entidade
                activity: activityId as any,  // ← Nome da propriedade na entidade
            }));

            await this.customerActivityRepository
                .createQueryBuilder()
                .insert()
                .into(CustomerActivity)
                .values(values)
                .execute();
        }
    }

    async deleteMultipleActivitiesAsync(ids: string[]): Promise<void> {
        await this.customerActivityRepository.delete({ id: In(ids) });
    }
}
