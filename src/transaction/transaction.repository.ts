import { EntityManager, Repository } from 'typeorm';
import { Transaction } from './transaction.entity';
import { CreateTransactionDto } from './dto';
import { Category } from 'src/category/category.entity';
import { ConflictException, InternalServerErrorException } from '@nestjs/common';

export class TransactionRepository extends Repository<Transaction> {
    constructor(manager: EntityManager) {
        super(Transaction, manager);
    }

    async createTransaction(createTransactionData: CreateTransactionDto, category: Category) {
        const { amount, dateTime, transactionType, note } = createTransactionData;
        if (category.categoryType != transactionType) {
            throw new ConflictException('Transaction type and category type missmatch');
        }
        const transaction = this.create({ amount, transactionType, note, dateTime, category });
        try {
            return await this.save(transaction);
        } catch (error) {
            throw new InternalServerErrorException();
        }
    }
}
