import { Customer } from "src/entitites/customer/customer.entity";
export declare class LinkedUsersDto {
    fromId: string;
    emailReceiver: string;
    isRequester: boolean;
    id?: string;
    expirateAt?: Date;
    from?: Customer;
    to?: Customer;
}
