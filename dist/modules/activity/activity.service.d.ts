import type { IActivityRepository } from 'src/constants/contracts/activity/IActivityRepository.contract';
import { IActivityService } from 'src/constants/contracts/activity/IActivityService.contract';
import type { ICustomerActivityRepository } from 'src/constants/contracts/customer_activity/ICustomerActivitiesRepository.contract';
import { ActivityDto } from 'src/dtos/activity/activity.dto';
import { FindActivitiesDto } from 'src/dtos/activity/findActivities.dto';
import { Activity } from 'src/entitites/activity/activity.entity';
export declare class ActivityService implements IActivityService {
    private readonly activityRepository;
    private readonly customerActivityRepository;
    constructor(activityRepository: IActivityRepository, customerActivityRepository: ICustomerActivityRepository);
    createActivityAsync(activityDto: ActivityDto): Promise<void>;
    getActivityAsync(id: string): Promise<Activity | null>;
    getActivitiesAsync(params: FindActivitiesDto): Promise<Activity[]>;
    updateActivityAsync(id: string, activity: ActivityDto): Promise<void>;
    deleteActivityAsync(id: string): Promise<void>;
}
