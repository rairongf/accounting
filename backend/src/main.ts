import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  LoggingInterceptor,
  TransformResponseInterceptor,
} from './modules/common';
import { getConfiguration } from './modules/config/configuration';

async function bootstrap() {
  const { app: appConfigs } = getConfiguration();

  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: '*',
    },
  });
  app.useGlobalPipes(new ValidationPipe({
    transform: true,
  }));
  app.useGlobalInterceptors(
    new TransformResponseInterceptor(),
    new LoggingInterceptor(),
  );
  await app.listen(appConfigs.port);
}
bootstrap();
