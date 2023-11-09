import { EntityManager, Repository } from 'typeorm';
import { Transaction } from './transaction.entity';
import { CreateTransactionDto, UpdateTransactionDto, getTransactionDto } from './dto';
import { Category } from 'src/category/category.entity';
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

    async getTransactions(filter: getTransactionDto) {
        const { days, type, withCategory } = filter;
        const transactionQuery = this.createQueryBuilder('transaction');

        if (withCategory) {
            transactionQuery.leftJoinAndSelect('transaction.category', 'category');
        }

        if (filter.days) {
            transactionQuery.where('transaction.dateTime >= :time', { time: utc().subtract(days, 'days') });
        } else {
            transactionQuery.where('transaction.dateTime >= :from', { from: utc().startOf('month') });
            transactionQuery.andWhere('transaction.dateTime <= :to', { to: utc().endOf('month') });
        }

        transactionQuery.andWhere('transaction.transactionType = :type', { type });

        const [transactions, count] = await transactionQuery.getManyAndCount();
        const totalAmount = transactions.reduce((accumulator, currentValue) => accumulator + Number(currentValue.amount), 0);

        return { count, totalAmount, transactions };
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

    async updateTransaction(id: string, updateTransactionData: UpdateTransactionDto, category?: Category) {
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
