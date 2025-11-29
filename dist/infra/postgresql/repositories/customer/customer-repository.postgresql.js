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
exports.CustomerRepositoryPostgresql = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const customer_entity_1 = require("../../../../entitites/customer/customer.entity");
const typeorm_2 = require("typeorm");
let CustomerRepositoryPostgresql = class CustomerRepositoryPostgresql {
    customerRepository;
    constructor(customerRepository) {
        this.customerRepository = customerRepository;
    }
    async createCustomerAsync(customer) {
        await this.customerRepository.save(customer);
    }
    async getCustomerByIdAsync(id) {
        return await this.customerRepository.findOne({
            where: {
                id
            },
            select: ['name', 'email', 'date_of_birth', 'phone', 'gender', 'description', 'updatedAt', 'createdAt']
        });
    }
    async getCustomersAsync(params) {
        const searchParams = {};
        if (params?.name) {
            searchParams.name = (0, typeorm_2.ILike)(`%${params.name}%`);
        }
        if (params?.email) {
            searchParams.email = (0, typeorm_2.ILike)(`%${params.email}%`);
        }
        const customers = await this.customerRepository.find({
            where: searchParams,
        });
        return customers;
    }
    async updateCustomerAsync(id, customer) {
        await this.customerRepository.update(id, customer);
    }
    async disableCustomerAsync(id) {
        const customer = await this.customerRepository.findOne({ where: { id } });
        if (!customer) {
            throw new common_1.HttpException('Customer not found', common_1.HttpStatus.NOT_FOUND);
        }
        await this.customerRepository.update(id, { isActive: false });
    }
    async getCustomerByEmail(email) {
        const customer = await this.customerRepository.findOne({ where: { email: (0, typeorm_2.ILike)(email) } });
        return customer;
    }
};
exports.CustomerRepositoryPostgresql = CustomerRepositoryPostgresql;
exports.CustomerRepositoryPostgresql = CustomerRepositoryPostgresql = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(customer_entity_1.Customer)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], CustomerRepositoryPostgresql);
//# sourceMappingURL=customer-repository.postgresql.js.map