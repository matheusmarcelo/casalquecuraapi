import { Global, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IResetPasswordRepository } from 'src/constants/contracts/reset-password/IResetPasswordRepository.contract';
import { ResetPassword } from 'src/entitites/reset-password/reset_password.entity';
import { Repository } from 'typeorm';

@Global()
@Injectable()
export class ResetPasswordRepositoryPostgresql implements IResetPasswordRepository {

    constructor(
        @InjectRepository(ResetPassword)
        private readonly resetPasswordRepository: Repository<ResetPassword>
    ) { }

    async createRecoverPasswordAsync(resetPassword: ResetPassword): Promise<void> {
        await this.resetPasswordRepository.save(resetPassword);
    }

    async getRecoverPasswordAsync(token: string, ipAddress: string): Promise<ResetPassword | null> {
        return await this.resetPasswordRepository.findOne({ where: { token, ipAddress, validated: false } });
    }

    async validateTokenAsync(id: string): Promise<void> {
        await this.resetPasswordRepository.update(id, { validated: true });
    }
}
