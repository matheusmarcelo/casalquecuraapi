import { FindActivitiesDto } from "src/dtos/activity/findActivities.dto";
import { Activity } from "src/entitites/activity/activity.entity";
export interface IActivityRepository {
    createActivityAsync(activity: Activity): Promise<void>;
    getActivityAsync(id: string): Promise<Activity | null>;
    getActivitiesAsync(params: FindActivitiesDto): Promise<Activity[]>;
    updateActivityAsync(id: string, activity: Activity): Promise<void>;
    deleteActivityAsync(id: string): Promise<void>;
}
