import { IsNotEmpty, IsString, ValidateIf } from "class-validator";

export class DalyActivitiesDto {
    @IsString({ message: 'User id must be a string type' })
    @ValidateIf((o) => !o.linked_users_id)
    userId: string;

    @IsString({ message: 'Activity id must be a string type' })
    @IsNotEmpty({ message: 'Activity id must have a value' })
    activityId: string;

    @ValidateIf((o) => !o.userId)
    @IsString({ message: 'Linked users id must be string type' })
    linked_users_id?: string;
}