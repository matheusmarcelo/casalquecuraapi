import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import type { IActivityRepository } from 'src/constants/contracts/activity/IActivityRepository.contract';
import { IActivityService } from 'src/constants/contracts/activity/IActivityService.contract';
import { DITokensRepository } from 'src/constants/enums/DITokens/DITokens.enum';
import { ActivityDto } from 'src/dtos/activity/activity.dto';
import { FindActivitiesDto } from 'src/dtos/activity/findActivities.dto';
import { Activity } from 'src/entitites/activity/activity.entity';

@Injectable()
export class ActivityService implements IActivityService {

    constructor(
        @Inject(DITokensRepository.ACTIVITY_REPOSITORY)
        private readonly activityRepository: IActivityRepository
    ) { }

    async createActivityAsync(activityDto: ActivityDto): Promise<void> {
        const activity: Activity = {
            title: activityDto.title,
            description: activityDto.description,
            score: activityDto.score,
            isGeneral: activityDto.isGeneral,
        }

        await this.activityRepository.createActivityAsync(activity);
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

    async updateActivityAsync(id: string, activity: Activity): Promise<void> {
        const activityFound = await this.activityRepository.getActivityAsync(id);

        if (!activityFound) {
            throw new HttpException('Activity not found', HttpStatus.NOT_FOUND);
        }

        await this.activityRepository.updateActivityAsync(id, activity);
    }

    async deleteActivityAsync(id: string): Promise<void> {
        const activityFound = await this.activityRepository.getActivityAsync(id);

        if (!activityFound) {
            throw new HttpException('Activity not found', HttpStatus.NOT_FOUND);
        }

        await this.activityRepository.deleteActivityAsync(id);
    }
}
