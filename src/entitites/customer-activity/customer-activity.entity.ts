import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Customer } from "../customer/customer.entity";
import { Activity } from "../activity/activity.entity";

@Entity({ name: 'user_activities' })
export class CustomerActivity {
    @PrimaryGeneratedColumn('identity', { generatedIdentity: 'ALWAYS' })
    id?: string;

    @ManyToOne(type => Customer, (customer) => customer.id)
    @JoinColumn({ name: 'user_id' })
    customer: Customer;

    @ManyToOne(type => Activity, (activity) => activity.id)
    @JoinColumn({ name: 'activity_id' })
    activity: Activity;
}