import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class AuthRequestDto {
    @IsString({ message: 'Username must be a string type' })
    @IsNotEmpty({ message: 'Username must have a value' })
    @MaxLength(50, { message: 'Max 50 character for username' })
    @MinLength(1, { message: 'Min 1 character for username' })
    username: string;

    @IsString({ message: 'Password must be a string type' })
    @IsNotEmpty({ message: 'Password must have a value' })
    @MaxLength(50, { message: 'Max 50 character for Password' })
    @MinLength(1, { message: 'Min 1 character for Password' })
    password: string;
}