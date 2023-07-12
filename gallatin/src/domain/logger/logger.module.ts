import { Config } from '@app/common/config';
import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';

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
          noAck: false,
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),
  ],
})
export class LoggerModule {}
