import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Inject, Param, Post, UseGuards } from '@nestjs/common';
import type { ICustomerActivityService } from 'src/constants/contracts/customer-activity/ICustomerActivitiesService.contract';
import { DITokensService } from 'src/constants/enums/DITokens/DITokens.enum';
import { CustomerActivityDto } from 'src/dtos/customer_activity/customerActivity.dto';
import { CustomerActivity } from 'src/entitites/customer-activity/customer-activity.entity';
import { AdminGuard } from 'src/guards/admin/admin.guard';
import { AuthGuard } from 'src/guards/auth/auth.guard';

@Controller('customer/activities')
export class CustomerActivityController {
  constructor(
    @Inject(DITokensService.CUSTOMER_ACTIVITY_SERVICE)
    private readonly customerActivityService: ICustomerActivityService
  ) { }

  @Post('')
  @UseGuards(AuthGuard, AdminGuard)
  async createCustomerActivityAsync(@Body() customer_activity: CustomerActivityDto): Promise<void> {
    await this.customerActivityService.createCustomerActivityAsync(customer_activity);
  }

  @Get('/:customerId')
  @UseGuards(AuthGuard)
  async getCustomerActivitiesAsync(@Param('customerId') customerId: string): Promise<CustomerActivity[]> {
    const customerActivities = await this.customerActivityService.getCustomerActivitiesAsync(customerId);
    return customerActivities;
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard, AdminGuard)
  async deleteCustomerActivityAsync(@Param('id') id: string): Promise<void> {
    await this.customerActivityService.deleteCustomerActivityAsync(id);
  }
}
