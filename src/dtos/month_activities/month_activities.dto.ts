import { IsNotEmpty, IsString } from "class-validator";

export class MonthActivitiesDto {
    @IsString({ message: 'User id must be a string type' })
    @IsNotEmpty({ message: 'User must have a value' })
    userId: string;
}