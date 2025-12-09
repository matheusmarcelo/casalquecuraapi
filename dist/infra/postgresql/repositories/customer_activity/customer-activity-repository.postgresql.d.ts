import { ICustomerActivityRepository } from 'src/constants/contracts/customer-activity/ICustomerActivitiesRepository.contract';
import type { ILinkedUsersRepository } from 'src/constants/contracts/linked-users/ILinkedUsersRepository.contract';
import { ActivityDto } from 'src/dtos/activity/activity.dto';
import { Activity } from 'src/entitites/activity/activity.entity';
import { CustomerActivity } from 'src/entitites/customer-activity/customer-activity.entity';
import { DalyActivities } from 'src/entitites/daly-activities/daly_activities.entity';
import { Repository } from 'typeorm';
export declare class CustomerActivityRepositoryPostgresql implements ICustomerActivityRepository {
    private readonly customerActivityRepository;
    private readonly activitiesRepository;
    private readonly dalyActivitiesRepository;
    private readonly linkedUsersRepository;
    constructor(customerActivityRepository: Repository<CustomerActivity>, activitiesRepository: Repository<Activity>, dalyActivitiesRepository: Repository<DalyActivities>, linkedUsersRepository: ILinkedUsersRepository);
    createCustomerActivityAsync(customer_activity: CustomerActivity): Promise<void>;
    getCustomerActivityAsync(id: string): Promise<CustomerActivity | null>;
    getCustomerActivitiesAsync(customerId: string): Promise<Activity[]>;
    getCustomerActivitiesByActivityIdAsync(activityId: string): Promise<CustomerActivity[]>;
    deleteCustomerActivityAsync(id: string): Promise<void>;
    getCustomerActivityByCustomerIdAndActivityIdAsync(activityId: string, customerId?: string): Promise<CustomerActivity | null>;
    getCustomerActivityByLinkedUserIdAndActivityIdAsync(activityId: string, linkedUserId?: string): Promise<CustomerActivity | null>;
    assignCustomersToActivityAsync(activityId: string, customerIds: string[]): Promise<void>;
    deleteMultipleActivitiesAsync(ids: string[]): Promise<void>;
    getCustomerOrCoupleActivitiesAsync(type: string, id: string): Promise<ActivityDto[]>;
    private mapActivityToActivityDto;
}
