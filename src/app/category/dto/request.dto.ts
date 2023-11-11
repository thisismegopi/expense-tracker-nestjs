import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';
import { TransactionType } from '../../transaction/enum';

export class GetAllCategory {
    @ApiProperty({ enum: TransactionType, required: false })
    @IsOptional()
    @IsEnum(TransactionType)
    type?: TransactionType;
}

export class CreateCategory {
    @ApiProperty()
    @IsNotEmpty()
    @MinLength(8)
    @MaxLength(32)
    @IsString()
    categoryName: string;

    @ApiProperty({ enum: TransactionType })
    @IsNotEmpty()
    @IsEnum(TransactionType)
    categoryType: TransactionType;
}

export class UpdateCategory extends PartialType(CreateCategory) {}
