import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Config } from '@common/config';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  /* The code is creating a microservice using NestFactory's `createMicroservice` method. */
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.GRPC,
      options: {
        url: `0.0.0.0:${Config.app.port}`,
        package: 'task',
        protoPath: `${Config.app.PWD}/src/domain/task/proto/task.proto`,
      },
    },
  );

  await app.listen();
}
bootstrap();
