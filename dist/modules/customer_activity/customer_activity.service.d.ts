import type { ICustomerActivityRepository } from 'src/constants/contracts/customer_activity/ICustomerActivitiesRepository.contract';
import { ICustomerActivityService } from 'src/constants/contracts/customer_activity/ICustomerActivitiesService.contract';
import { CustomerActivityDto } from 'src/dtos/customer_activity/customerActivity.dto';
import { CustomerActivity } from 'src/entitites/customer-activity/customer-activity.entity';
export declare class CustomerActivityService implements ICustomerActivityService {
    private readonly customerActivityRepository;
    constructor(customerActivityRepository: ICustomerActivityRepository);
    createCustomerActivityAsync(customer_activity: CustomerActivityDto): Promise<void>;
    getCustomerActivitiesAsync(customerId: string): Promise<CustomerActivity[]>;
    deleteCustomerActivityAsync(id: string): Promise<void>;
}
