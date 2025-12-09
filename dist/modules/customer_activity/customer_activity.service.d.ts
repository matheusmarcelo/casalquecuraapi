import type { IActivityRepository } from 'src/constants/contracts/activity/IActivityRepository.contract';
import type { ICustomerActivityRepository } from 'src/constants/contracts/customer-activity/ICustomerActivitiesRepository.contract';
import { ICustomerActivityService } from 'src/constants/contracts/customer-activity/ICustomerActivitiesService.contract';
import { ActivityDto } from 'src/dtos/activity/activity.dto';
import { CustomerActivityDto } from 'src/dtos/customer_activity/customerActivity.dto';
import { Activity } from 'src/entitites/activity/activity.entity';
export declare class CustomerActivityService implements ICustomerActivityService {
    private readonly customerActivityRepository;
    private readonly activityRepository;
    constructor(customerActivityRepository: ICustomerActivityRepository, activityRepository: IActivityRepository);
    createCustomerActivityAsync(customer_activity: CustomerActivityDto): Promise<void>;
    getCustomerActivitiesAsync(customerId: string): Promise<Activity[]>;
    deleteCustomerActivityAsync(id: string): Promise<void>;
    getCustomerOrCoupleActivitiesAsync(type: string, id: string): Promise<ActivityDto[]>;
}
