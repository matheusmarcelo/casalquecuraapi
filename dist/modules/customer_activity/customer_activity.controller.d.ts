import type { ICustomerActivityService } from 'src/constants/contracts/customer-activity/ICustomerActivitiesService.contract';
import { CustomerActivityDto } from 'src/dtos/customer_activity/customerActivity.dto';
import { CustomerActivity } from 'src/entitites/customer-activity/customer-activity.entity';
export declare class CustomerActivityController {
    private readonly customerActivityService;
    constructor(customerActivityService: ICustomerActivityService);
    createCustomerActivityAsync(customer_activity: CustomerActivityDto): Promise<void>;
    getCustomerActivitiesAsync(customerId: string): Promise<CustomerActivity[]>;
    deleteCustomerActivityAsync(id: string): Promise<void>;
}
