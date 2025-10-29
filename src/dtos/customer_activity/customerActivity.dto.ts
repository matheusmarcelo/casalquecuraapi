import { IsNotEmpty, IsString } from "class-validator";

export class CustomerActivityDto {
    @IsString({ message: 'Customer id must be string type' })
    @IsNotEmpty({ message: 'Customer id must have a value' })
    customer_id: string;

    @IsString({ message: 'Activity id must be string type' })
    @IsNotEmpty({ message: 'Activity id must have a value' })
    activity_id: string;
}