import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { TransactionRepository } from './transaction.repository';
import { CreateTransactionDto, UpdateTransactionDto, getTransactionDto } from './dto';
import { CategoryRepository } from '../category/category.repository';
import { Category } from '../category/category.entity';
import { TransactionType } from './enum';

@Injectable()
export class TransactionService {
    constructor(private readonly datasource: DataSource) {}
    private readonly transactionRepository = new TransactionRepository(this.datasource.manager);
    private readonly categoryRepository = new CategoryRepository(this.datasource.manager);

    getTransactionById(id: string) {
        return this.transactionRepository.getTransactionById(id, true);
    }

    async getTransactions(filter: getTransactionDto) {
        const { type } = filter;

        let transactionType: TransactionType | 'ALL' = 'ALL';
        let totalExpense = 0;
        let totalIncome = 0;
        if (type) {
            transactionType = type;
        }

        const { totalTransactions, transactions } = await this.transactionRepository.getTransactions(filter);

        totalExpense = transactions.filter(t => t.transactionType === TransactionType.EXPENSE).reduce((acc, curr) => acc + Number(curr.amount), 0);
        totalIncome = transactions.filter(t => t.transactionType === TransactionType.INCOME).reduce((acc, curr) => acc + Number(curr.amount), 0);

        return { transactionType, totalTransactions, totalExpense, totalIncome, transactions };
    }

    async createTransaction(createTransactionData: CreateTransactionDto) {
        const category = await this.categoryRepository.getCategoryById(createTransactionData.categoryId);
        return await this.transactionRepository.createTransaction(createTransactionData, category);
    }

    async updateTransaction(transactionId: string, updateTransactionData: UpdateTransactionDto) {
        let category: Category = undefined;
        if (updateTransactionData.categoryId) {
            category = await this.categoryRepository.getCategoryById(updateTransactionData.categoryId);
        }
        return await this.transactionRepository.updateTransaction(transactionId, updateTransactionData, category);
    }
}
