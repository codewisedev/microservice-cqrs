import { Module } from '@nestjs/common';
import { TaskController } from '@domain/task/task.controller';
import { TaskService } from '@domain/task/task.service';
import { EventModule } from '@domain/general/event/event.module';

@Module({
  imports: [EventModule],
  controllers: [TaskController],
  providers: [TaskService],
  exports: [TaskService],
})
export class TaskModule {}
