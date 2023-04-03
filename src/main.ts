import { ValidationPipe } from '@nestjs/common';
import { MicroserviceOptions } from '@nestjs/microservices';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { TransformInterceptor } from './transform.interceptor';
import { Logger } from '@nestjs/common';
import { authGrpcClientOptions } from './auth/grpc-auth-client.options';

async function bootstrap() {
  const logger = new Logger();
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new TransformInterceptor());
  app.enableCors();

  app.connectMicroservice<MicroserviceOptions>(authGrpcClientOptions);
  await app.startAllMicroservices();

  await app.listen(3000);
  logger.log(`Application listening on port ${3000}`);
}
bootstrap();
