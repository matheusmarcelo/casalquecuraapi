import type { IActivityService } from 'src/constants/contracts/activity/IActivityService.contract';
import { ActivityDto } from 'src/dtos/activity/activity.dto';
import { FindActivitiesDto } from 'src/dtos/activity/findActivities.dto';
import { DalyActivitiesDto } from 'src/dtos/daly_activities/daly_activities.dto';
import { Activity } from 'src/entitites/activity/activity.entity';
import { DalyActivities } from 'src/entitites/daly-activities/daly_activities.entity';
import { MonthActivities } from 'src/entitites/mont-activities/month_activities.entity';
export declare class ActivityController {
    private readonly activityService;
    constructor(activityService: IActivityService);
    createActivityAsync(activityDto: ActivityDto): Promise<void>;
    updateActivityAsync(id: string, activity: ActivityDto): Promise<void>;
    getActivityAsync(id: string): Promise<Activity | null>;
    getActivitiesAsync(params: FindActivitiesDto): Promise<Activity[]>;
    deleteActivitiesAsync(id: string): Promise<void>;
    markActivityCompletedAsync(dalyActivityDto: DalyActivitiesDto): Promise<void>;
    getDalyActivitiesAsync(customerId: string): Promise<DalyActivities[]>;
    getMonthlyActivitiesAsync(customerId: string): Promise<MonthActivities[]>;
    getCustomerReportAsync(customerId: string, days?: string): Promise<any>;
}
