import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { TaskRepository } from '@domain/task/task.repository';
import { CreateTaskCommand } from '@domain/task/commands/impl';

@CommandHandler(CreateTaskCommand)
export class CreateTaskCommandHandler
  implements ICommandHandler<CreateTaskCommand>
{
  constructor(private repository: TaskRepository) {}

  async execute(command: CreateTaskCommand) {
    const { description, title, parentId } = command;
    // if(parentId) exist!!
    // const task = this.repository.createTask(command);
    // Add task in redis
  }
}
