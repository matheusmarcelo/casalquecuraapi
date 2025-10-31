import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class ResetPasswordDto {
    @IsString({ message: 'Email must be a string type' })
    @IsNotEmpty({ message: 'Email must have a value' })
    @MaxLength(50, { message: 'Max 50 character for email' })
    @MinLength(1, { message: 'Min 1 character for email' })
    email: string;

    @IsString({ message: 'Password must be a string type' })
    @IsNotEmpty({ message: 'Password must have a value' })
    password: string;
}