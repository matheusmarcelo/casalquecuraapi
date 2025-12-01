import { MonthActivities } from "src/entitites/mont-activities/month_activities.entity";
export interface IMonthActivitiesRepository {
    createMonthActivityAsync(entity: MonthActivities): Promise<void>;
    updateMonthActivityAsync(id: string, totalScore: number): Promise<void>;
    getMonthActivityAsync(month: number, year: number, customerOrLinkedUserId?: string): Promise<MonthActivities | null>;
    getMonthlyActivitiesAsync(customerOrLinkedUserId: string): Promise<MonthActivities[]>;
    getTotalMonthActivitiesAsync(customerOrLinkedUserId: string): Promise<number>;
}
