import { Activity } from "../activity/activity.entity";
import { Customer } from "../customer/customer.entity";
import { LinkedUsers } from "../linked-users/linked_users.entity";
export declare class DalyActivities {
    id?: string;
    user?: Customer;
    activity: Activity;
    completionDate?: Date;
    score: number;
    linkedUserId?: LinkedUsers;
}
