import { AuthRequestDto } from "src/dtos/auth/authRequest.dto";

export interface IAuthService {
    signIn(auth: AuthRequestDto): Promise<AuthRequestDto>;
}