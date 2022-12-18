import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser())
  app.enableCors({ origin: 'http://localhost:3000', credentials: true })
  app.useGlobalPipes(new ValidationPipe({ disableErrorMessages: true, whitelist: true }))

  await app.listen(8080, () => console.log('Listening on http://localhost:8080'));
}
bootstrap();
