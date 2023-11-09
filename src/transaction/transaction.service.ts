import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { TransactionRepository } from './transaction.repository';
import { CreateTransactionDto } from './dto';
import { CategoryRepository } from 'src/category/category.repository';

@Injectable()
export class TransactionService {
    constructor(private readonly datasource: DataSource) {}
    private readonly transactionRepository = new TransactionRepository(this.datasource.manager);
    private readonly categoryRepository = new CategoryRepository(this.datasource.manager);

    async createTransaction(createTransactionData: CreateTransactionDto) {
        const category = await this.categoryRepository.getCategoryById(createTransactionData.categoryId);
        return await this.transactionRepository.createTransaction(createTransactionData, category);
    }
}
