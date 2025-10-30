import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { DITokensService } from 'src/constants/enums/DITokens/DITokens.enum';
import { CustomerService } from '../customer/customer.service';

@Module({
  imports: [
    JwtModule.registerAsync({
      global: true,
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: +configService.get<number>('JWT_EXPIRATION_TIME')! }
      }),
      inject: [ConfigService]
    }),
  ],
  controllers: [AuthController],
  providers: [
    {
      provide: DITokensService.AUTH_SERVICE,
      useClass: AuthService
    },
    {
      provide: DITokensService.CUSTOMER_SERVICE,
      useClass: CustomerService
    },
  ],
})
export class AuthModule { }
