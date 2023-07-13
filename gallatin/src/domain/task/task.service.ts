import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import {
  CreateTaskInterface,
  DeleteTaskInterface,
  FindTaskInterface,
  UpdateTaskInterface,
} from '@domain/task/interfaces';
import { FindTasksQuery } from '@domain/task/queries/impl';
import {
  CreateTaskCommand,
  DeleteTaskCommand,
  UpdateTaskCommand,
} from '@domain/task/commands/impl';

@Injectable()
export class TaskService {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  /**
   * The `find` function executes a query to find tasks based on the provided limit and page
   * parameters.
   * @param {FindTaskInterface} request - The `request` parameter is an object that contains the
   * parameters for the find request. It has two properties:
   * @returns The result of executing the FindTasksQuery with the specified limit and page parameters.
   */
  async find(request: FindTaskInterface) {
    const { limit, page } = request;
    return await this.queryBus.execute(new FindTasksQuery(limit, page));
  }

  /**
   * The `create` function takes in a request object containing task details and uses a command bus to
   * execute a command for creating a new task.
   * @param {CreateTaskInterface} request - The `request` parameter is an object that contains the
   * information needed to create a task. It has the following properties:
   * @returns The result of executing the `CreateTaskCommand` command.
   */
  create(request: CreateTaskInterface) {
    const { title, description, parentId } = request;
    return this.commandBus.execute(
      new CreateTaskCommand(title, description, parentId),
    );
  }

  /**
   * The `update` function updates a task by executing a command to update its title and description.
   * @param {UpdateTaskInterface} request - An object that contains the information needed to update a
   * task. It has the following properties:
   * @returns The result of executing the `UpdateTaskCommand` command.
   */
  update(request: UpdateTaskInterface) {
    const { taskId, title, description } = request;
    return this.commandBus.execute(
      new UpdateTaskCommand(taskId, title, description),
    );
  }

  /**
   * The delete function takes a taskId and executes a DeleteTaskCommand using the commandBus.
   * @param {DeleteTaskInterface} request - The `request` parameter is an object that implements the
   * `DeleteTaskInterface`. It contains the necessary information to delete a task, such as the
   * `taskId`.
   * @returns The code is returning the result of executing a command to delete a task.
   */
  delete(request: DeleteTaskInterface) {
    const { taskId } = request;
    return this.commandBus.execute(new DeleteTaskCommand(taskId));
  }
}
