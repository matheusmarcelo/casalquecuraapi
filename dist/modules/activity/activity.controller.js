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
const activity_entity_1 = require("../../entitites/activity/activity.entity");
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
};
exports.ActivityController = ActivityController;
__decorate([
    (0, common_1.Post)(''),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [activity_dto_1.ActivityDto]),
    __metadata("design:returntype", Promise)
], ActivityController.prototype, "createActivityAsync", null);
__decorate([
    (0, common_1.Put)('/:id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, activity_entity_1.Activity]),
    __metadata("design:returntype", Promise)
], ActivityController.prototype, "updateActivityAsync", null);
__decorate([
    (0, common_1.Get)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ActivityController.prototype, "getActivityAsync", null);
__decorate([
    (0, common_1.Get)(''),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [findActivities_dto_1.FindActivitiesDto]),
    __metadata("design:returntype", Promise)
], ActivityController.prototype, "getActivitiesAsync", null);
__decorate([
    (0, common_1.Delete)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ActivityController.prototype, "deleteActivitiesAsync", null);
exports.ActivityController = ActivityController = __decorate([
    (0, common_1.Controller)('activities'),
    __param(0, (0, common_1.Inject)(DITokens_enum_1.DITokensService.ACTIVITY_SERVICE)),
    __metadata("design:paramtypes", [Object])
], ActivityController);
//# sourceMappingURL=activity.controller.js.map