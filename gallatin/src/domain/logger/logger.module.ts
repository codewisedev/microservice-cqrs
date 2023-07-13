import { Config } from '@app/common/config';
import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { LoggerService } from '@domain/logger/logger.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'LOGGER_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [
            `amqp://${Config.rabbitMq.username}:${Config.rabbitMq.password}@${Config.rabbitMq.host}:${Config.rabbitMq.port}`,
          ],
          queue: 'logs_queue',
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),
  ],
  providers: [LoggerService],
  exports: [LoggerService],
})
export class LoggerModule {}
