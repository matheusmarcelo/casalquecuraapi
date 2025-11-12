import { IMonthActivitiesRepository } from 'src/constants/contracts/month-activities/IMonthActivitiesRepository.contract';
import { MonthActivities } from 'src/entitites/mont-activities/month_activities.entity';
import { Repository } from 'typeorm';
export declare class MonthActivitiesRepositoryPostgresql implements IMonthActivitiesRepository {
    private readonly monthActivityRepository;
    constructor(monthActivityRepository: Repository<MonthActivities>);
    createMonthActivityAsync(entity: MonthActivities): Promise<void>;
    updateMonthActivityAsync(id: string, totalScore: number): Promise<void>;
    getMonthActivityAsync(customerId: string, month: number, year: number): Promise<MonthActivities | null>;
    getMonthlyActivitiesAsync(customerId: string): Promise<MonthActivities[]>;
}
