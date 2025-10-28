import { UserRoles } from "src/constants/enums/userRole.enum";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { CustomerActivity } from "../customer-activity/customer-activity.entity";

@Entity({ name: 'users' })
export class Customer {
    @PrimaryGeneratedColumn("uuid")
    id?: string;

    @Column({ type: "varchar", length: 255 })
    name: string;

    @Column({ unique: true, length: 150 })
    email: string;

    @Column({ type: 'varchar' })
    password: string;

    @Column({ type: 'date', nullable: false })
    date_of_birth: Date;

    @Column({ length: 100, nullable: false })
    phone: string;

    @Column({ length: 150, nullable: true })
    street?: string;

    @Column({ length: 100, nullable: true })
    neighborhood?: string;

    @Column({ length: 20, nullable: true })
    zipcode?: string;

    @Column({ length: 10, nullable: true })
    house_number?: string;

    @Column({ type: 'text', nullable: true })
    description?: string;

    @Column({ length: 10, nullable: true })
    gender?: string;

    @Column({ length: 50, default: UserRoles.CUSTOMER })
    role?: string;

    @CreateDateColumn({ type: 'timestamp' })
    createdAt?: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt?: Date;

    @Column({ default: true })
    isActive?: boolean;

    @OneToMany(type => CustomerActivity, (customer_activity) => customer_activity.cusomer_id)
    customer_id?: CustomerActivity[];
}