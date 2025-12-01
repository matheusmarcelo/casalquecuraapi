import { IMonthActivitiesRepository } from 'src/constants/contracts/month-activities/IMonthActivitiesRepository.contract';
import { DalyActivities } from 'src/entitites/daly-activities/daly_activities.entity';
import { MonthActivities } from 'src/entitites/mont-activities/month_activities.entity';
import { Repository } from 'typeorm';
export declare class MonthActivitiesRepositoryPostgresql implements IMonthActivitiesRepository {
    private readonly monthActivityRepository;
    private readonly dalyActivityRepository;
    constructor(monthActivityRepository: Repository<MonthActivities>, dalyActivityRepository: Repository<DalyActivities>);
    createMonthActivityAsync(entity: MonthActivities): Promise<void>;
    updateMonthActivityAsync(id: string, totalScore: number): Promise<void>;
    getMonthActivityAsync(month: number, year: number, customerOrLinkedUserId?: string): Promise<MonthActivities | null>;
    getMonthlyActivitiesAsync(customerOrLinkedUserId: string): Promise<MonthActivities[]>;
    getTotalMonthActivitiesAsync(customerOrLinkedUserId: string): Promise<number>;
}
