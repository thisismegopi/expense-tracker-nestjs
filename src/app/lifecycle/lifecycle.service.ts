import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DataSource } from 'typeorm';

@Injectable()
export class AppLifeCycleService implements OnApplicationBootstrap {
    constructor(private readonly datasource: DataSource, private readonly config: ConfigService) {}

    async onApplicationBootstrap() {
        await this.datasource.query(`CREATE SCHEMA IF NOT EXISTS ${this.config.get<string>('database.schema')}`);
        await this.datasource.runMigrations({ transaction: 'each' });
        console.log('Migration completed!');
    }
}
