import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('reset_password')
export class ResetPassword {
    @PrimaryGeneratedColumn('identity', { generatedIdentity: 'ALWAYS' })
    id?: string;

    @Column({ type: "varchar", length: 10, nullable: false })
    token: string;

    @Column({ name: 'ip_address', length: 45, nullable: false })
    ipAddress: string;

    @Column({ name: 'validated', type: 'bit' })
    validated: boolean;

    @Column({ name: 'expires_in', type: 'timestamp', default: () => "CURRENT_TIMESTAMP + INTERVAL '30 minutes'" })
    expiresIn?: Date;

    @CreateDateColumn({ type: 'timestamp' })
    createdAt?: Date;
}