import { ICustomerActivityRepository } from 'src/constants/contracts/customer_activity/ICustomerActivitiesRepository.contract';
import { CustomerActivity } from 'src/entitites/customer-activity/customer-activity.entity';
import { Repository } from 'typeorm';
export declare class CustomerActivityRepositoryPostgresql implements ICustomerActivityRepository {
    private readonly customerActivityRepository;
    constructor(customerActivityRepository: Repository<CustomerActivity>);
    createCustomerActivityAsync(customer_activity: CustomerActivity): Promise<void>;
    getCustomerActivityAsync(id: string): Promise<CustomerActivity | null>;
    getCustomerActivitiesAsync(customerId: string): Promise<CustomerActivity[]>;
    getCustomerActivitiesByActivityIdAsync(activityId: string): Promise<CustomerActivity[]>;
    deleteCustomerActivityAsync(id: string): Promise<void>;
    getCustomerActivityByCustomerIdAndActivityIdAsync(customerId: string, activityId: string): Promise<CustomerActivity | null>;
    assignCustomersToActivityAsync(activityId: string, customerIds: string[]): Promise<void>;
    deleteMultipleActivitiesAsync(ids: string[]): Promise<void>;
}
