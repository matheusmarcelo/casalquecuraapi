import { ResetPassword } from "src/entitites/reset-password/reset_password.entity";

export interface IResetPasswordRepository {
    createResetPasswordAsync(resetPassword: ResetPassword): Promise<void>;
    getResetPasswordAsync(token: string): Promise<ResetPassword | null>;
    updateResetPasswordAsync(id: string): Promise<void>;
}