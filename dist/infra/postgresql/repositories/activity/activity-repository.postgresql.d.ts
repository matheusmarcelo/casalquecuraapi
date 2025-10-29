import { IActivityRepository } from 'src/constants/contracts/activity/IActivityRepository.contract';
import { FindActivitiesDto } from 'src/dtos/activity/findActivities.dto';
import { Activity } from 'src/entitites/activity/activity.entity';
import { Repository } from 'typeorm';
export declare class ActivityRepositoryPostgresql implements IActivityRepository {
    private readonly activityRepository;
    constructor(activityRepository: Repository<Activity>);
    createActivityAsync(activity: Activity): Promise<Activity>;
    getActivityAsync(id: string): Promise<Activity | null>;
    getActivitiesAsync(params: FindActivitiesDto): Promise<Activity[]>;
    updateActivityAsync(id: string, activity: Activity): Promise<void>;
    deleteActivityAsync(id: string): Promise<void>;
}
