import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IActivityRepository } from 'src/constants/contracts/activity/IActivityRepository.contract';
import { FindActivitiesDto } from 'src/dtos/activity/findActivities.dto';
import { Activity } from 'src/entitites/activity/activity.entity';
import { FindOptionsWhere, ILike, MoreThanOrEqual, Repository } from 'typeorm';

@Injectable()
export class ActivityRepositoryPostgresql implements IActivityRepository {

    constructor(
        @InjectRepository(Activity)
        private readonly activityRepository: Repository<Activity>,
    ) { }

    async createActivityAsync(activity: Activity): Promise<void> {
        await this.activityRepository.save(activity);
    }

    async getActivityAsync(id: string): Promise<Activity | null> {
        const activity = await this.activityRepository.findOne({ where: { id } });
        return activity;
    }

    async getActivitiesAsync(params: FindActivitiesDto): Promise<Activity[]> {
        const searchParams: FindOptionsWhere<Activity> = {};

        if (params.title) {
            searchParams.title = ILike(`%${params.title}%`);
        }

        if (params.description) {
            searchParams.description = ILike(`%${params.description}%`);
        }

        if (params.createdAt) {
            searchParams.createdAt = MoreThanOrEqual(params.createdAt);
        }

        return await this.activityRepository.find({
            where: searchParams
        });
    }

    async updateActivityAsync(id: string, activity: Activity): Promise<void> {
        await this.activityRepository.update(id, activity);
    }

    async deleteActivityAsync(id: string): Promise<void> {
        await this.activityRepository.delete(id);
    }
}
