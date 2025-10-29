import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import type { IActivityRepository } from 'src/constants/contracts/activity/IActivityRepository.contract';
import { IActivityService } from 'src/constants/contracts/activity/IActivityService.contract';
import type { ICustomerActivityRepository } from 'src/constants/contracts/customer-activity/ICustomerActivitiesRepository.contract';
import { DITokensRepository } from 'src/constants/enums/DITokens/DITokens.enum';
import { ActivityDto } from 'src/dtos/activity/activity.dto';
import { FindActivitiesDto } from 'src/dtos/activity/findActivities.dto';
import { Activity } from 'src/entitites/activity/activity.entity';

@Injectable()
export class ActivityService implements IActivityService {

    constructor(
        @Inject(DITokensRepository.ACTIVITY_REPOSITORY)
        private readonly activityRepository: IActivityRepository,
        @Inject(DITokensRepository.CUSTOMER_ACTIVITY_REPOSITORY)
        private readonly customerActivityRepository: ICustomerActivityRepository,
    ) { }

    async createActivityAsync(activityDto: ActivityDto): Promise<void> {
        const activity: Activity = {
            title: activityDto.title,
            description: activityDto.description,
            score: activityDto.score,
            isGeneral: activityDto.isGeneral,
        }

        const activityCreated = await this.activityRepository.createActivityAsync(activity);

        if (!activityDto.isGeneral) {

            if (activityDto.customerIds.length <= 0) {
                throw new HttpException('Empty customer id list', HttpStatus.BAD_REQUEST);
            }

            await this.customerActivityRepository.assignCustomersToActivityAsync(activityCreated.id as string, activityDto.customerIds);
        }
    }

    async getActivityAsync(id: string): Promise<Activity | null> {
        const activity = await this.activityRepository.getActivityAsync(id);

        if (!activity) {
            throw new HttpException('Activity not found', HttpStatus.NOT_FOUND);
        }

        return activity;
    }

    async getActivitiesAsync(params: FindActivitiesDto): Promise<Activity[]> {
        return await this.activityRepository.getActivitiesAsync(params);
    }

    async updateActivityAsync(id: string, activity: ActivityDto): Promise<void> {
        const activityFound = await this.activityRepository.getActivityAsync(id);

        if (!activityFound) {
            throw new HttpException('Activity not found', HttpStatus.NOT_FOUND);
        }

        const activityToUpdate: Activity = {
            title: activity.title,
            description: activity.description,
            score: activity.score,
            isGeneral: activity.isGeneral,
        }

        await this.activityRepository.updateActivityAsync(id, activityToUpdate);

        if (!activity.isGeneral) {

            if (activity.customerIds.length <= 0) {
                throw new HttpException('Empty customer id list', HttpStatus.BAD_REQUEST);
            }

            await this.customerActivityRepository.assignCustomersToActivityAsync(id, activity.customerIds);
        }
        else {
            const customerActivities = await this.customerActivityRepository.getCustomerActivitiesByActivityIdAsync(id);

            if (customerActivities.length > 0) {
                const ids: string[] = customerActivities.map(activities => activities.id as string);
                await this.customerActivityRepository.deleteMultipleActivitiesAsync(ids);
            }
        }
    }

    async deleteActivityAsync(id: string): Promise<void> {
        const activityFound = await this.activityRepository.getActivityAsync(id);

        if (!activityFound) {
            throw new HttpException('Activity not found', HttpStatus.NOT_FOUND);
        }

        await this.activityRepository.deleteActivityAsync(id);
    }
}
