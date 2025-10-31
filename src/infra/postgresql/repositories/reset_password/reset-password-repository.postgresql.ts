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

    async createResetPasswordAsync(resetPassword: ResetPassword): Promise<void> {
        await this.resetPasswordRepository.save(resetPassword);
    }

    async getResetPasswordAsync(token: string): Promise<ResetPassword | null> {
        return await this.resetPasswordRepository.findOne({ where: { token, validated: false } });
    }

    async updateResetPasswordAsync(id: string): Promise<void> {
        await this.resetPasswordRepository.update(id, { validated: true });
    }

}
