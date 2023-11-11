import { TransactionType } from '../transaction/enum';
import { Transaction } from '../transaction/transaction.entity';
import { Column, CreateDateColumn, Entity, Index, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('category')
export class Category {
    @PrimaryGeneratedColumn('uuid', { name: 'category_id' })
    categoryId: string;

    @Column({ name: 'category_name', nullable: false })
    categoryName: string;

    @Index()
    @Column({ name: 'category_type', nullable: false })
    categoryType: TransactionType;

    @CreateDateColumn({ name: 'created_at', type: 'timestamp without time zone' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamp without time zone' })
    updatedAt: Date;

    @OneToMany(() => Transaction, transaction => transaction.category)
    transactions: Transaction[];
}
