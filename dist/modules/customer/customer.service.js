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
exports.CustomerService = void 0;
const common_1 = require("@nestjs/common");
const DITokens_enum_1 = require("../../constants/enums/DITokens/DITokens.enum");
const bcrypt_1 = require("bcrypt");
let CustomerService = class CustomerService {
    customerRepository;
    constructor(customerRepository) {
        this.customerRepository = customerRepository;
    }
    async createCustomerAsync(customerDto) {
        const customer = await this.customerRepository.getCustomerByEmail(customerDto.email);
        if (customer) {
            throw new common_1.HttpException('Customer alredy created', common_1.HttpStatus.BAD_REQUEST);
        }
        const saltOrRounds = 12;
        const customerEntity = {
            name: customerDto.name,
            email: customerDto.email,
            date_of_birth: customerDto.date_of_birth,
            phone: customerDto.phone,
            password: (0, bcrypt_1.hashSync)(customerDto.password, saltOrRounds),
        };
        await this.customerRepository.createCustomerAsync(customerEntity);
    }
    async getCustomerByIdAsync(id) {
        const customer = await this.customerRepository.getCustomerByIdAsync(id);
        if (!customer) {
            throw new common_1.HttpException('Customer not found', common_1.HttpStatus.NOT_FOUND);
        }
        return customer;
    }
    async getCustomersAsync(params) {
        return await this.customerRepository.getCustomersAsync(params);
    }
    async updateCustomerAsync(id, customer) {
        await this.customerRepository.updateCustomerAsync(id, customer);
    }
    async disableCustomerAsync(id) {
        await this.customerRepository.disableCustomerAsync(id);
    }
};
exports.CustomerService = CustomerService;
exports.CustomerService = CustomerService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(DITokens_enum_1.DITokensRepository.CUSTOMER_REPOSITORY)),
    __metadata("design:paramtypes", [Object])
], CustomerService);
//# sourceMappingURL=customer.service.js.map