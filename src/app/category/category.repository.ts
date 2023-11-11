import { EntityManager, Repository } from 'typeorm';
import { Category } from './category.entity';
import { CreateCategory, GetAllCategory, UpdateCategory } from './dto/request.dto';
import { ConflictException, InternalServerErrorException, NotFoundException } from '@nestjs/common';

export class CategoryRepository extends Repository<Category> {
    constructor(manager: EntityManager) {
        super(Category, manager);
    }

    async getCategoryById(id: string) {
        const found = await this.findOne({ where: { categoryId: id } });
        if (!found) {
            throw new NotFoundException(`Category with ID "${id}" not found`);
        }
        return found;
    }

    async getAllCategories(filter: GetAllCategory) {
        const { type } = filter;
        return await this.find({ where: { categoryType: type } });
    }

    async createCategory(data: CreateCategory) {
        const { categoryName, categoryType } = data;

        const category = this.create({ categoryName, categoryType });

        try {
            return await this.save(category);
        } catch (error) {
            if (error.code === '23505') {
                throw new ConflictException('Category already exists');
            } else {
                throw new InternalServerErrorException();
            }
        }
    }

    async updateCategory(id: string, data: UpdateCategory) {
        const { categoryName, categoryType } = data;

        const category = await this.update(id, { categoryName, categoryType });
        if (category.affected === 0) {
            throw new NotFoundException(`Category with ID "${id}" not found`);
        }
        return await this.getCategoryById(id);
    }
}
