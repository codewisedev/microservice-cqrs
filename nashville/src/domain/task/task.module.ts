import { Module } from '@nestjs/common';
import { TaskController } from '@domain/task/task.controller';
import { TaskService } from '@domain/task/task.service';
import { EventModule } from '@domain/general/event/event.module';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { Config } from '@app/common/config';

@Module({
  imports: [
    EventModule,
    ClientsModule.register([
      {
        name: 'TASK_PACKAGE',
        transport: Transport.GRPC,
        options: {
          url: `${Config.app.microserviceGrpcHost}:${Config.app.microserviceGrpcPort}`,
          package: 'task',
          protoPath: `${Config.app.PWD}/src/domain/task/proto/task.proto`,
        },
      },
    ]),
  ],
  controllers: [TaskController],
  providers: [TaskService],
  exports: [TaskService],
})
export class TaskModule {}
