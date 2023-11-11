import { TransactionType } from '../../transaction/enum';
import { ApiProperty } from '@nestjs/swagger';

export class Category {
    @ApiProperty({ format: 'uuid' })
    categoryId: string;

    @ApiProperty()
    categoryName: string;

    @ApiProperty({ enum: TransactionType, enumName: 'TransactionType' })
    categoryType: TransactionType;

    @ApiProperty()
    createdAt: Date;

    @ApiProperty()
    updatedAt: Date;
}
