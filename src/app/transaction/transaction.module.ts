import { Module } from '@nestjs/common';
import { TransactionController } from './transaction.controller';
import { TransactionService } from './transaction.service';
import { getDataSourceToken } from '@nestjs/typeorm';
import { TransactionRepository } from './transaction.repository';
import { DataSource } from 'typeorm';
import { CategoryRepository } from '../category/category.repository';

@Module({
    controllers: [TransactionController],
    providers: [
        TransactionService,
        {
            provide: TransactionRepository,
            useFactory: (datasource: DataSource) => {
                return new TransactionRepository(datasource.manager);
            },
            inject: [getDataSourceToken()],
        },
        {
            provide: CategoryRepository,
            useFactory: (datasource: DataSource) => {
                return new CategoryRepository(datasource.manager);
            },
            inject: [getDataSourceToken()],
        },
    ],
})
export class TransactionModule {}
