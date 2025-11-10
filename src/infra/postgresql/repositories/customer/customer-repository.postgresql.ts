import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ICustomerRepository } from 'src/constants/contracts/customer/ICustomerRepository.contract';
import { CustomerDto } from 'src/dtos/customer/customer.dto';
import { FindCustomersDto } from 'src/dtos/customer/findCustomers.dto';
import { Customer } from 'src/entitites/customer/customer.entity';
import { FindOptionsWhere, ILike, Repository } from 'typeorm';

@Injectable()
export class CustomerRepositoryPostgresql implements ICustomerRepository {

    constructor(
        @InjectRepository(Customer)
        private readonly customerRepository: Repository<Customer>
    ) { }

    async createCustomerAsync(customer: CustomerDto): Promise<void> {
        await this.customerRepository.save(customer);
    }

    async getCustomerByIdAsync(id: string): Promise<Customer | null> {
        return await this.customerRepository.findOne({ where: { id } });
    }

    async getCustomersAsync(params: FindCustomersDto): Promise<Customer[]> {
        const searchParams: FindOptionsWhere<Customer> = {};

        if (params?.name) {
            searchParams.name = ILike(`%${params.name}%`);
        }

        if (params?.email) {
            searchParams.email = ILike(`%${params.email}%`);
        }

        const customers = await this.customerRepository.find({
            where: searchParams,
        });

        return customers;
    }

    async updateCustomerAsync(id: string, customer: Customer): Promise<void> {
        await this.customerRepository.update(id, customer);
    }

    async disableCustomerAsync(id: string): Promise<void> {
        const customer = await this.customerRepository.findOne({ where: { id } });

        if (!customer) {
            throw new HttpException('Customer not found', HttpStatus.NOT_FOUND);
        }

        await this.customerRepository.update(id, { isActive: false });
    }

    async getCustomerByEmail(email: string): Promise<Customer | null> {
        const customer = await this.customerRepository.findOne({ where: { email: ILike(email) } });

        return customer;
    }
}
