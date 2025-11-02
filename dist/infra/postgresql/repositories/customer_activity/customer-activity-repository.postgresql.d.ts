import { ICustomerActivityRepository } from 'src/constants/contracts/customer-activity/ICustomerActivitiesRepository.contract';
import { Activity } from 'src/entitites/activity/activity.entity';
import { CustomerActivity } from 'src/entitites/customer-activity/customer-activity.entity';
import { DalyActivities } from 'src/entitites/daly-activities/daly_activities.entity';
import { Repository } from 'typeorm';
export declare class CustomerActivityRepositoryPostgresql implements ICustomerActivityRepository {
    private readonly customerActivityRepository;
    private readonly activitiesRepository;
    private readonly dalyActivitiesRepository;
    constructor(customerActivityRepository: Repository<CustomerActivity>, activitiesRepository: Repository<Activity>, dalyActivitiesRepository: Repository<DalyActivities>);
    createCustomerActivityAsync(customer_activity: CustomerActivity): Promise<void>;
    getCustomerActivityAsync(id: string): Promise<CustomerActivity | null>;
    getCustomerActivitiesAsync(customerId: string): Promise<Activity[]>;
    getCustomerActivitiesByActivityIdAsync(activityId: string): Promise<CustomerActivity[]>;
    deleteCustomerActivityAsync(id: string): Promise<void>;
    getCustomerActivityByCustomerIdAndActivityIdAsync(customerId: string, activityId: string): Promise<CustomerActivity | null>;
    assignCustomersToActivityAsync(activityId: string, customerIds: string[]): Promise<void>;
    deleteMultipleActivitiesAsync(ids: string[]): Promise<void>;
}
