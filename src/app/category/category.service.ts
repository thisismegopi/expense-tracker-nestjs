import { Injectable } from '@nestjs/common';
import { Category } from './category.entity';
import { CategoryRepository } from './category.repository';
import { DataSource } from 'typeorm';
import { CreateCategory, GetAllCategory, UpdateCategory } from './dto/request.dto';

@Injectable()
export class CategoryService {
    constructor(private readonly datasource: DataSource) {}
    private readonly categoryRepository = new CategoryRepository(this.datasource.manager);

    getCategory(filter: GetAllCategory): Promise<Category[]> {
        return this.categoryRepository.getAllCategories(filter);
    }

    createCategory(data: CreateCategory) {
        return this.categoryRepository.createCategory(data);
    }

    updateCategory(id: string, data: UpdateCategory) {
        return this.categoryRepository.updateCategory(id, data);
    }
}
