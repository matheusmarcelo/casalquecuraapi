import { IsBoolean, IsNotEmpty, IsString } from "class-validator";

export class LinkedUsersDto {
    @IsString({ message: 'The requester id must be string type' })
    @IsNotEmpty({ message: 'The requester id must have a value' })
    fromId: string;

    @IsString({ message: 'The receiver id must be string type' })
    @IsNotEmpty({ message: 'The receiver id must have a value' })
    toId: string;

    isRequester: boolean;
}