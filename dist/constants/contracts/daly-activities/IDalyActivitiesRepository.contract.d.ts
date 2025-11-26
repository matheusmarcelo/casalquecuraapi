import { CustomerChartReportDto } from "src/dtos/chart_report/chart_report.dto";
import { DalyActivities } from "src/entitites/daly-activities/daly_activities.entity";
export interface IDalyActivitiesRepository {
    createDalyActivityAsync(entity: DalyActivities): Promise<void>;
    getDalyActivitiesAsync(customerId: string): Promise<DalyActivities[]>;
    getTotalActivitiesWeekAsync(customerId: string): Promise<number>;
    getChartData(customerId: string, days: 7 | 15 | 30): Promise<CustomerChartReportDto>;
    getCustomerTotalActivitiesDoneAsync(customerId: string): Promise<number>;
    getCustomerTotalPointsAsync(customerId: string): Promise<number>;
}
