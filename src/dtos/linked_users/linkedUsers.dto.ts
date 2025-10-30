import { IsBoolean, IsNotEmpty, IsString } from "class-validator";

export class LinkedUsersDto {
    @IsString({ message: 'The requester id must be string type' })
    @IsNotEmpty({ message: 'The requester id must have a value' })
    fromId: string;

    @IsString({ message: 'The receiver email must be string type' })
    @IsNotEmpty({ message: 'The receiver email must have a value' })
    emailReceiver: string;

    isRequester: boolean;

    id?: string;

    expirateAt?: Date;
}