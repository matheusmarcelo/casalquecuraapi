import { IResetPasswordRepository } from 'src/constants/contracts/reset-password/IResetPasswordRepository.contract';
import { ResetPassword } from 'src/entitites/reset-password/reset_password.entity';
import { Repository } from 'typeorm';
export declare class ResetPasswordRepositoryPostgresql implements IResetPasswordRepository {
    private readonly resetPasswordRepository;
    constructor(resetPasswordRepository: Repository<ResetPassword>);
    createResetPasswordAsync(resetPassword: ResetPassword): Promise<void>;
    getResetPasswordAsync(token: string): Promise<ResetPassword | null>;
    updateResetPasswordAsync(id: string): Promise<void>;
}
