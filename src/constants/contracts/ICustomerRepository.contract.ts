import { FindCustomersDto } from "src/dtos/customer/findCustomers.dto";
import { Customer } from "src/entitites/customer/customer.entity";

export interface ICustomerRepository {
    createCustomerAsync(customer: Customer): Promise<void>;
    getCustomerByIdAsync(id: string): Promise<Customer | null>;
    getCustomersAsync(params?: FindCustomersDto): Promise<Customer[]>;
    updateCustomerAsync(id: string, customer: Customer): Promise<void>;
    disableCustomerAsync(id: string): Promise<void>;
    getCustomerByEmail(email: string): Promise<Customer | null>;
}