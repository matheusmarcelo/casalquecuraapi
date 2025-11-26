import { ActivityDto } from "src/dtos/activity/activity.dto";
import { IActivityRepository } from "./IActivityRepository.contract";
import { DalyActivitiesDto } from "src/dtos/daly_activities/daly_activities.dto";
import { DalyActivities } from "src/entitites/daly-activities/daly_activities.entity";
import { IMonthActivitiesRepository } from "../month-activities/IMonthActivitiesRepository.contract";
import { MonthActivitiesDto } from "src/dtos/month_activities/month_activities.dto";
import { MonthActivities } from "src/entitites/mont-activities/month_activities.entity";
import { ChartReportInterval } from "src/constants/enums/chartReport/chartReport.enum";
import { ReportDto } from "src/dtos/chart_report/chart_report.dto";

export interface IActivityService extends Omit<IActivityRepository, 'createActivityAsync' | 'updateActivityAsync'> {
    createActivityAsync(activityDto: ActivityDto): Promise<void>;
    updateActivityAsync(id: string, activity: ActivityDto): Promise<void>;
    markActivityCompletedAsync(dalyActivityDto: DalyActivitiesDto): Promise<void>;
    getDalyActivitiesAsync(customerId: string): Promise<DalyActivities[]>;
    getMonthlyActivitiesAsync(customerId: string): Promise<MonthActivities[]>;
    getCustomerReportAsync(customerId: string, days: ChartReportInterval): Promise<ReportDto>;
}
