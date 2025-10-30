import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import type { ICustomerRepository } from 'src/constants/contracts/customer/ICustomerRepository.contract';
import { ICustomerService } from 'src/constants/contracts/customer/ICustomerService.contract';
import { DITokensRepository } from 'src/constants/enums/DITokens/DITokens.enum';
import { CustomerDto } from 'src/dtos/customer/customer.dto';
import { FindCustomersDto } from 'src/dtos/customer/findCustomers.dto';
import { Customer } from 'src/entitites/customer/customer.entity';
import { hashSync as bcryptHashSync } from 'bcrypt';

@Injectable()
export class CustomerService implements ICustomerService {

    constructor(
        @Inject(DITokensRepository.CUSTOMER_REPOSITORY)
        private readonly customerRepository: ICustomerRepository
    ) { }

    async getCustomerByEmail(email: string): Promise<Customer | null> {
        const customerFound = await this.customerRepository.getCustomerByEmail(email);

        if (!customerFound) {
            throw new HttpException('Customer not found', HttpStatus.NOT_FOUND);
        }

        return customerFound;
    }

    async createCustomerAsync(customerDto: CustomerDto): Promise<void> {
        const customer = await this.customerRepository.getCustomerByEmail(customerDto.email);

        if (customer) {
            throw new HttpException('Customer alredy created', HttpStatus.BAD_REQUEST);
        }

        const saltOrRounds = 12;

        const customerEntity = new Customer();
        customerEntity.name = customerDto.name;
        customerEntity.email = customerDto.email;
        customerEntity.date_of_birth = customerDto.date_of_birth;
        customerEntity.phone = customerDto.phone;
        customerEntity.password = bcryptHashSync(customerDto.password, saltOrRounds);

        await this.customerRepository.createCustomerAsync(customerEntity);
    }

    async getCustomerByIdAsync(id: string): Promise<Customer | null> {
        const customer = await this.customerRepository.getCustomerByIdAsync(id);

        if (!customer) {
            throw new HttpException('Customer not found', HttpStatus.NOT_FOUND);
        }

        return customer;
    }

    async getCustomersAsync(params: FindCustomersDto): Promise<Customer[]> {
        return await this.customerRepository.getCustomersAsync(params);
    }

    async updateCustomerAsync(id: string, customer: Customer): Promise<void> {
        const customerFound = await this.customerRepository.getCustomerByIdAsync(id);

        if (!customerFound) {
            throw new HttpException('Customer not found', HttpStatus.NOT_FOUND);
        }

        await this.customerRepository.updateCustomerAsync(id, customer);
    }

    async disableCustomerAsync(id: string): Promise<void> {
        const customer = await this.customerRepository.getCustomerByIdAsync(id);

        if (!customer) {
            throw new HttpException('Customer not found', HttpStatus.NOT_FOUND);
        }

        await this.customerRepository.disableCustomerAsync(id);
    }
}
