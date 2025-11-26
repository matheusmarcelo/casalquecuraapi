import { BadRequestException, Body, Controller, Delete, Get, HttpCode, HttpException, HttpStatus, Inject, InternalServerErrorException, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import type { IActivityService } from 'src/constants/contracts/activity/IActivityService.contract';
import { ChartReportInterval } from 'src/constants/enums/chartReport/chartReport.enum';
import { DITokensService } from 'src/constants/enums/DITokens/DITokens.enum';
import { ActivityDto } from 'src/dtos/activity/activity.dto';
import { FindActivitiesDto } from 'src/dtos/activity/findActivities.dto';
import { DalyActivitiesDto } from 'src/dtos/daly_activities/daly_activities.dto';
import { Activity } from 'src/entitites/activity/activity.entity';
import { DalyActivities } from 'src/entitites/daly-activities/daly_activities.entity';
import { MonthActivities } from 'src/entitites/mont-activities/month_activities.entity';
import { AdminGuard } from 'src/guards/admin/admin.guard';
import { AuthGuard } from 'src/guards/auth/auth.guard';

@Controller('activities')
export class ActivityController {
  constructor(
    @Inject(DITokensService.ACTIVITY_SERVICE)
    private readonly activityService: IActivityService
  ) { }

  @Post('')
  @UseGuards(AuthGuard, AdminGuard)
  async createActivityAsync(@Body() activityDto: ActivityDto): Promise<void> {
    await this.activityService.createActivityAsync(activityDto);
  }

  @Put('/:id')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard, AdminGuard)
  async updateActivityAsync(@Param('id') id: string, @Body() activity: ActivityDto): Promise<void> {
    await this.activityService.updateActivityAsync(id, activity);
  }

  @Get('/:id')
  @UseGuards(AuthGuard)
  async getActivityAsync(@Param('id') id: string): Promise<Activity | null> {
    const activity = await this.activityService.getActivityAsync(id);
    return activity;
  }

  @Get('')
  @UseGuards(AuthGuard, AdminGuard)
  async getActivitiesAsync(@Query() params: FindActivitiesDto): Promise<Activity[]> {
    const activities = await this.activityService.getActivitiesAsync(params);
    return activities;
  }

  @Delete('/:id')
  @UseGuards(AuthGuard, AdminGuard)
  async deleteActivitiesAsync(@Param('id') id: string): Promise<void> {
    await this.activityService.deleteActivityAsync(id);
  }

  @Post('completed')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  async markActivityCompletedAsync(@Body() dalyActivityDto: DalyActivitiesDto): Promise<void> {
    await this.activityService.markActivityCompletedAsync(dalyActivityDto);
  }

  @Get('daly/:customerId')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  async getDalyActivitiesAsync(@Param('customerId') customerId: string): Promise<DalyActivities[]> {
    return this.activityService.getDalyActivitiesAsync(customerId);
  }

  @Get('monthly/:customerId')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  async getMonthlyActivitiesAsync(@Param('customerId') customerId: string): Promise<MonthActivities[]> {
    return this.activityService.getMonthlyActivitiesAsync(customerId);
  }

  @Get('report/:customerId/chart')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  async getCustomerReportAsync(@Param('customerId') customerId: string, @Query('days') days: string = '7'): Promise<any> {
    const daysNumber = parseInt(days);

    if (!Object.values(ChartReportInterval).includes(daysNumber)) {
      throw new BadRequestException(
        `Invalid interval. Must be one of: ${Object.values(ChartReportInterval).join(', ')}`
      );
    }

    return await this.activityService.getCustomerReportAsync(customerId, daysNumber);
  }
}
