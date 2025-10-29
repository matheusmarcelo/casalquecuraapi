import { CustomerActivityDto } from "src/dtos/customer_activity/customerActivity.dto";
import { ICustomerActivityRepository } from "./ICustomerActivitiesRepository.contract";

export interface ICustomerActivityService extends Omit<ICustomerActivityRepository, 'createCustomerActivityAsync' | 'getCustomerActivityAsync' | 'getCustomerActivityByCustomerIdAndActivityIdAsync' | 'assignCustomersToActivityAsync' | 'deleteMultipleActivitiesAsync' | 'getCustomerActivitiesByActivityIdAsync'> {
    createCustomerActivityAsync(customer_activity: CustomerActivityDto): Promise<void>;
}