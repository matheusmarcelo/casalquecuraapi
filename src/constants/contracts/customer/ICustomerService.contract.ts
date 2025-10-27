import { CustomerDto } from "src/dtos/customer/customer.dto";
import { FindCustomersDto } from "src/dtos/customer/findCustomers.dto";
import { Customer } from "src/entitites/customer/customer.entity";

export interface ICustomerService {
    createCustomerAsync(customerDto: CustomerDto): Promise<void>;
    getCustomerByIdAsync(id: string): Promise<Customer | null>;
    getCustomersAsync(params: FindCustomersDto): Promise<Customer[]>;
    updateCustomerAsync(id: string, customer: Customer): Promise<void>;
    disableCustomerAsync(id: string): Promise<void>;
}