import type { ICustomerService } from 'src/constants/contracts/customer/ICustomerService.contract';
import { CustomerDto } from 'src/dtos/customer/customer.dto';
import { FindCustomersDto } from 'src/dtos/customer/findCustomers.dto';
import { Customer } from 'src/entitites/customer/customer.entity';
export declare class CustomerController {
    private readonly customerService;
    constructor(customerService: ICustomerService);
    createCustomerAsync(customer: CustomerDto): Promise<void>;
    updateCustomerAsync(id: string, customer: Customer): Promise<void>;
    getCustomerAsync(id: string): Promise<Customer | null>;
    getCustomersAsync(params: FindCustomersDto): Promise<Customer[]>;
    disableCustomerAsync(id: string): Promise<void>;
}
