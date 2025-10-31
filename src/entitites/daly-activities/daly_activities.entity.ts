import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Activity } from "../activity/activity.entity";
import { Customer } from "../customer/customer.entity";

@Entity('daly_activities')
export class DalyActivities {
    @PrimaryGeneratedColumn('identity', { generatedIdentity: 'ALWAYS' })
    id?: string;

    @ManyToOne(type => Customer, (customer: Customer) => customer.id)
    @JoinColumn({ name: 'user_id' })
    user: Customer;

    @ManyToOne(type => Activity, (activity: Activity) => activity.id)
    @JoinColumn({ name: 'activity_id' })
    activity: Activity;

    @CreateDateColumn({ type: 'timestamp', name: 'completion_date' })
    completionDate?: Date;

    @Column({ type: 'decimal', nullable: false })
    score: number;
}