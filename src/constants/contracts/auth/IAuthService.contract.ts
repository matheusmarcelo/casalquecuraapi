import { AuthRequestDto } from "src/dtos/auth/authRequest.dto";
import { AuthResponseDto } from "src/dtos/auth/authResponse.dto";
import { ResetPasswordDto } from "src/dtos/reset_password/reset_password.dto";

export interface IAuthService {
    signIn(auth: AuthRequestDto): Promise<AuthResponseDto>;
    recoverPassword(email: string, ipAddress: string): Promise<void>;
    validateTokenAsync(token: string): Promise<void>;
    resetPasswordAsync(resetPassword: ResetPasswordDto): Promise<void>;
}