import { HttpException, HttpStatus, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { IAuthService } from 'src/constants/contracts/auth/IAuthService.contract';
import type { ICustomerService } from 'src/constants/contracts/customer/ICustomerService.contract';
import { DITokensRepository, DITokensService } from 'src/constants/enums/DITokens/DITokens.enum';
import { AuthRequestDto } from 'src/dtos/auth/authRequest.dto';
import { compareSync as bcryptCompareSync } from 'bcrypt';
import { AuthResponseDto } from 'src/dtos/auth/authResponse.dto';
import { MailerService } from '../mailer/mailer.service';
import { SendEmailDto } from 'src/dtos/mailer/mailer.dto';
import { ResetPasswordDto } from 'src/dtos/reset_password/reset_password.dto';
import { ResetPassword } from 'src/entitites/reset-password/reset_password.entity';
import type { IResetPasswordRepository } from 'src/constants/contracts/reset-password/IResetPasswordRepository.contract';
import { hashSync as bcryptHashSync } from 'bcrypt';

@Injectable()
export class AuthService implements IAuthService {

    constructor(
        @Inject(DITokensService.CUSTOMER_SERVICE)
        private readonly customerService: ICustomerService,
        @Inject(DITokensRepository.RESET_PASSWORD_REPOSITORY)
        private readonly resetPasswordRepository: IResetPasswordRepository,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService,
        private readonly mailerService: MailerService,
    ) { }

    async signIn(auth: AuthRequestDto): Promise<AuthResponseDto> {
        const customer = await this.customerService.getCustomerByEmail(auth.username);

        if (!bcryptCompareSync(auth.password, customer!.password)) {
            throw new UnauthorizedException();
        }

        const payload = { sub: customer!.id, username: customer!.email, role: customer!.role as string }

        const token = this.jwtService.sign(payload);

        return {
            access_token: token,
            user_role: customer!.role as string,
            expiresIn: +this.configService.get<number>('JWT_EXPIRATION_TIME')!,
        }
    }

    async recoverPassword(email: string, ipAddress: string): Promise<void> {
        const customer = await this.customerService.getCustomerByEmail(email);

        if (!customer) {
            throw new HttpException('Customer not found', HttpStatus.NOT_FOUND);
        }

        const token = this.generateToken();

        const sendEmail: SendEmailDto = {
            from: {
                name: this.configService.get<string>('APP_NAME')!,
                address: this.configService.get<string>('MAIL_FROM')!
            },
            recipients: [
                { name: customer.name, address: email }
            ],
            subject: 'Utilize o código para redefinir sua senha',
            html: `<p><strong>token: ${token}</strong></p>, não compartilhe seu token`
        }

        const resetPassword: ResetPassword = {
            token: `${token}`,
            ipAddress,
            validated: false,
        }

        await this.resetPasswordRepository.createRecoverPasswordAsync(resetPassword);
        return await this.mailerService.sendEmail(sendEmail);
    }

    async validateTokenAsync(token: string): Promise<void> {
        const tokenFound = await this.resetPasswordRepository.getRecoverPasswordAsync(token);

        if (!tokenFound) {
            throw new HttpException('Token invalid', HttpStatus.NOT_FOUND);
        }

        const now = Date.now();
        const expiresIn = new Date(tokenFound.expiresIn!);

        if (now > expiresIn.getTime() || tokenFound.validated) {
            throw new HttpException('Token invalid', HttpStatus.NOT_FOUND);
        }

        await this.resetPasswordRepository.validateTokenAsyncAsync(tokenFound.id!);
    }

    async resetPasswordAsync(resetPassword: ResetPasswordDto): Promise<void> {
        const customer = await this.customerService.getCustomerByEmail(resetPassword.email);

        if (!customer) {
            throw new HttpException('Customer not found', HttpStatus.NOT_FOUND);
        }

        const saltOrRounds = 12;
        customer.password = bcryptHashSync(customer.password, saltOrRounds);

        await this.customerService.updateCustomerAsync(customer.id!, customer);
    }

    private generateToken(): number {
        return Math.floor(100000 + Math.random() * 900000);
    }
}
