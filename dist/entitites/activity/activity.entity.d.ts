import { CustomerActivity } from "../customer-activity/customer-activity.entity";
export declare class Activity {
    id?: string;
    title: string;
    description: string;
    score: number;
    isGeneral?: string;
    createdAt?: Date;
    updatedAt?: Date;
    activities?: CustomerActivity[];
}
