import { IsNotEmpty, IsString } from "class-validator";

export class DalyActivitiesDto {
    @IsString({ message: 'User id must be a string type' })
    @IsNotEmpty({ message: 'User id must have a value' })
    userId: string;

    @IsString({ message: 'Activity id must be a string type' })
    @IsNotEmpty({ message: 'Activity id must have a value' })
    activityId: string;
}