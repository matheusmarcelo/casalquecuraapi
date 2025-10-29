import { Customer } from "../customer/customer.entity";
import { Activity } from "../activity/activity.entity";
export declare class CustomerActivity {
    id?: string;
    customer: Customer;
    activity: Activity;
}
