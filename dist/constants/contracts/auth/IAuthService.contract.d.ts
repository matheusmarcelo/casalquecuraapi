import { AuthRequestDto } from "src/dtos/auth/authRequest.dto";
import { AuthResponseDto } from "src/dtos/auth/authResponse.dto";
export interface IAuthService {
    signIn(auth: AuthRequestDto): Promise<AuthResponseDto>;
    resetPassword(email: string): Promise<void>;
}
