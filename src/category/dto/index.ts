import { PartialType } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';
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

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {}
