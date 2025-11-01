import type { IActivityRepository } from 'src/constants/contracts/activity/IActivityRepository.contract';
import { IActivityService } from 'src/constants/contracts/activity/IActivityService.contract';
import type { ICustomerActivityRepository } from 'src/constants/contracts/customer-activity/ICustomerActivitiesRepository.contract';
import type { IDalyActivitiesRepository } from 'src/constants/contracts/daly-activities/IDalyActivitiesRepository.contract';
import type { IMonthActivitiesRepository } from 'src/constants/contracts/month-activities/IMonthActivitiesRepository.contract';
import { ActivityDto } from 'src/dtos/activity/activity.dto';
import { FindActivitiesDto } from 'src/dtos/activity/findActivities.dto';
import { DalyActivitiesDto } from 'src/dtos/daly_activities/daly_activities.dto';
import { Activity } from 'src/entitites/activity/activity.entity';
import { DalyActivities } from 'src/entitites/daly-activities/daly_activities.entity';
import { MonthActivities } from 'src/entitites/mont-activities/month_activities.entity';
export declare class ActivityService implements IActivityService {
    private readonly activityRepository;
    private readonly customerActivityRepository;
    private readonly dalyActivityRepository;
    private readonly monthActivityRepository;
    constructor(activityRepository: IActivityRepository, customerActivityRepository: ICustomerActivityRepository, dalyActivityRepository: IDalyActivitiesRepository, monthActivityRepository: IMonthActivitiesRepository);
    createActivityAsync(activityDto: ActivityDto): Promise<void>;
    getActivityAsync(id: string): Promise<Activity | null>;
    getActivitiesAsync(params: FindActivitiesDto): Promise<Activity[]>;
    updateActivityAsync(id: string, activity: ActivityDto): Promise<void>;
    deleteActivityAsync(id: string): Promise<void>;
    markActivityCompletedAsync(dalyActivityDto: DalyActivitiesDto): Promise<void>;
    getDalyActivitiesAsync(customerId: string): Promise<DalyActivities[]>;
    getMonthlyActivitiesAsync(customerId: string): Promise<MonthActivities[]>;
    private createOrUpdateMonthActivityAsync;
    private getMonthAndYear;
}
