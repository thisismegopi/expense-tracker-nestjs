import { IsBoolean, IsDateString, IsDecimal, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID, Max, MaxLength, Min, MinLength } from 'class-validator';
import { TransactionType } from '../enum';
import { isBefore } from '../validator/data';
import { Type } from 'class-transformer';

export class CreateTransactionDto {
    @IsEnum(TransactionType)
    @IsNotEmpty()
    transactionType: TransactionType;

    @IsDecimal({ decimal_digits: '1,3' })
    @IsNotEmpty()
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
    @IsNotEmpty()
    @IsEnum(TransactionType)
    type: TransactionType;

    @IsNotEmpty()
    @IsNumber()
    @Min(1)
    @Max(90)
    @Type(() => Number)
    days: number;

    @IsNotEmpty()
    @IsBoolean()
    @Type(() => Boolean)
    withCategory: boolean;
}

export class UpdateTransactionDto {
    @IsEnum(TransactionType)
    @IsOptional()
    transactionType?: TransactionType;

    @IsDecimal({ decimal_digits: '1,3' })
    @IsOptional()
    amount?: number;

    @IsString()
    @MinLength(8)
    @MaxLength(32)
    @IsOptional()
    note?: string;

    @IsDateString({ strict: true })
    @IsOptional()
    @isBefore({ message: 'Please enter a valid past time' })
    dateTime?: Date;

    @IsUUID(4)
    @IsOptional()
    categoryId?: string;
}
