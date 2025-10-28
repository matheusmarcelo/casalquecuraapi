import type { IActivityService } from 'src/constants/contracts/activity/IActivityService.contract';
import { ActivityDto } from 'src/dtos/activity/activity.dto';
import { FindActivitiesDto } from 'src/dtos/activity/findActivities.dto';
import { Activity } from 'src/entitites/activity/activity.entity';
export declare class ActivityController {
    private readonly activityService;
    constructor(activityService: IActivityService);
    createActivityAsync(activityDto: ActivityDto): Promise<void>;
    updateActivityAsync(id: string, activity: Activity): Promise<void>;
    getActivityAsync(id: string): Promise<Activity | null>;
    getActivitiesAsync(params: FindActivitiesDto): Promise<Activity[]>;
    deleteActivitiesAsync(id: string): Promise<void>;
}
