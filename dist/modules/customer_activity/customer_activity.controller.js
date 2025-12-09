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
exports.CustomerActivityController = void 0;
const common_1 = require("@nestjs/common");
const DITokens_enum_1 = require("../../constants/enums/DITokens/DITokens.enum");
const customerActivity_dto_1 = require("../../dtos/customer_activity/customerActivity.dto");
const admin_guard_1 = require("../../guards/admin/admin.guard");
const auth_guard_1 = require("../../guards/auth/auth.guard");
let CustomerActivityController = class CustomerActivityController {
    customerActivityService;
    constructor(customerActivityService) {
        this.customerActivityService = customerActivityService;
    }
    async createCustomerActivityAsync(customer_activity) {
        await this.customerActivityService.createCustomerActivityAsync(customer_activity);
    }
    async getCustomerActivitiesAsync(customerId) {
        const customerActivities = await this.customerActivityService.getCustomerActivitiesAsync(customerId);
        return customerActivities;
    }
    async deleteCustomerActivityAsync(id) {
        await this.customerActivityService.deleteCustomerActivityAsync(id);
    }
    async getCustomerOrCoupleActivitiesAsync(type, id) {
        return this.customerActivityService.getCustomerOrCoupleActivitiesAsync(type, id);
    }
};
exports.CustomerActivityController = CustomerActivityController;
__decorate([
    (0, common_1.Post)(''),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, admin_guard_1.AdminGuard),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [customerActivity_dto_1.CustomerActivityDto]),
    __metadata("design:returntype", Promise)
], CustomerActivityController.prototype, "createCustomerActivityAsync", null);
__decorate([
    (0, common_1.Get)('/:customerId'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __param(0, (0, common_1.Param)('customerId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CustomerActivityController.prototype, "getCustomerActivitiesAsync", null);
__decorate([
    (0, common_1.Delete)('/:id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, admin_guard_1.AdminGuard),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CustomerActivityController.prototype, "deleteCustomerActivityAsync", null);
__decorate([
    (0, common_1.Get)('/:type/:id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, admin_guard_1.AdminGuard),
    __param(0, (0, common_1.Param)('type')),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], CustomerActivityController.prototype, "getCustomerOrCoupleActivitiesAsync", null);
exports.CustomerActivityController = CustomerActivityController = __decorate([
    (0, common_1.Controller)('customer/activities'),
    __param(0, (0, common_1.Inject)(DITokens_enum_1.DITokensService.CUSTOMER_ACTIVITY_SERVICE)),
    __metadata("design:paramtypes", [Object])
], CustomerActivityController);
//# sourceMappingURL=customer_activity.controller.js.map