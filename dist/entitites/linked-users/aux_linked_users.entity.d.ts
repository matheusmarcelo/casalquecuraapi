import { Customer } from "../customer/customer.entity";
export declare class AuxLinkedUsers {
    id?: string;
    from: Customer;
    to: Customer;
    expirateAt?: Date;
    createdAt?: Date;
}
