import { Customer } from "../customer/customer.entity";
import { CustomerActivity } from "../customer-activity/customer-activity.entity";
import { DalyActivities } from "../daly-activities/daly_activities.entity";
import { MonthActivities } from "../mont-activities/month_activities.entity";
export declare class LinkedUsers {
    id?: string;
    user1: Customer;
    user2: Customer;
    createdAt?: Date;
    customerActivities?: CustomerActivity[];
    dalyActivities?: DalyActivities[];
    monthActivities?: MonthActivities[];
}
