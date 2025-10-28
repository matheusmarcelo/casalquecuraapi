import { IsDateString, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class CustomerDto {
    @IsString({ message: 'Name must be a string type' })
    @MaxLength(255, { message: 'Max 255 character for name' })
    @MinLength(1, { message: 'Min 1 character for name' })
    @IsNotEmpty({ message: 'Name must have a value' })
    name: string;

    @IsString({ message: 'Email must be a string type' })
    @MaxLength(50, { message: 'Max 50 character for email' })
    @MinLength(1, { message: 'Min 1 character for email' })
    @IsNotEmpty({ message: 'Email must have a value' })
    email: string;

    @IsString({ message: 'Password must be a string type' })
    @MaxLength(255, { message: 'Max 255 character for password' })
    @MinLength(1, { message: 'Min 1 character for password' })
    @IsNotEmpty({ message: 'Password must have a value' })
    password: string;

    @IsDateString()
    @IsNotEmpty({ message: 'Date of birth must have a value' })
    date_of_birth: Date;

    @IsString({ message: 'Phone must be a string type' })
    @MaxLength(25, { message: 'Max 25 character for phone' })
    @IsNotEmpty({ message: 'Phone must have a value' })
    phone: string;
}