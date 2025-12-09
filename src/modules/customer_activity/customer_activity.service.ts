import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import type { IActivityRepository } from 'src/constants/contracts/activity/IActivityRepository.contract';
import type { ICustomerActivityRepository } from 'src/constants/contracts/customer-activity/ICustomerActivitiesRepository.contract';
import { ICustomerActivityService } from 'src/constants/contracts/customer-activity/ICustomerActivitiesService.contract';
import { DITokensRepository } from 'src/constants/enums/DITokens/DITokens.enum';
import { ActivityDto } from 'src/dtos/activity/activity.dto';
import { CustomerActivityDto } from 'src/dtos/customer_activity/customerActivity.dto';
import { Activity } from 'src/entitites/activity/activity.entity';
import { CustomerActivity } from 'src/entitites/customer-activity/customer-activity.entity';
import { Customer } from 'src/entitites/customer/customer.entity';
import { LinkedUsers } from 'src/entitites/linked-users/linked_users.entity';

@Injectable()
export class CustomerActivityService implements ICustomerActivityService {

    constructor(
        @Inject(DITokensRepository.CUSTOMER_ACTIVITY_REPOSITORY)
        private readonly customerActivityRepository: ICustomerActivityRepository,
        @Inject(DITokensRepository.ACTIVITY_REPOSITORY)
        private readonly activityRepository: IActivityRepository,
    ) { }

    async createCustomerActivityAsync(customer_activity: CustomerActivityDto): Promise<void> {
        const customerActivityFound = await this.customerActivityRepository.getCustomerActivityByCustomerIdAndActivityIdAsync(customer_activity.activity_id, customer_activity.customer_id);

        const linkedUsersActivityFound = await this.customerActivityRepository.getCustomerActivityByLinkedUserIdAndActivityIdAsync(customer_activity.activity_id, customer_activity.linked_users_id);

        const activity = await this.activityRepository.getActivityAsync(customer_activity.activity_id);

        if (!activity) {
            throw new HttpException('Activity not found', HttpStatus.NOT_FOUND);
        }

        if (customerActivityFound || linkedUsersActivityFound) {
            throw new HttpException('This activity has already been associated with this customer', HttpStatus.BAD_REQUEST);
        }

        const customerActivity: CustomerActivity = {
            activity: { id: customer_activity.activity_id } as Activity,
        }

        if (customer_activity.customer_id) {
            customerActivity.customer = { id: customer_activity.customer_id } as Customer;
        } else if (customer_activity.linked_users_id) {
            customerActivity.linkedUserId = { id: customer_activity.linked_users_id } as LinkedUsers
        } else {
            throw new HttpException('You must infom any customer or linked user id', HttpStatus.BAD_REQUEST);
        }

        await this.customerActivityRepository.createCustomerActivityAsync(customerActivity);

        if (activity.isGeneral) {
            activity.isGeneral = false;
            await this.activityRepository.updateActivityAsync(activity.id!, activity);
        }
    }

    async getCustomerActivitiesAsync(customerId: string): Promise<Activity[]> {
        const customerActivities = await this.customerActivityRepository.getCustomerActivitiesAsync(customerId);
        return customerActivities;
    }

    async deleteCustomerActivityAsync(id: string): Promise<void> {
        const customerActivity = await this.customerActivityRepository.getCustomerActivityAsync(id);

        if (!customerActivity) {
            throw new HttpException('Customer Activity not found', HttpStatus.NOT_FOUND);
        }

        await this.customerActivityRepository.deleteCustomerActivityAsync(id);
    }
    async getCustomerOrCoupleActivitiesAsync(type: string, id: string): Promise<ActivityDto[]> {
        return await this.customerActivityRepository.getCustomerOrCoupleActivitiesAsync(type, id);
    }
}
