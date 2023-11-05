import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { TransactionType } from './enum';
import { Category } from '../category/category.entity';

@Entity('transaction')
export class Transaction {
    @PrimaryGeneratedColumn('uuid', { name: 'transaction_id' })
    transactionId: string;

    @Column({ name: 'transaction_type' })
    transactionType: TransactionType;

    @Column({ type: 'decimal' })
    amount: number;

    @Column({ nullable: true })
    note: string;

    @Column({ name: 'date_time', type: 'timestamp without time zone' })
    dateTime: Date;

    @CreateDateColumn({ name: 'created_at', type: 'timestamp without time zone' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamp without time zone' })
    updatedAt: Date;

    @ManyToOne(() => Category, category => category.transactions, { eager: false })
    category: Category;
}
