import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({ origin: 'http://localhost:3000', credentials: true })
  app.useGlobalPipes(new ValidationPipe({ disableErrorMessages: true, whitelist: true }))

  await app.listen(8080, () => console.log('Listening on http://localhost:8080'));
}
bootstrap();
