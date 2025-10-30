import { CustomerActivity } from "../customer-activity/customer-activity.entity";
import { AuxLinkedUsers } from "../linked-users/aux_linked_users.entity";
import { LinkedUsers } from "../linked-users/linked_users.entity";
export declare class Customer {
    id?: string;
    generateId(): void;
    name: string;
    email: string;
    password: string;
    date_of_birth: Date;
    phone: string;
    street?: string;
    neighborhood?: string;
    zipcode?: string;
    house_number?: string;
    description?: string;
    gender?: string;
    role?: string;
    createdAt?: Date;
    updatedAt?: Date;
    isActive?: boolean;
    customers?: CustomerActivity[];
    user1?: LinkedUsers[];
    user2?: LinkedUsers[];
    fromAuxLinkedUsers?: AuxLinkedUsers[];
    toAuxLinkedUsers?: AuxLinkedUsers[];
}
