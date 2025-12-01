"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActivityService = void 0;
const common_1 = require("@nestjs/common");
const DITokens_enum_1 = require("../../constants/enums/DITokens/DITokens.enum");
let ActivityService = class ActivityService {
    activityRepository;
    customerActivityRepository;
    dalyActivityRepository;
    monthActivityRepository;
    constructor(activityRepository, customerActivityRepository, dalyActivityRepository, monthActivityRepository) {
        this.activityRepository = activityRepository;
        this.customerActivityRepository = customerActivityRepository;
        this.dalyActivityRepository = dalyActivityRepository;
        this.monthActivityRepository = monthActivityRepository;
    }
    async createActivityAsync(activityDto) {
        const activity = {
            title: activityDto.title,
            description: activityDto.description,
            score: activityDto.score,
            isGeneral: activityDto.isGeneral,
        };
        const activityCreated = await this.activityRepository.createActivityAsync(activity);
        if (!activityDto.isGeneral) {
            if (activityDto.customerIds.length <= 0) {
                throw new common_1.HttpException('Empty customer id list', common_1.HttpStatus.BAD_REQUEST);
            }
            await this.customerActivityRepository.assignCustomersToActivityAsync(activityCreated.id, activityDto.customerIds);
        }
    }
    async getActivityAsync(id) {
        const activity = await this.activityRepository.getActivityAsync(id);
        if (!activity) {
            throw new common_1.HttpException('Activity not found', common_1.HttpStatus.NOT_FOUND);
        }
        return activity;
    }
    async getActivitiesAsync(params) {
        return await this.activityRepository.getActivitiesAsync(params);
    }
    async updateActivityAsync(id, activity) {
        const activityFound = await this.activityRepository.getActivityAsync(id);
        if (!activityFound) {
            throw new common_1.HttpException('Activity not found', common_1.HttpStatus.NOT_FOUND);
        }
        const activityToUpdate = {
            title: activity.title,
            description: activity.description,
            score: activity.score,
            isGeneral: activity.isGeneral,
        };
        await this.activityRepository.updateActivityAsync(id, activityToUpdate);
        if (!activity.isGeneral) {
            if (activity.customerIds.length <= 0) {
                throw new common_1.HttpException('Empty customer id list', common_1.HttpStatus.BAD_REQUEST);
            }
            await this.customerActivityRepository.assignCustomersToActivityAsync(id, activity.customerIds);
        }
        else {
            const customerActivities = await this.customerActivityRepository.getCustomerActivitiesByActivityIdAsync(id);
            if (customerActivities.length > 0) {
                const ids = customerActivities.map(activities => activities.id);
                await this.customerActivityRepository.deleteMultipleActivitiesAsync(ids);
            }
        }
    }
    async deleteActivityAsync(id) {
        const activityFound = await this.activityRepository.getActivityAsync(id);
        if (!activityFound) {
            throw new common_1.HttpException('Activity not found', common_1.HttpStatus.NOT_FOUND);
        }
        await this.activityRepository.deleteActivityAsync(id);
    }
    async markActivityCompletedAsync(dalyActivityDto) {
        const activity = await this.getActivityAsync(dalyActivityDto.activityId);
        const dalyActivity = {
            score: activity.score,
            activity: { id: dalyActivityDto.activityId },
        };
        if (dalyActivityDto.userId) {
            dalyActivity.user = { id: dalyActivityDto.userId };
        }
        else if (dalyActivityDto.linked_users_id) {
            dalyActivity.linkedUserId = { id: dalyActivityDto.linked_users_id };
        }
        console.log(dalyActivity);
        await this.dalyActivityRepository.createDalyActivityAsync(dalyActivity);
        await this.createOrUpdateMonthActivityAsync(dalyActivityDto, activity.score);
    }
    async getDalyActivitiesAsync(customerId) {
        const dalyActivities = await this.dalyActivityRepository.getDalyActivitiesAsync(customerId);
        return dalyActivities;
    }
    async getMonthlyActivitiesAsync(customerId) {
        return await this.monthActivityRepository.getMonthlyActivitiesAsync(customerId);
    }
    async getCustomerReportAsync(customerId, days) {
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
        };
    }
    async createOrUpdateMonthActivityAsync(dalyActivitiesDto, activityScore) {
        const { month, year } = this.getMonthAndYear();
        let userOrLinkedUserId = dalyActivitiesDto.userId ? dalyActivitiesDto.userId : dalyActivitiesDto.linked_users_id;
        if (!userOrLinkedUserId) {
            throw new common_1.HttpException('You must inform customer or linked users id', common_1.HttpStatus.BAD_REQUEST);
        }
        const monthActivityFound = await this.monthActivityRepository.getMonthActivityAsync(month, year, userOrLinkedUserId);
        if (!monthActivityFound) {
            const monthActivity = {
                month,
                year,
                totalScore: activityScore,
            };
            if (dalyActivitiesDto.userId) {
                monthActivity.user = { id: dalyActivitiesDto.userId };
            }
            else if (dalyActivitiesDto.linked_users_id) {
                monthActivity.linkedUserId = { id: dalyActivitiesDto.linked_users_id };
            }
            await this.monthActivityRepository.createMonthActivityAsync(monthActivity);
        }
        else {
            const totalScore = +monthActivityFound.totalScore;
            monthActivityFound.totalScore = totalScore + +activityScore;
            await this.monthActivityRepository.updateMonthActivityAsync(monthActivityFound.id, monthActivityFound.totalScore);
        }
    }
    getMonthAndYear() {
        const now = new Date();
        const month = now.getMonth() + 1;
        const year = now.getFullYear();
        return { month, year };
    }
};
exports.ActivityService = ActivityService;
exports.ActivityService = ActivityService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(DITokens_enum_1.DITokensRepository.ACTIVITY_REPOSITORY)),
    __param(1, (0, common_1.Inject)(DITokens_enum_1.DITokensRepository.CUSTOMER_ACTIVITY_REPOSITORY)),
    __param(2, (0, common_1.Inject)(DITokens_enum_1.DITokensRepository.DALY_ACTIVITIES_REPOSITORY)),
    __param(3, (0, common_1.Inject)(DITokens_enum_1.DITokensRepository.MONTH_ACTIVITIES_REPOSITORY)),
    __metadata("design:paramtypes", [Object, Object, Object, Object])
], ActivityService);
//# sourceMappingURL=activity.service.js.map