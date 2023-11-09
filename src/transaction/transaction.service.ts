import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { TransactionRepository } from './transaction.repository';
import { CreateTransactionDto, UpdateTransactionDto, getTransactionDto } from './dto';
import { CategoryRepository } from '../category/category.repository';
import { Category } from '../category/category.entity';

@Injectable()
export class TransactionService {
    constructor(private readonly datasource: DataSource) {}
    private readonly transactionRepository = new TransactionRepository(this.datasource.manager);
    private readonly categoryRepository = new CategoryRepository(this.datasource.manager);

    getTransactionById(id: string) {
        return this.transactionRepository.getTransactionById(id, true);
    }

    getTransactions(filter: getTransactionDto) {
        return this.transactionRepository.getTransactions(filter);
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
