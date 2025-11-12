import type { ICustomerRepository } from 'src/constants/contracts/customer/ICustomerRepository.contract';
import { ICustomerService } from 'src/constants/contracts/customer/ICustomerService.contract';
import { CustomerDto } from 'src/dtos/customer/customer.dto';
import { FindCustomersDto } from 'src/dtos/customer/findCustomers.dto';
import { Customer } from 'src/entitites/customer/customer.entity';
export declare class CustomerService implements ICustomerService {
    private readonly customerRepository;
    constructor(customerRepository: ICustomerRepository);
    getCustomerByEmail(email: string): Promise<Customer | null>;
    createCustomerAsync(customerDto: CustomerDto): Promise<void>;
    getCustomerByIdAsync(id: string): Promise<Customer | null>;
    getCustomersAsync(params: FindCustomersDto): Promise<Customer[]>;
    updateCustomerAsync(id: string, customer: Customer): Promise<void>;
    disableCustomerAsync(id: string): Promise<void>;
}
