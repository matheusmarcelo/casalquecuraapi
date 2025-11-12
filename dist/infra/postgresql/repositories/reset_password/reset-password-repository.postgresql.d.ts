import { IResetPasswordRepository } from 'src/constants/contracts/reset-password/IResetPasswordRepository.contract';
import { ResetPassword } from 'src/entitites/reset-password/reset_password.entity';
import { Repository } from 'typeorm';
export declare class ResetPasswordRepositoryPostgresql implements IResetPasswordRepository {
    private readonly resetPasswordRepository;
    constructor(resetPasswordRepository: Repository<ResetPassword>);
    createRecoverPasswordAsync(resetPassword: ResetPassword): Promise<void>;
    getRecoverPasswordAsync(token: string, ipAddress: string): Promise<ResetPassword | null>;
    validateTokenAsync(id: string): Promise<void>;
}
