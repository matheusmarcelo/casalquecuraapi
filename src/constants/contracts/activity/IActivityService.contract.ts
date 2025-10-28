import { ActivityDto } from "src/dtos/activity/activity.dto";
import { IActivityRepository } from "./IActivityRepository.contract";

export interface IActivityService extends IActivityRepository {
    createActivityAsync(activityDto: ActivityDto): Promise<void>;
}
