import { Module } from '@nestjs/common';
import { AppLifeCycleService } from './lifecycle.service';

@Module({
    providers: [AppLifeCycleService],
})
export class AppLifecycleModule {}
