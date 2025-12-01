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
    score: number;

    @Column({ type: 'bit', default: true })
    isGeneral?: boolean;

    @CreateDateColumn({ type: 'timestamp' })
    createdAt?: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt?: Date;

    @OneToMany(type => CustomerActivity, (customer_activity) => customer_activity.activity)
    activities?: CustomerActivity[];

    isLinkedUserActivity?: boolean;
}