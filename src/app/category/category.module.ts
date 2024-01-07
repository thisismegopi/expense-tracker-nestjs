import { Module } from '@nestjs/common';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { getDataSourceToken } from '@nestjs/typeorm';
import { CategoryRepository } from './category.repository';
import { DataSource } from 'typeorm';

@Module({
    controllers: [CategoryController],
    providers: [
        CategoryService,
        {
            provide: CategoryRepository,
            useFactory: (datasource: DataSource) => {
                return new CategoryRepository(datasource.manager);
            },
            inject: [getDataSourceToken()],
        },
    ],
})
export class CategoryModule {}
