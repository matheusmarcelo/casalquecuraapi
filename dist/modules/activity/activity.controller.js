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
exports.ActivityController = void 0;
const common_1 = require("@nestjs/common");
const DITokens_enum_1 = require("../../constants/enums/DITokens/DITokens.enum");
const activity_dto_1 = require("../../dtos/activity/activity.dto");
const findActivities_dto_1 = require("../../dtos/activity/findActivities.dto");
const daly_activities_dto_1 = require("../../dtos/daly_activities/daly_activities.dto");
const admin_guard_1 = require("../../guards/admin/admin.guard");
const auth_guard_1 = require("../../guards/auth/auth.guard");
let ActivityController = class ActivityController {
    activityService;
    constructor(activityService) {
        this.activityService = activityService;
    }
    async createActivityAsync(activityDto) {
        await this.activityService.createActivityAsync(activityDto);
    }
    async updateActivityAsync(id, activity) {
        await this.activityService.updateActivityAsync(id, activity);
    }
    async getActivityAsync(id) {
        const activity = await this.activityService.getActivityAsync(id);
        return activity;
    }
    async getActivitiesAsync(params) {
        const activities = await this.activityService.getActivitiesAsync(params);
        return activities;
    }
    async deleteActivitiesAsync(id) {
        await this.activityService.deleteActivityAsync(id);
    }
    async markActivityCompletedAsync(dalyActivityDto) {
        await this.activityService.markActivityCompletedAsync(dalyActivityDto);
    }
    async getDalyActivitiesAsync(customerId) {
        return this.activityService.getDalyActivitiesAsync(customerId);
    }
    async getMonthlyActivitiesAsync(customerId) {
        return this.activityService.getMonthlyActivitiesAsync(customerId);
    }
};
exports.ActivityController = ActivityController;
__decorate([
    (0, common_1.Post)(''),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, admin_guard_1.AdminGuard),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [activity_dto_1.ActivityDto]),
    __metadata("design:returntype", Promise)
], ActivityController.prototype, "createActivityAsync", null);
__decorate([
    (0, common_1.Put)('/:id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, admin_guard_1.AdminGuard),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, activity_dto_1.ActivityDto]),
    __metadata("design:returntype", Promise)
], ActivityController.prototype, "updateActivityAsync", null);
__decorate([
    (0, common_1.Get)('/:id'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ActivityController.prototype, "getActivityAsync", null);
__decorate([
    (0, common_1.Get)(''),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, admin_guard_1.AdminGuard),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [findActivities_dto_1.FindActivitiesDto]),
    __metadata("design:returntype", Promise)
], ActivityController.prototype, "getActivitiesAsync", null);
__decorate([
    (0, common_1.Delete)('/:id'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, admin_guard_1.AdminGuard),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ActivityController.prototype, "deleteActivitiesAsync", null);
__decorate([
    (0, common_1.Post)('completed'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [daly_activities_dto_1.DalyActivitiesDto]),
    __metadata("design:returntype", Promise)
], ActivityController.prototype, "markActivityCompletedAsync", null);
__decorate([
    (0, common_1.Get)('daly/:customerId'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __param(0, (0, common_1.Param)('customerId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ActivityController.prototype, "getDalyActivitiesAsync", null);
__decorate([
    (0, common_1.Get)('monthly/:customerId'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __param(0, (0, common_1.Param)('customerId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ActivityController.prototype, "getMonthlyActivitiesAsync", null);
exports.ActivityController = ActivityController = __decorate([
    (0, common_1.Controller)('activities'),
    __param(0, (0, common_1.Inject)(DITokens_enum_1.DITokensService.ACTIVITY_SERVICE)),
    __metadata("design:paramtypes", [Object])
], ActivityController);
//# sourceMappingURL=activity.controller.js.map