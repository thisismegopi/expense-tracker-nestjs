import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
    const app = await NestFactory.create(AppModule, { bufferLogs: true });
    const configService = app.get(ConfigService);
    const port = configService.get<number>('PORT');
    app.useGlobalPipes(new ValidationPipe());
    app.enableShutdownHooks();

    // Swagger
    const config = new DocumentBuilder().setTitle('Expense Manager').setDescription("Expense Manager API's").setVersion('1.0').build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);

    await app.listen(port, () => process.stdout.write(`Application is running on port ${port}`));
}
bootstrap();
