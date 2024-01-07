import { Injectable } from '@nestjs/common';
import { Category } from './category.entity';
import { CategoryRepository } from './category.repository';
import { CreateCategory, GetAllCategory, UpdateCategory } from './dto/request.dto';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CategoryService {
    constructor(@InjectRepository(CategoryRepository) private readonly categoryRepository: CategoryRepository) {}

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
