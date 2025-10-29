import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import type { ICustomerActivityRepository } from 'src/constants/contracts/customer-activity/ICustomerActivitiesRepository.contract';
import { ICustomerActivityService } from 'src/constants/contracts/customer-activity/ICustomerActivitiesService.contract';
import { DITokensRepository } from 'src/constants/enums/DITokens/DITokens.enum';
import { CustomerActivityDto } from 'src/dtos/customer_activity/customerActivity.dto';
import { Activity } from 'src/entitites/activity/activity.entity';
import { CustomerActivity } from 'src/entitites/customer-activity/customer-activity.entity';
import { Customer } from 'src/entitites/customer/customer.entity';

@Injectable()
export class CustomerActivityService implements ICustomerActivityService {

    constructor(
        @Inject(DITokensRepository.CUSTOMER_ACTIVITY_REPOSITORY)
        private readonly customerActivityRepository: ICustomerActivityRepository
    ) { }

    async createCustomerActivityAsync(customer_activity: CustomerActivityDto): Promise<void> {
        const customerActivityFound = await this.customerActivityRepository.getCustomerActivityByCustomerIdAndActivityIdAsync(customer_activity.customer_id, customer_activity.activity_id);

        if (customerActivityFound) {
            throw new HttpException('This activity has already been associated with this customer', HttpStatus.BAD_REQUEST);
        }

        const customerActivity: CustomerActivity = {
            customer: { id: customer_activity.customer_id } as Customer,
            activity: { id: customer_activity.activity_id } as Activity,
        }

        await this.customerActivityRepository.createCustomerActivityAsync(customerActivity);
    }

    async getCustomerActivitiesAsync(customerId: string): Promise<CustomerActivity[]> {
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
}
