import { CustomerActivity } from "src/entitites/customer-activity/customer-activity.entity";

export interface ICustomerActivityRepository {
    createCustomerActivityAsync(customer_activity: CustomerActivity): Promise<void>;
    getCustomerActivitiesAsync(customerId: string): Promise<CustomerActivity[]>;
    getCustomerActivitiesByActivityIdAsync(activityId: string): Promise<CustomerActivity[]>;
    getCustomerActivityAsync(id: string): Promise<CustomerActivity | null>;
    deleteCustomerActivityAsync(id: string): Promise<void>;
    getCustomerActivityByCustomerIdAndActivityIdAsync(customerId: string, activityId: string): Promise<CustomerActivity | null>;
    assignCustomersToActivityAsync(activityId: string, customerIds: string[]): Promise<void>
    deleteMultipleActivitiesAsync(ids: string[]): Promise<void>
}