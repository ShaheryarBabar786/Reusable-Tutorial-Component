import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Enable CORS
  app.enableCors({
    origin: '*', // Allow all origins (change this in production)
    methods: 'GET,POST',
    allowedHeaders: 'Content-Type',
  });

  app.useStaticAssets(join(__dirname, '..', 'assets'));
  await app.listen(3000);
}
bootstrap();
