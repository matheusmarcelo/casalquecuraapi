import { BadRequestException, Body, Controller, Delete, Get, HttpCode, HttpException, HttpStatus, Inject, InternalServerErrorException, Param, Post, Put, Query } from '@nestjs/common';
import type { IActivityService } from 'src/constants/contracts/activity/IActivityService.contract';
import { DITokensService } from 'src/constants/enums/DITokens/DITokens.enum';
import { ActivityDto } from 'src/dtos/activity/activity.dto';
import { FindActivitiesDto } from 'src/dtos/activity/findActivities.dto';
import { Activity } from 'src/entitites/activity/activity.entity';

@Controller('activities')
export class ActivityController {
  constructor(
    @Inject(DITokensService.ACTIVITY_SERVICE)
    private readonly activityService: IActivityService
  ) { }

  @Post('')
  async createActivityAsync(@Body() activityDto: ActivityDto): Promise<void> {
    await this.activityService.createActivityAsync(activityDto);
  }

  @Put('/:id')
  @HttpCode(HttpStatus.OK)
  async updateActivityAsync(@Param('id') id: string, activity: Activity): Promise<void> {
    await this.activityService.updateActivityAsync(id, activity);
  }

  @Get('/:id')
  async getActivityAsync(@Param('id') id: string): Promise<Activity | null> {
    const activity = await this.activityService.getActivityAsync(id);
    return activity;
  }

  @Get('')
  async getActivitiesAsync(@Query() params: FindActivitiesDto): Promise<Activity[]> {
    const activities = await this.activityService.getActivitiesAsync(params);
    return activities;
  }

  @Delete('/:id')
  async deleteActivitiesAsync(@Param('id') id: string): Promise<void> {
    await this.activityService.deleteActivityAsync(id);
  }
}
