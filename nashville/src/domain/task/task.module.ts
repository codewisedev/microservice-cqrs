import { Module } from '@nestjs/common';
import { TaskController } from '@domain/task/task.controller';
import { TaskService } from '@domain/task/task.service';

@Module({
  imports: [],
  controllers: [TaskController],
  providers: [TaskService],
  exports: [TaskService],
})
export class TaskModule {}
