import { Between, EntityManager, MoreThanOrEqual, Repository } from 'typeorm';
import { Transaction } from './transaction.entity';
import { CreateTransaction, UpdateTransaction, GetAllTransaction } from './dto/request.dto';
import { Category } from '../category/category.entity';
import { ConflictException, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { utc } from 'moment';

export class TransactionRepository extends Repository<Transaction> {
    constructor(manager: EntityManager) {
        super(Transaction, manager);
    }

    async getTransactionById(id: string, loadRelation = false) {
        const found = await this.findOne({ where: { transactionId: id }, relations: { category: loadRelation } });
        if (!found) {
            throw new NotFoundException(`Transaction with ID "${id}" not found`);
        }
        return found;
    }

    async getTransactions(filter: GetAllTransaction) {
        const { days, type } = filter;

        const [transactions, totalTransactions] = await this.findAndCount({
            relations: {
                category: true,
            },
            where: {
                transactionType: type ?? undefined,
                dateTime: days ? MoreThanOrEqual(utc().subtract(days, 'days').toDate()) : Between(utc().startOf('month').toDate(), utc().endOf('month').toDate()),
            },
            order: {
                dateTime: 'DESC',
            },
        });
        return { transactions, totalTransactions };
    }

    async createTransaction(createTransactionData: CreateTransaction, category: Category) {
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

    async updateTransaction(id: string, updateTransactionData: UpdateTransaction, category?: Category) {
        const { amount, dateTime, note, transactionType } = updateTransactionData;
        if (category && category.categoryType != transactionType) {
            throw new ConflictException('Transaction type and category type missmatch');
        }
        const transaction = await this.update(id, { transactionType, amount, dateTime, note, category });
        if (transaction.affected === 0) {
            throw new NotFoundException(`Transaction with ID "${id}" not found`);
        }
        return await this.getTransactionById(id, true);
    }
}
