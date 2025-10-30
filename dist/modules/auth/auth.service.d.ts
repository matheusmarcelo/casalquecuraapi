import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { IAuthService } from 'src/constants/contracts/auth/IAuthService.contract';
import type { ICustomerService } from 'src/constants/contracts/customer/ICustomerService.contract';
import { AuthRequestDto } from 'src/dtos/auth/authRequest.dto';
import { AuthResponseDto } from 'src/dtos/auth/authResponse.dto';
export declare class AuthService implements IAuthService {
    private readonly customerService;
    private readonly jwtService;
    private readonly configService;
    constructor(customerService: ICustomerService, jwtService: JwtService, configService: ConfigService);
    signIn(auth: AuthRequestDto): Promise<AuthResponseDto>;
}
