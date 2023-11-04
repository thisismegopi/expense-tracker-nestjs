import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { validate } from './env.validation';
import appConfig from './app.config';
import databaseConfig from './database.config';

@Module({
    imports: [
        ConfigModule.forRoot({
            validate,
            isGlobal: true,
            load: [appConfig, databaseConfig],
        }),
    ],
})
export class AppConfigModule {}
