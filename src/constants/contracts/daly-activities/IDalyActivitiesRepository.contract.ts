import { CustomerChartReportDto } from "src/dtos/chart_report/chart_report.dto";
import { DalyActivities } from "src/entitites/daly-activities/daly_activities.entity";

export interface IDalyActivitiesRepository {
    createDalyActivityAsync(entity: DalyActivities): Promise<void>;
    getDalyActivitiesAsync(customerOrLinkedUserId: string): Promise<DalyActivities[]>;
    getTotalActivitiesWeekAsync(customerOrLinkedUserId: string): Promise<number>;
    getChartData(customerOrLinkedUserId: string, days: 7 | 15 | 30): Promise<CustomerChartReportDto>;
    getCustomerTotalActivitiesDoneAsync(customerOrLinkedUserId: string): Promise<number>;
    getCustomerTotalPointsAsync(customerOrLinkedUserId: string): Promise<number>;
}