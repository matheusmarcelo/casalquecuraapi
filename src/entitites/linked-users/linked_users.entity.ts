import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Customer } from "../customer/customer.entity";

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
}