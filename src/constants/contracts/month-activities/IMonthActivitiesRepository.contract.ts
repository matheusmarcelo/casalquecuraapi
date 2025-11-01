import { MonthActivities } from "src/entitites/mont-activities/month_activities.entity";

export interface IMonthActivitiesRepository {
    createMonthActivityAsync(entity: MonthActivities): Promise<void>;
    updateMonthActivityAsync(id: string, totalScore: number): Promise<void>;
    getMonthActivityAsync(customerId: string, month: number, year: number): Promise<MonthActivities | null>;
    getMonthlyActivitiesAsync(customerId: string): Promise<MonthActivities[]>;
}