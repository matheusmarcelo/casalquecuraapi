import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { CustomerActivity } from "../customer-activity/customer-activity.entity";

@Entity({ name: 'activities' })
export class Activity {
    @PrimaryGeneratedColumn('identity', { generatedIdentity: 'ALWAYS' })
    id?: string;

    @Column({ type: 'varchar' })
    title: string;

    @Column({ type: 'varchar' })
    description: string;

    @Column({ type: 'decimal' })
    score: string;

    @Column({ type: 'bit', default: true })
    isGeneral: string;

    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: Date;

    @OneToMany(type => CustomerActivity, (customer_activity) => customer_activity.activity_id)
    activity_id: CustomerActivity[];
}