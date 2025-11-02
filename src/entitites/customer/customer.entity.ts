import { UserRoles } from "src/constants/enums/userRole.enum";
import { BeforeInsert, Column, CreateDateColumn, Entity, OneToMany, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { CustomerActivity } from "../customer-activity/customer-activity.entity";
import { v4 as uuidv4 } from 'uuid';
import { AuxLinkedUsers } from "../linked-users/aux_linked_users.entity";
import { LinkedUsers } from "../linked-users/linked_users.entity";
import { DalyActivities } from "../daly-activities/daly_activities.entity";

@Entity({ name: 'users' })
export class Customer {
    @PrimaryColumn("uuid")
    id?: string;

    @BeforeInsert()
    generateId() {
        if (!this.id) {
            this.id = uuidv4();
        }
    }

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

    @OneToMany(type => CustomerActivity, (customer_activity) => customer_activity.customer)
    customers?: CustomerActivity[];

    @OneToMany(type => LinkedUsers, (linkedUsers) => linkedUsers.user1)
    user1?: LinkedUsers[];

    @OneToMany(type => LinkedUsers, (linkedUsers) => linkedUsers.user2)
    user2?: LinkedUsers[];

    @OneToMany(type => AuxLinkedUsers, (auxLinkedUsers) => auxLinkedUsers.from)
    fromAuxLinkedUsers?: AuxLinkedUsers[];

    @OneToMany(type => AuxLinkedUsers, (auxLinkedUsers) => auxLinkedUsers.to)
    toAuxLinkedUsers?: AuxLinkedUsers[];

    // daly relationship
    @OneToMany(type => DalyActivities, (dalyActivities) => dalyActivities.id)
    dalyActivities: DalyActivities[];
}