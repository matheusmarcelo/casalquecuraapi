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
exports.CustomerActivityService = void 0;
const common_1 = require("@nestjs/common");
const DITokens_enum_1 = require("../../constants/enums/DITokens/DITokens.enum");
let CustomerActivityService = class CustomerActivityService {
    customerActivityRepository;
    constructor(customerActivityRepository) {
        this.customerActivityRepository = customerActivityRepository;
    }
    async createCustomerActivityAsync(customer_activity) {
        const customerActivityFound = await this.customerActivityRepository.getCustomerActivityByCustomerIdAndActivityIdAsync(customer_activity.customer_id, customer_activity.activity_id);
        if (customerActivityFound) {
            throw new common_1.HttpException('This activity has already been associated with this customer', common_1.HttpStatus.BAD_REQUEST);
        }
        const customerActivity = {
            customer: { id: customer_activity.customer_id },
            activity: { id: customer_activity.activity_id },
        };
        await this.customerActivityRepository.createCustomerActivityAsync(customerActivity);
    }
    async getCustomerActivitiesAsync(customerId) {
        const customerActivities = await this.customerActivityRepository.getCustomerActivitiesAsync(customerId);
        return customerActivities;
    }
    async deleteCustomerActivityAsync(id) {
        const customerActivity = await this.customerActivityRepository.getCustomerActivityAsync(id);
        if (!customerActivity) {
            throw new common_1.HttpException('Customer Activity not found', common_1.HttpStatus.NOT_FOUND);
        }
        await this.customerActivityRepository.deleteCustomerActivityAsync(id);
    }
};
exports.CustomerActivityService = CustomerActivityService;
exports.CustomerActivityService = CustomerActivityService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(DITokens_enum_1.DITokensRepository.CUSTOMER_ACTIVITY_REPOSITORY)),
    __metadata("design:paramtypes", [Object])
], CustomerActivityService);
//# sourceMappingURL=customer_activity.service.js.map