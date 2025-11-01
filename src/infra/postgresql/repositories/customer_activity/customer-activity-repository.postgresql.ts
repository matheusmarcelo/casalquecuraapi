import { Global, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ICustomerActivityRepository } from 'src/constants/contracts/customer-activity/ICustomerActivitiesRepository.contract';
import { CustomerActivity } from 'src/entitites/customer-activity/customer-activity.entity';
import { In, Repository } from 'typeorm';

@Global()
@Injectable()
export class CustomerActivityRepositoryPostgresql implements ICustomerActivityRepository {

    constructor(
        @InjectRepository(CustomerActivity)
        private readonly customerActivityRepository: Repository<CustomerActivity>
    ) { }

    async createCustomerActivityAsync(customer_activity: CustomerActivity): Promise<void> {
        await this.customerActivityRepository.save(customer_activity);
    }

    async getCustomerActivityAsync(id: string): Promise<CustomerActivity | null> {
        const customerActivity = await this.customerActivityRepository.findOne({ where: { id } });
        return customerActivity;
    }

    async getCustomerActivitiesAsync(customerId: string): Promise<CustomerActivity[]> {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        return await this.customerActivityRepository
            .createQueryBuilder('ca')
            .leftJoinAndSelect('ca.activity', 'activity')
            .leftJoin(
                'daly_activities',
                'da',
                'da.activity_id = activity.id AND da.user_id = :userId AND DATE(da.completion_date) = DATE(:today)',
                { userId: customerId, today }
            )
            .where('(ca.user_id = :customerId OR activity.isGeneral = :isGeneral)', {
                customerId,
                isGeneral: true
            })
            .andWhere('da.id IS NULL') // 👈 NÃO está no daly_activities hoje
            .getMany();
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
            .where('ca.activity_id = :activityId', { activityId })
            .andWhere('ca.user_id IN (:...customerIds)', { customerIds })
            .getMany();

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
