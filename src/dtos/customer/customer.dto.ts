import { IsDateString, IsString, MaxLength, MinLength } from "class-validator";

export class CustomerDto {
    @IsString()
    @MaxLength(255)
    name: string;

    @IsString()
    @MaxLength(50)
    email: string;

    @IsString()
    @MaxLength(255)
    password: string;

    @IsDateString()
    date_of_birth: Date;

    @IsString()
    @MaxLength(25)
    phone: string;
}