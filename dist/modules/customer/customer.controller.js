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
let CustomerController = class CustomerController {
    customerService;
    constructor(customerService) {
        this.customerService = customerService;
    }
    async createCustomerAsync(customer) {
        try {
            await this.customerService.createCustomerAsync(customer);
        }
        catch (error) {
            if (error instanceof common_1.HttpException) {
                throw error;
            }
            if (error.name === 'BadRequestException') {
                throw new common_1.BadRequestException(error.message);
            }
            throw new common_1.InternalServerErrorException(error.message || 'Erro interno no servidor');
        }
    }
    async updateCustomerAsync(id, customer) {
        try {
            await this.customerService.updateCustomerAsync(id, customer);
        }
        catch (error) {
            if (error instanceof common_1.HttpException) {
                throw error;
            }
            if (error.name === 'BadRequestException') {
                throw new common_1.BadRequestException(error.message);
            }
            throw new common_1.InternalServerErrorException(error.message || 'Erro interno no servidor');
        }
    }
    async getCustomerAsync(id) {
        try {
            const customer = await this.customerService.getCustomerByIdAsync(id);
            return customer;
        }
        catch (error) {
            if (error instanceof common_1.HttpException) {
                throw error;
            }
            if (error.name === 'BadRequestException') {
                throw new common_1.BadRequestException(error.message);
            }
            throw new common_1.InternalServerErrorException(error.message || 'Erro interno no servidor');
        }
    }
    async getCustomersAsync(params) {
        try {
            const customers = await this.customerService.getCustomersAsync(params);
            return customers;
        }
        catch (error) {
            if (error instanceof common_1.HttpException) {
                throw error;
            }
            if (error.name === 'BadRequestException') {
                throw new common_1.BadRequestException(error.message);
            }
            throw new common_1.InternalServerErrorException(error.message || 'Erro interno no servidor');
        }
    }
    async disableCustomerAsync(id) {
        try {
            await this.customerService.disableCustomerAsync(id);
        }
        catch (error) {
            if (error instanceof common_1.HttpException) {
                throw error;
            }
            if (error.name === 'BadRequestException') {
                throw new common_1.BadRequestException(error.message);
            }
            throw new common_1.InternalServerErrorException(error.message || 'Erro interno no servidor');
        }
    }
};
exports.CustomerController = CustomerController;
__decorate([
    (0, common_1.Post)(''),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [customer_dto_1.CustomerDto]),
    __metadata("design:returntype", Promise)
], CustomerController.prototype, "createCustomerAsync", null);
__decorate([
    (0, common_1.Put)('/:id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, customer_entity_1.Customer]),
    __metadata("design:returntype", Promise)
], CustomerController.prototype, "updateCustomerAsync", null);
__decorate([
    (0, common_1.Get)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CustomerController.prototype, "getCustomerAsync", null);
__decorate([
    (0, common_1.Get)(''),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [findCustomers_dto_1.FindCustomersDto]),
    __metadata("design:returntype", Promise)
], CustomerController.prototype, "getCustomersAsync", null);
__decorate([
    (0, common_1.Post)('/:id/disable'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CustomerController.prototype, "disableCustomerAsync", null);
exports.CustomerController = CustomerController = __decorate([
    (0, common_1.Controller)('customer'),
    __param(0, (0, common_1.Inject)(DITokens_enum_1.DITokensService.CUSTOMER_SERVICE)),
    __metadata("design:paramtypes", [Object])
], CustomerController);
//# sourceMappingURL=customer.controller.js.map