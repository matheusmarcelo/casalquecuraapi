import { ActivityDto } from "src/dtos/activity/activity.dto";
import { IActivityRepository } from "./IActivityRepository.contract";

export interface IActivityService extends Omit<IActivityRepository, 'createActivityAsync' | 'updateActivityAsync'> {
    createActivityAsync(activityDto: ActivityDto): Promise<void>;
    updateActivityAsync(id: string, activity: ActivityDto): Promise<void>;
}
