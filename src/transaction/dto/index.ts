import { IsDateString, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID, Max, MaxLength, Min, MinLength } from 'class-validator';
import { TransactionType } from '../enum';
import { isBefore } from '../validator/data';
import { Type } from 'class-transformer';
import { PartialType } from '@nestjs/swagger';

export class CreateTransactionDto {
    @IsEnum(TransactionType)
    @IsNotEmpty()
    transactionType: TransactionType;

    @IsNotEmpty()
    @IsNumber({ maxDecimalPlaces: 2 })
    @Type(() => Number)
    amount: number;

    @IsString()
    @MinLength(8)
    @MaxLength(32)
    @IsOptional()
    note?: string;

    @IsDateString({ strict: true })
    @IsNotEmpty()
    @isBefore({ message: 'Please enter a valid past time' })
    dateTime: Date;

    @IsUUID(4)
    categoryId: string;
}

export class getTransactionDto {
    @IsOptional()
    @IsNotEmpty()
    @IsEnum(TransactionType)
    type?: TransactionType;

    @IsOptional()
    @IsNumber()
    @Min(1)
    @Max(90)
    @Type(() => Number)
    days?: number;
}

export class UpdateTransactionDto extends PartialType(CreateTransactionDto) {}
