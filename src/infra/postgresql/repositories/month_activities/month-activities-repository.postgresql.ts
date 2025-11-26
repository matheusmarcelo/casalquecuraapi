import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IMonthActivitiesRepository } from 'src/constants/contracts/month-activities/IMonthActivitiesRepository.contract';
import { DalyActivities } from 'src/entitites/daly-activities/daly_activities.entity';
import { MonthActivities } from 'src/entitites/mont-activities/month_activities.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MonthActivitiesRepositoryPostgresql implements IMonthActivitiesRepository {

    constructor(
        @InjectRepository(MonthActivities)
        private readonly monthActivityRepository: Repository<MonthActivities>,
        @InjectRepository(DalyActivities)
        private readonly dalyActivityRepository: Repository<DalyActivities>
    ) { }

    async createMonthActivityAsync(entity: MonthActivities): Promise<void> {
        await this.monthActivityRepository.save(entity);
    }

    async updateMonthActivityAsync(id: string, totalScore: number): Promise<void> {
        await this.monthActivityRepository.update(id, { totalScore });
    }

    async getMonthActivityAsync(customerId: string, month: number, year: number): Promise<MonthActivities | null> {
        return await this.monthActivityRepository.findOne({
            where: {
                user: { id: customerId },
                month,
                year
            }
        });
    }

    async getMonthlyActivitiesAsync(customerId: string): Promise<MonthActivities[]> {
        return await this.monthActivityRepository.find({ where: { user: { id: customerId } } });
    }

    async getTotalMonthActivitiesAsync(customerId: string): Promise<number> {
        const totalActivitiesThisMonth = await this.dalyActivityRepository
            .createQueryBuilder('activity')
            .where('activity.user_id = :userId', { userId: customerId })
            .andWhere(
                `activity.completion_date BETWEEN 
            date_trunc('month', CURRENT_DATE) AND CURRENT_DATE`
            )
            .getCount();

        return totalActivitiesThisMonth || 0;
    }
}
