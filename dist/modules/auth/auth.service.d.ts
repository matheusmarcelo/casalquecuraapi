import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { IAuthService } from 'src/constants/contracts/auth/IAuthService.contract';
import type { ICustomerService } from 'src/constants/contracts/customer/ICustomerService.contract';
import { AuthRequestDto } from 'src/dtos/auth/authRequest.dto';
import { AuthResponseDto } from 'src/dtos/auth/authResponse.dto';
import { MailerService } from '../mailer/mailer.service';
import type { IResetPasswordRepository } from 'src/constants/contracts/reset-password/IResetPasswordRepository.contract';
export declare class AuthService implements IAuthService {
    private readonly customerService;
    private readonly resetPasswordRepository;
    private readonly jwtService;
    private readonly configService;
    private readonly mailerService;
    constructor(customerService: ICustomerService, resetPasswordRepository: IResetPasswordRepository, jwtService: JwtService, configService: ConfigService, mailerService: MailerService);
    signIn(auth: AuthRequestDto): Promise<AuthResponseDto>;
    recoverPassword(email: string, ipAddress: string): Promise<void>;
    private generateToken;
}
