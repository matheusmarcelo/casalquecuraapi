import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IMonthActivitiesRepository } from 'src/constants/contracts/month-activities/IMonthActivitiesRepository.contract';
import { DalyActivities } from 'src/entitites/daly-activities/daly_activities.entity';
import { MonthActivities } from 'src/entitites/mont-activities/month_activities.entity';
import { NumericHelper } from 'src/helpers/numeric.helpers';
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

    async getMonthActivityAsync(month: number, year: number, customerOrLinkedUserId?: string): Promise<MonthActivities | null> {
        const isNumeric = new NumericHelper().isNumeric(customerOrLinkedUserId || '0');
        if (isNumeric) {
            return await this.monthActivityRepository.findOne({
                where: {
                    linkedUserId: { id: customerOrLinkedUserId },
                    month,
                    year
                }
            });

        } else {
            return await this.monthActivityRepository.findOne({
                where: {
                    user: { id: customerOrLinkedUserId },
                    month,
                    year
                }
            });
        }
    }

    async getMonthlyActivitiesAsync(customerOrLinkedUserId: string): Promise<MonthActivities[]> {
        const isNumeric = new NumericHelper().isNumeric(customerOrLinkedUserId);
        if (isNumeric) {
            return await this.monthActivityRepository.find({
                where: { user: { id: customerOrLinkedUserId } }
            });
        } else {
            return await this.monthActivityRepository.find({
                where: { linkedUserId: { id: customerOrLinkedUserId } }
            });
        }
    }

    async getTotalMonthActivitiesAsync(customerOrLinkedUserId: string): Promise<number> {
        const isNumeric = new NumericHelper().isNumeric(customerOrLinkedUserId);
        const totalActivitiesThisMonth = this.dalyActivityRepository
            .createQueryBuilder('activity');

        if (isNumeric) {
            totalActivitiesThisMonth.where('activity.linked_user_id = :userId', { userId: customerOrLinkedUserId });
        } else {
            totalActivitiesThisMonth.where('activity.user_id = :userId', { userId: customerOrLinkedUserId });
        }

        const data = await totalActivitiesThisMonth.andWhere(
            `activity.completion_date BETWEEN 
            date_trunc('month', CURRENT_DATE) AND CURRENT_TIMESTAMP`
        ).getCount();

        return data || 0;
    }
} 
