import { CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Customer } from "../customer/customer.entity";
import { CustomerActivity } from "../customer-activity/customer-activity.entity";
import { DalyActivities } from "../daly-activities/daly_activities.entity";
import { MonthActivities } from "../mont-activities/month_activities.entity";

@Entity('linked_users')
export class LinkedUsers {
    @PrimaryGeneratedColumn('identity', { generatedIdentity: 'ALWAYS' })
    id?: string;

    @ManyToOne(type => Customer, (customer) => customer.id)
    @JoinColumn({ name: 'user_id1' })
    user1: Customer;

    @ManyToOne(type => Customer, (customer) => customer.id)
    @JoinColumn({ name: 'user_id2' })
    user2: Customer;

    @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
    createdAt?: Date;

    @OneToMany(type => CustomerActivity, (customer_activity) => customer_activity.id)
    customerActivities?: CustomerActivity[];

    @OneToMany(type => DalyActivities, (daly_activities) => daly_activities.id)
    dalyActivities?: DalyActivities[];

    @OneToMany(type => MonthActivities, (month_activities) => month_activities.id)
    monthActivities?: MonthActivities[];
}