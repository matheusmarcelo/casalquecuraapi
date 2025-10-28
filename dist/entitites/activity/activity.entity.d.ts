import { CustomerActivity } from "../customer-activity/customer-activity.entity";
export declare class Activity {
    id?: string;
    title: string;
    description: string;
    score: string;
    isGeneral?: string;
    createdAt?: Date;
    updatedAt?: Date;
    activity_id?: CustomerActivity[];
}
