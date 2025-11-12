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
exports.CustomerController = void 0;
const common_1 = require("@nestjs/common");
const DITokens_enum_1 = require("../../constants/enums/DITokens/DITokens.enum");
const customer_dto_1 = require("../../dtos/customer/customer.dto");
const findCustomers_dto_1 = require("../../dtos/customer/findCustomers.dto");
const customer_entity_1 = require("../../entitites/customer/customer.entity");
const admin_guard_1 = require("../../guards/admin/admin.guard");
const auth_guard_1 = require("../../guards/auth/auth.guard");
let CustomerController = class CustomerController {
    customerService;
    constructor(customerService) {
        this.customerService = customerService;
    }
    async createCustomerAsync(customer) {
        await this.customerService.createCustomerAsync(customer);
    }
    async updateCustomerAsync(id, customer) {
        await this.customerService.updateCustomerAsync(id, customer);
    }
    async getCustomerAsync(id) {
        const customer = await this.customerService.getCustomerByIdAsync(id);
        return customer;
    }
    async getCustomersAsync(params) {
        const customers = await this.customerService.getCustomersAsync(params);
        return customers;
    }
    async disableCustomerAsync(id) {
        await this.customerService.disableCustomerAsync(id);
    }
};
exports.CustomerController = CustomerController;
__decorate([
    (0, common_1.Post)(''),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [customer_dto_1.CustomerDto]),
    __metadata("design:returntype", Promise)
], CustomerController.prototype, "createCustomerAsync", null);
__decorate([
    (0, common_1.Put)('/:id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, customer_entity_1.Customer]),
    __metadata("design:returntype", Promise)
], CustomerController.prototype, "updateCustomerAsync", null);
__decorate([
    (0, common_1.Get)('/:id'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CustomerController.prototype, "getCustomerAsync", null);
__decorate([
    (0, common_1.Get)(''),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, admin_guard_1.AdminGuard),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [findCustomers_dto_1.FindCustomersDto]),
    __metadata("design:returntype", Promise)
], CustomerController.prototype, "getCustomersAsync", null);
__decorate([
    (0, common_1.Post)('/:id/disable'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, admin_guard_1.AdminGuard),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CustomerController.prototype, "disableCustomerAsync", null);
exports.CustomerController = CustomerController = __decorate([
    (0, common_1.Controller)('customers'),
    __param(0, (0, common_1.Inject)(DITokens_enum_1.DITokensService.CUSTOMER_SERVICE)),
    __metadata("design:paramtypes", [Object])
], CustomerController);
//# sourceMappingURL=customer.controller.js.map