import { IsDateString, IsDecimal, IsEnum, IsNotEmpty, IsOptional, IsString, IsUUID, MaxLength, MinLength } from 'class-validator';
import { TransactionType } from '../enum';
import { isBefore } from '../validator/data';

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
