import { Category } from 'src/category/category.entity';
import { TransactionType } from 'src/transaction/enum';
import { MigrationInterface, QueryRunner } from 'typeorm';

const ICOME_DATA = [
    'Employment Income',
    'Self-Employment Income',
    'Investment Income',
    'Rental Income',
    'Retirement Income',
    'Business Income',
    'Passive Income',
    'Government Assistance',
    'Alimony and Child Support',
    'Annuities and Trust Income',
    'Scholarships and Grants',
    'Gifts and Inheritance',
    'Royalties',
    'Farm Income',
    'Side Gig Income',
    'Online Income',
    'Educational Stipends',
    'Other Sources of Income',
];

const EXPENSE_DATA = [
    'Housing Expenses',
    'Transportation Expenses',
    'Food and Groceries',
    'Healthcare Expenses',
    'Insurance Premiums',
    'Debt Payments',
    'Entertainment and Recreation',
    'Education Expenses',
    'Childcare and Education',
    'Savings and Investments',
    'Taxes',
    'Personal Care and Hygiene',
    'Clothing and Apparel',
    'Utilities',
    'Charitable Donations',
    'Travel Expenses',
    'Pet Expenses',
    'Home and Garden',
    'Professional Services',
    'Miscellaneous Expenses',
];

export class CategorySeed1699151612849 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        for (const data of ICOME_DATA) {
            queryRunner.manager.insert(Category, { categoryName: data, categoryType: TransactionType.INCOME });
        }
        for (const data of EXPENSE_DATA) {
            queryRunner.manager.insert(Category, { categoryName: data, categoryType: TransactionType.EXPENSE });
        }
    }

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    public async down(queryRunner: QueryRunner): Promise<void> {}
}
