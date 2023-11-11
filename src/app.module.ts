import { Module } from '@nestjs/common';
import { AppConfigModule } from './app/config/config.module';
import { AppDatabaseModule } from './app/database/database.module';
import { AppLifecycleModule } from './app/lifecycle/lifecycle.module';
import { TransactionModule } from './app/transaction/transaction.module';
import { CategoryModule } from './app/category/category.module';

@Module({
    imports: [AppConfigModule, AppDatabaseModule, AppLifecycleModule, TransactionModule, CategoryModule],
})
export class AppModule {}
