import { Category } from '../../category/dto/response.dto';
import { TransactionType } from '../enum';
import { ApiProperty } from '@nestjs/swagger';

export class Transaction {
    @ApiProperty({ format: 'uuid' })
    transactionId: string;

    @ApiProperty({ enum: TransactionType })
    transactionType: TransactionType;

    @ApiProperty()
    amount: number;

    @ApiProperty({ nullable: true })
    note: string;

    @ApiProperty()
    dateTime: Date;

    @ApiProperty()
    createdAt: Date;

    @ApiProperty()
    updatedAt: Date;

    @ApiProperty({ type: Category })
    category: Category;
}

export class GetTransactions {
    @ApiProperty({ enum: TransactionType })
    transactionType: TransactionType | 'ALL';

    @ApiProperty()
    totalTransactions: number;

    @ApiProperty()
    totalExpense: number;

    @ApiProperty()
    totalIncome: number;

    @ApiProperty({ type: Transaction, isArray: true })
    transactions: Transaction[];
}
