import { Activity } from "../activity/activity.entity";
import { Customer } from "../customer/customer.entity";
export declare class DalyActivities {
    id?: string;
    user: Customer;
    activity: Activity;
    completionDate?: Date;
    score: number;
}
