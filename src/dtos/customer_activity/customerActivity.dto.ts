import { IsNotEmpty, IsOptional, IsString, ValidateIf, } from "class-validator";

export class CustomerActivityDto {
    @ValidateIf((o) => !o.linked_users_id)
    @IsString({ message: 'Customer id must be string type' })
    customer_id?: string;

    @ValidateIf((o) => !o.customer_id)
    @IsString({ message: 'Linked users id must be string type' })
    linked_users_id?: string;

    @IsString({ message: 'Activity id must be string type' })
    @IsNotEmpty({ message: 'Activity id must have a value' })
    activity_id: string;
}