import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Customer } from "../customer/customer.entity";
import { Activity } from "../activity/activity.entity";

@Entity({ name: 'user_activities' })
export class CustomerActivity {
    @PrimaryGeneratedColumn('identity', { generatedIdentity: 'ALWAYS' })
    id?: string;

    @ManyToOne(type => Customer, (customer) => customer.id)
    @Column({ name: 'user_id' })
    cusomer_id: string;

    @ManyToOne(type => Activity, (activity) => activity.id)
    @Column({ name: 'activity_id' })
    activity_id: string;
}