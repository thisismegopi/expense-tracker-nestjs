import { IsEnum, IsNotEmpty, IsOptional, IsString, IsUUID, MaxLength, MinLength } from 'class-validator';
import { TransactionType } from 'src/transaction/enum';

export class GetCategoryFilterDto {
    @IsOptional()
    @IsEnum(TransactionType)
    type?: TransactionType;
}

export class CreateCategoryDto {
    @IsNotEmpty()
    @MinLength(8)
    @MaxLength(32)
    @IsString()
    categoryName: string;

    @IsNotEmpty()
    @IsEnum(TransactionType)
    categoryType: TransactionType;
}

export class UpdateCategoryDto {
    @IsOptional()
    @MinLength(8)
    @MaxLength(32)
    @IsString()
    categoryName?: string;

    @IsOptional()
    @IsEnum(TransactionType)
    categoryType?: TransactionType;
}
