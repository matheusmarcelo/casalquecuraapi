import { MonthActivities } from "src/entitites/mont-activities/month_activities.entity";

export interface IMonthActivitiesRepository {
    createMonthActivityAsync(entity: MonthActivities): Promise<void>;
    updateMonthActivityAsync(id: string, entity: MonthActivities): Promise<void>;
    getMonthActivityAsync(customerId: string, mont: number, year: number): Promise<MonthActivities>;
    getMonthActivitiesAsync(customerId: string): Promise<MonthActivities[]>;
}