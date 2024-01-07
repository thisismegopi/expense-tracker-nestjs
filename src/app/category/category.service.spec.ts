import { Test, TestingModule } from '@nestjs/testing';
import { CategoryService } from './category.service';
import { CategoryRepository } from './category.repository';
import { TransactionType } from '../transaction/enum';
import { Category } from './category.entity';

describe('CategoryService', () => {
    let categoryService: CategoryService;
    let categoryRepository: CategoryRepository;

    const mockCategory: Category[] = [
        {
            categoryId: 'category-1',
            categoryName: 'Mock category',
            categoryType: TransactionType.EXPENSE,
            createdAt: new Date(),
            updatedAt: new Date(),
            transactions: [],
        },
    ];

    const categoryRepo = {
        getAllCategories: jest.fn(),
        createCategory: jest.fn(),
        updateCategory: jest.fn(),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CategoryService,
                {
                    provide: CategoryRepository,
                    useValue: categoryRepo,
                },
            ],
        }).compile();

        categoryService = module.get<CategoryService>(CategoryService);
        categoryRepository = module.get<CategoryRepository>(CategoryRepository);
    });

    describe('getCategory', () => {
        it('should return an array of category', async () => {
            jest.spyOn(categoryRepository, 'getAllCategories').mockResolvedValue(mockCategory);

            const result = await categoryService.getCategory({ type: TransactionType.EXPENSE });

            expect(categoryRepository.getAllCategories).toHaveBeenCalledWith({ type: TransactionType.EXPENSE });

            expect(result).toEqual(mockCategory);
        });
    });

    describe('createCategory', () => {
        it('should return a category', async () => {
            jest.spyOn(categoryRepository, 'createCategory').mockResolvedValue(mockCategory[0]);

            const result = await categoryService.createCategory({ categoryName: 'Mock category', categoryType: TransactionType.EXPENSE });

            expect(categoryRepository.createCategory).toHaveBeenCalledWith({ categoryName: 'Mock category', categoryType: TransactionType.EXPENSE });

            expect(result).toEqual(mockCategory[0]);
        });
    });

    describe('updateCategory', () => {
        it('should return a updated category', async () => {
            jest.spyOn(categoryRepository, 'updateCategory').mockResolvedValue({ ...mockCategory[0], categoryName: 'New mock category', categoryType: TransactionType.INCOME });

            const result = await categoryService.updateCategory('category-1', { categoryName: 'New mock category', categoryType: TransactionType.INCOME });

            expect(categoryRepository.updateCategory).toHaveBeenCalledWith('category-1', { categoryName: 'New mock category', categoryType: TransactionType.INCOME });

            expect(result).toEqual({ ...mockCategory[0], categoryName: 'New mock category', categoryType: TransactionType.INCOME });
        });
    });
});
