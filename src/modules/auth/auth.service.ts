import { HttpException, HttpStatus, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { IAuthService } from 'src/constants/contracts/auth/IAuthService.contract';
import type { ICustomerService } from 'src/constants/contracts/customer/ICustomerService.contract';
import { DITokensService } from 'src/constants/enums/DITokens/DITokens.enum';
import { AuthRequestDto } from 'src/dtos/auth/authRequest.dto';
import { compareSync as bcryptCompareSync } from 'bcrypt';
import { AuthResponseDto } from 'src/dtos/auth/authResponse.dto';
import { MailerService } from '../mailer/mailer.service';
import { SendEmailDto } from 'src/dtos/mailer/mailer.dto';

@Injectable()
export class AuthService implements IAuthService {

    constructor(
        @Inject(DITokensService.CUSTOMER_SERVICE)
        private readonly customerService: ICustomerService,
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

    async resetPassword(email: string): Promise<void> {
        const customer = await this.customerService.getCustomerByEmail(email);

        if (!customer) {
            throw new HttpException('Customer not found', HttpStatus.NOT_FOUND);
        }

        const token = this.generateToken();

        const sendEmail: SendEmailDto = {
            from: { name: 'Matheus', address: 'matheusmarcelo314@gmail.com' },
            recipients: [{ name: 'Marcelo', address: 'matheusmarcelo314@gmail.com' }],
            subject: 'Reset password test',
            html: `<p><strong>token: ${token}</strong></p>, não compartilhe seu token`
        }

        return await this.mailerService.sendEmail(sendEmail);
    }

    private generateToken(): number {
        return Math.floor(100000 + Math.random() * 900000);
    }
}
