import { Injectable } from '@nestjs/common';
import { Category } from './category.entity';
import { CategoryRepository } from './category.repository';
import { DataSource } from 'typeorm';
import { CreateCategoryDto, GetCategoryFilterDto, UpdateCategoryDto } from './dto';

@Injectable()
export class CategoryService {
    constructor(private readonly datasource: DataSource) {}
    private readonly categoryRepository = new CategoryRepository(this.datasource.manager);

    getCategory(filter: GetCategoryFilterDto): Promise<Category[]> {
        return this.categoryRepository.getAllCategories(filter);
    }

    createCategory(data: CreateCategoryDto) {
        return this.categoryRepository.createCategory(data);
    }

    updateCategory(id: string, data: UpdateCategoryDto) {
        return this.categoryRepository.updateCategory(id, data);
    }
}
