import { Customer } from "../customer/customer.entity";
import { Activity } from "../activity/activity.entity";
import { LinkedUsers } from "../linked-users/linked_users.entity";
export declare class CustomerActivity {
    id?: string;
    customer?: Customer;
    activity: Activity;
    linkedUserId?: LinkedUsers;
}
