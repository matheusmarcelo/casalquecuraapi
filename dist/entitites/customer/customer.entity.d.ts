import { CustomerActivity } from "../customer-activity/customer-activity.entity";
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
}
