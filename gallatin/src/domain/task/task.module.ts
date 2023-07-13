import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { SequelizeModule } from '@nestjs/sequelize';
import { Task } from '@domain/task/models';
import { TaskService } from '@domain/task/task.service';
import { TaskRepository } from '@domain/task/task.repository';
import { TaskController } from '@domain/task/task.controller';
import {
  CreateTaskCommandHandler,
  UpdateTaskCommandHandler,
  DeleteTaskCommandHandler,
} from '@domain/task/commands/handlers';
import { CreateTaskQueryHandler } from '@domain/task/queries/handlers';

export const CommandHandlers = [
  CreateTaskCommandHandler,
  UpdateTaskCommandHandler,
  DeleteTaskCommandHandler,
];
export const QueryHandlers = [CreateTaskQueryHandler];

@Module({
  imports: [CqrsModule, SequelizeModule.forFeature([Task])],
  controllers: [TaskController],
  providers: [
    TaskService,
    TaskRepository,
    ...CommandHandlers,
    ...QueryHandlers,
  ],
  exports: [TaskService],
})
export class TaskModule {}
