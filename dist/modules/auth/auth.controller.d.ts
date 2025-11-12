import type { Request } from 'express';
import type { IAuthService } from 'src/constants/contracts/auth/IAuthService.contract';
import { AuthRequestDto } from 'src/dtos/auth/authRequest.dto';
import { AuthResponseDto } from 'src/dtos/auth/authResponse.dto';
import { ResetPasswordDto } from 'src/dtos/reset_password/reset_password.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: IAuthService);
    signIn(auth: AuthRequestDto): Promise<AuthResponseDto>;
    recoverPassword(body: {
        email: string;
    }, req: Request): Promise<void | string>;
    validateToken(body: {
        token: string;
    }, req: Request): Promise<void>;
    resetPassword(body: ResetPasswordDto): Promise<void>;
}
