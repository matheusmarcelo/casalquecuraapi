import type { Request } from 'express';
import type { IAuthService } from 'src/constants/contracts/auth/IAuthService.contract';
import { AuthRequestDto } from 'src/dtos/auth/authRequest.dto';
import { AuthResponseDto } from 'src/dtos/auth/authResponse.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: IAuthService);
    signIn(auth: AuthRequestDto): Promise<AuthResponseDto>;
    recoverPassword(body: {
        email: string;
    }, req: Request): Promise<void | string>;
}
