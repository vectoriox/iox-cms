import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LoggerService } from './core';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: false,
  });

  const logger = await app.resolve(LoggerService);
  logger.setContext('Main');

  app.useLogger(logger);
  await app.listen(3000);
}
bootstrap();
