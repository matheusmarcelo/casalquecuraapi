import type { ICustomerActivityService } from 'src/constants/contracts/customer-activity/ICustomerActivitiesService.contract';
import { CustomerActivityDto } from 'src/dtos/customer_activity/customerActivity.dto';
import { Activity } from 'src/entitites/activity/activity.entity';
export declare class CustomerActivityController {
    private readonly customerActivityService;
    constructor(customerActivityService: ICustomerActivityService);
    createCustomerActivityAsync(customer_activity: CustomerActivityDto): Promise<void>;
    getCustomerActivitiesAsync(customerId: string): Promise<Activity[]>;
    deleteCustomerActivityAsync(id: string): Promise<void>;
}
