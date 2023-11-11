import { IsDateString, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID, Max, MaxLength, Min, MinLength } from 'class-validator';
import { TransactionType } from '../enum';
import { isBefore } from '../../../validator/date';
import { Type } from 'class-transformer';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class CreateTransaction {
    @ApiProperty({ enum: TransactionType })
    @IsEnum(TransactionType)
    @IsNotEmpty()
    transactionType: TransactionType;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber({ maxDecimalPlaces: 2 })
    @Type(() => Number)
    amount: number;

    @ApiProperty({ required: false, minimum: 8, maximum: 32 })
    @IsString()
    @MinLength(8)
    @MaxLength(32)
    @IsOptional()
    note?: string;

    @ApiProperty()
    @IsDateString({ strict: true })
    @IsNotEmpty()
    @isBefore({ message: 'Please enter a valid past time' })
    dateTime: Date;

    @ApiProperty({ format: ' uuid' })
    @IsUUID(4)
    categoryId: string;
}

export class GetAllTransaction {
    @ApiProperty({ enum: TransactionType, required: false })
    @IsOptional()
    @IsEnum(TransactionType)
    type?: TransactionType;

    @ApiProperty({ minimum: 1, maximum: 90, required: false })
    @IsOptional()
    @IsNumber()
    @Min(1)
    @Max(90)
    @Type(() => Number)
    days?: number;
}

export class UpdateTransaction extends PartialType(CreateTransaction) {}
