import { Injectable } from '@nestjs/common';
import { TransactionRepository } from './transaction.repository';
import { CreateTransaction, UpdateTransaction, GetAllTransaction } from './dto/request.dto';
import { CategoryRepository } from '../category/category.repository';
import { Category } from '../category/category.entity';
import { TransactionType } from './enum';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TransactionService {
    constructor(
        @InjectRepository(TransactionRepository) private readonly transactionRepository: TransactionRepository,
        @InjectRepository(CategoryRepository) private readonly categoryRepository: CategoryRepository,
    ) {}

    getTransactionById(id: string) {
        return this.transactionRepository.getTransactionById(id, true);
    }

    async getTransactions(filter: GetAllTransaction) {
        const { type } = filter;

        let transactionType: TransactionType | 'ALL' = 'ALL';
        let totalExpense = 0;
        let totalIncome = 0;
        if (type) {
            transactionType = type;
        }

        const { totalTransactions, transactions } = await this.transactionRepository.getTransactions(filter);

        totalExpense = transactions.filter(t => t.transactionType === TransactionType.EXPENSE).reduce((acc, curr) => acc + Number(curr.amount), totalExpense);
        totalIncome = transactions.filter(t => t.transactionType === TransactionType.INCOME).reduce((acc, curr) => acc + Number(curr.amount), totalIncome);

        return { transactionType, totalTransactions, totalExpense, totalIncome, transactions };
    }

    async createTransaction(createTransactionData: CreateTransaction) {
        const category = await this.categoryRepository.getCategoryById(createTransactionData.categoryId);
        return await this.transactionRepository.createTransaction(createTransactionData, category);
    }

    async updateTransaction(transactionId: string, updateTransactionData: UpdateTransaction) {
        let category: Category = undefined;
        if (updateTransactionData.categoryId) {
            category = await this.categoryRepository.getCategoryById(updateTransactionData.categoryId);
        }
        return await this.transactionRepository.updateTransaction(transactionId, updateTransactionData, category);
    }
}
