import { Global, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ICustomerActivityRepository } from 'src/constants/contracts/customer-activity/ICustomerActivitiesRepository.contract';
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

        const dalyActivities = await this.dalyActivitiesRepository
            .createQueryBuilder('da')
            .innerJoinAndSelect('da.activity', 'activity')
            .where('CAST(da.completion_date AS date) = :today', { today })
            .andWhere('da.user_id = :customerId', { customerId })
            .getMany();

        const completedActivityIds = new Set(
            dalyActivities.map((d) => d.activity.id)
        );

        const availableGeneralActivities = activities.filter(
            (a) => !completedActivityIds.has(a.id)
        );

        const availableUserActivities = customerActivities.filter(
            (ua) => !completedActivityIds.has(ua.activity.id)
        );

        const userActivities = availableUserActivities.map(x => x.activity);

        userActivities.forEach(activity => {
            const alreadyExists = availableGeneralActivities.some(a => a.id === activity.id);
            if (!alreadyExists) {
                availableGeneralActivities.push(activity);
            }
        });

        // Juntar tudo
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

    async getCustomerActivityByCustomerIdAndActivityIdAsync(customerId: string, activityId: string): Promise<CustomerActivity | null> {
        const customerActivity = await this.customerActivityRepository.findOneBy({
            customer: { id: customerId },
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

        console.log(existingRecords);

        // 2. Cria um Set com os customer_ids que já existem (rápido para lookup)
        const existingCustomerIds = new Set(
            existingRecords.map(record => record.customer.id),
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
