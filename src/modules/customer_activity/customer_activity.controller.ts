import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Inject, Param, Post } from '@nestjs/common';
import type { ICustomerActivityService } from 'src/constants/contracts/customer-activity/ICustomerActivitiesService.contract';
import { DITokensService } from 'src/constants/enums/DITokens/DITokens.enum';
import { CustomerActivityDto } from 'src/dtos/customer_activity/customerActivity.dto';
import { CustomerActivity } from 'src/entitites/customer-activity/customer-activity.entity';

@Controller('customer/activities')
export class CustomerActivityController {
  constructor(
    @Inject(DITokensService.CUSTOMER_ACTIVITY_SERVICE)
    private readonly customerActivityService: ICustomerActivityService
  ) { }

  @Post('')
  async createCustomerActivityAsync(@Body() customer_activity: CustomerActivityDto): Promise<void> {
    await this.customerActivityService.createCustomerActivityAsync(customer_activity);
  }

  @Get('/:customerId')
  async getCustomerActivitiesAsync(@Param('customerId') customerId: string): Promise<CustomerActivity[]> {
    const customerActivities = await this.customerActivityService.getCustomerActivitiesAsync(customerId);
    return customerActivities;
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.OK)
  async deleteCustomerActivityAsync(@Param('id') id: string): Promise<void> {
    await this.customerActivityService.deleteCustomerActivityAsync(id);
  }
}
