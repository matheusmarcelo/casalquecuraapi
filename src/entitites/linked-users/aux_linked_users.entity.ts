import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Customer } from "../customer/customer.entity";

@Entity('aux_linked_users')
export class AuxLinkedUsers {
    @PrimaryGeneratedColumn('identity', { generatedIdentity: 'ALWAYS' })
    id?: string;

    @ManyToOne(type => Customer, (customer) => customer.id)
    @JoinColumn({ name: 'from_user_id' })
    from: Customer;

    @ManyToOne(type => Customer, (customer) => customer.id)
    @JoinColumn({ name: 'to_user_id' })
    to: Customer;

    @Column({ name: 'expirate_at', type: 'date', default: () => "CURRENT_DATE + INTERVAL '2 days'" })
    expirateAt?: Date;

    @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
    createdAt?: Date;
}