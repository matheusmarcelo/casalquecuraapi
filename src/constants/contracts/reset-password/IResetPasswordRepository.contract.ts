import { ResetPassword } from "src/entitites/reset-password/reset_password.entity";

export interface IResetPasswordRepository {
    createRecoverPasswordAsync(resetPassword: ResetPassword): Promise<void>;
    getRecoverPasswordAsync(token: string): Promise<ResetPassword | null>;
    validateTokenAsyncAsync(id: string): Promise<void>;
}