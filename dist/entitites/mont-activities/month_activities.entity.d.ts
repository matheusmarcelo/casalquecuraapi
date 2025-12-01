import { Customer } from "../customer/customer.entity";
import { LinkedUsers } from "../linked-users/linked_users.entity";
export declare class MonthActivities {
    id?: string;
    user?: Customer;
    totalScore: number;
    month: number;
    year: number;
    linkedUserId?: LinkedUsers;
}
