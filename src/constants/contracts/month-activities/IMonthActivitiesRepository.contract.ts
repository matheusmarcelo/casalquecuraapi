import { MonthActivities } from "src/entitites/mont-activities/month_activities.entity";

export interface IMonthActivitiesRepository {
    createMonthActivityAsync(entity: MonthActivities): Promise<void>;
    updateMonthActivityAsync(id: string, entity: MonthActivities): Promise<void>;
    getMonthActivityAsync(customerId: string, month: number, year: number): Promise<MonthActivities | null>;
    getMonthActivitiesAsync(customerId: string): Promise<MonthActivities[]>;
}