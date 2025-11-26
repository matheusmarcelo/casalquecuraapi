import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import type { IActivityRepository } from 'src/constants/contracts/activity/IActivityRepository.contract';
import { IActivityService } from 'src/constants/contracts/activity/IActivityService.contract';
import type { ICustomerActivityRepository } from 'src/constants/contracts/customer-activity/ICustomerActivitiesRepository.contract';
import type { IDalyActivitiesRepository } from 'src/constants/contracts/daly-activities/IDalyActivitiesRepository.contract';
import type { IMonthActivitiesRepository } from 'src/constants/contracts/month-activities/IMonthActivitiesRepository.contract';
import { ChartReportInterval } from 'src/constants/enums/chartReport/chartReport.enum';
import { DITokensRepository } from 'src/constants/enums/DITokens/DITokens.enum';
import { ActivityDto } from 'src/dtos/activity/activity.dto';
import { FindActivitiesDto } from 'src/dtos/activity/findActivities.dto';
import { ReportDto } from 'src/dtos/chart_report/chart_report.dto';
import { DalyActivitiesDto } from 'src/dtos/daly_activities/daly_activities.dto';
import { MonthActivitiesDto } from 'src/dtos/month_activities/month_activities.dto';
import { Activity } from 'src/entitites/activity/activity.entity';
import { Customer } from 'src/entitites/customer/customer.entity';
import { DalyActivities } from 'src/entitites/daly-activities/daly_activities.entity';
import { MonthActivities } from 'src/entitites/mont-activities/month_activities.entity';

@Injectable()
export class ActivityService implements IActivityService {

    constructor(
        @Inject(DITokensRepository.ACTIVITY_REPOSITORY)
        private readonly activityRepository: IActivityRepository,
        @Inject(DITokensRepository.CUSTOMER_ACTIVITY_REPOSITORY)
        private readonly customerActivityRepository: ICustomerActivityRepository,
        @Inject(DITokensRepository.DALY_ACTIVITIES_REPOSITORY)
        private readonly dalyActivityRepository: IDalyActivitiesRepository,
        @Inject(DITokensRepository.MONTH_ACTIVITIES_REPOSITORY)
        private readonly monthActivityRepository: IMonthActivitiesRepository,
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

    async markActivityCompletedAsync(dalyActivityDto: DalyActivitiesDto): Promise<void> {
        const activity = await this.getActivityAsync(dalyActivityDto.activityId);
        const dalyActivity: DalyActivities = {
            score: activity!.score,
            activity: { id: dalyActivityDto.activityId } as Activity,
            user: { id: dalyActivityDto.userId } as Customer,
        }

        await this.dalyActivityRepository.createDalyActivityAsync(dalyActivity);
        await this.createOrUpdateMonthActivityAsync(dalyActivityDto.userId, activity!.score);
    }

    async getDalyActivitiesAsync(customerId: string): Promise<DalyActivities[]> {
        const dalyActivities = await this.dalyActivityRepository.getDalyActivitiesAsync(customerId);
        return dalyActivities
    }

    async getMonthlyActivitiesAsync(customerId: string): Promise<MonthActivities[]> {
        return await this.monthActivityRepository.getMonthlyActivitiesAsync(customerId);
    }

    async getCustomerReportAsync(customerId: string, days: ChartReportInterval): Promise<ReportDto> {
        const [totalWeek, totalMonth, chartReport, totalDone, totalPoints] = await Promise.all([
            this.dalyActivityRepository.getTotalActivitiesWeekAsync(customerId),
            this.monthActivityRepository.getTotalMonthActivitiesAsync(customerId),
            this.dalyActivityRepository.getChartData(customerId, days),
            this.dalyActivityRepository.getCustomerTotalActivitiesDoneAsync(customerId),
            this.dalyActivityRepository.getCustomerTotalPointsAsync(customerId),
        ]);

        return {
            totalWeek,
            totalMonth,
            totalDone,
            totalPoints,
            chartReport,
        }
    }

    private async createOrUpdateMonthActivityAsync(customerId: string, activityScore: number): Promise<void> {
        const { month, year } = this.getMonthAndYear();
        const monthActivityFound = await this.monthActivityRepository.getMonthActivityAsync(customerId, month, year);

        if (!monthActivityFound) {
            const monthActivity: MonthActivities = {
                month,
                year,
                totalScore: activityScore,
                user: { id: customerId } as Customer
            }

            await this.monthActivityRepository.createMonthActivityAsync(monthActivity);
        } else {
            const totalScore = +monthActivityFound.totalScore;
            monthActivityFound.totalScore = totalScore + +activityScore;
            await this.monthActivityRepository.updateMonthActivityAsync(monthActivityFound.id!, monthActivityFound.totalScore);
        }
    }

    private getMonthAndYear(): { month: number, year: number } {
        const now = new Date();
        const month = now.getMonth() + 1;
        const year = now.getFullYear();

        return { month, year };
    }
}
