import { ResetPassword } from "src/entitites/reset-password/reset_password.entity";

export interface IResetPasswordRepository {
    createRecoverPasswordAsync(resetPassword: ResetPassword): Promise<void>;
    getRecoverPasswordAsync(token: string, ipAddress: string): Promise<ResetPassword | null>;
    validateTokenAsync(id: string): Promise<void>;
}