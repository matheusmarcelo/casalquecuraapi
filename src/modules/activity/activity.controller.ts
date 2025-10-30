import { BadRequestException, Body, Controller, Delete, Get, HttpCode, HttpException, HttpStatus, Inject, InternalServerErrorException, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import type { IActivityService } from 'src/constants/contracts/activity/IActivityService.contract';
import { DITokensService } from 'src/constants/enums/DITokens/DITokens.enum';
import { ActivityDto } from 'src/dtos/activity/activity.dto';
import { FindActivitiesDto } from 'src/dtos/activity/findActivities.dto';
import { Activity } from 'src/entitites/activity/activity.entity';
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
}
