import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import {
  CreateTaskInterface,
  DeleteTaskInterface,
  FindTaskInterface,
  UpdateTaskInterface,
} from '@domain/task/interfaces';
import { FindTasksQuery } from '@domain/task/queries';
import {
  CreateTaskCommand,
  DeleteTaskCommand,
  UpdateTaskCommand,
} from '@domain/task/commands';

@Injectable()
export class TaskService {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  find(request: FindTaskInterface) {
    const { limit, page } = request;
    return this.queryBus.execute(new FindTasksQuery(limit, page));
  }

  create(request: CreateTaskInterface) {
    const { title, description, parentId } = request;
    return this.commandBus.execute(
      new CreateTaskCommand(title, description, parentId),
    );
  }

  update(request: UpdateTaskInterface) {
    const { taskId, title, description } = request;
    return this.commandBus.execute(
      new UpdateTaskCommand(taskId, title, description),
    );
  }

  delete(request: DeleteTaskInterface) {
    const { taskId } = request;
    return this.commandBus.execute(new DeleteTaskCommand(taskId));
  }
}
