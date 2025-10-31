import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Customer } from "../customer/customer.entity";

@Entity('month_activities')
export class MonthActivities {
    @PrimaryGeneratedColumn('identity', { generatedIdentity: 'ALWAYS' })
    id?: string;

    @ManyToOne(type => Customer, (customer) => customer.id)
    @JoinColumn({ name: 'user_id' })
    user: Customer;

    @Column({ name: 'total_score', type: 'decimal' })
    totalScore: number;

    @Column({ type: 'int' })
    month: number;

    @Column({ type: 'int' })
    year: number;
}