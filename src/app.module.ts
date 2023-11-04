import { Module } from '@nestjs/common';
import { AppConfigModule } from './app/config/config.module';
import { AppDatabaseModule } from './app/database/database.module';
import { AppLifecycleModule } from './app/lifecycle/lifecycle.module';

@Module({
    imports: [AppConfigModule, AppDatabaseModule, AppLifecycleModule],
})
export class AppModule {}
