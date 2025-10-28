import { Type } from "class-transformer";
import { IsBoolean, IsDecimal, IsNotEmpty, IsNumber, IsOptional, IsString, Max, MaxLength, Min, MinLength } from "class-validator";

export class ActivityDto {
    @IsString({ message: 'Title must be a string type' })
    @MaxLength(100, { message: 'Max 100 character for title' })
    @MinLength(3, { message: 'Min 3 character for title' })
    @IsNotEmpty({ message: 'Title must have a value' })
    title: string;

    @IsString()
    @IsNotEmpty({ message: 'Description must have a value' })
    @MaxLength(255, { message: 'Max 255 character for description' })
    @MinLength(3, { message: 'Min 3 character for description' })
    description: string;

    @IsNumber({}, { message: 'Score must be a number type' })
    @Type(() => Number)
    @Min(1, { message: 'Min 1 point for score' })
    @Max(100, { message: 'Max 100 point for score' })
    score: number;

    @IsBoolean({ message: 'isGeneral must be a boolean type' })
    @IsOptional()
    isGeneral: string;
}