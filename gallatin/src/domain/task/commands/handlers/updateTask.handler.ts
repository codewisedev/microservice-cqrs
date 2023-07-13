import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { TaskRepository } from '@domain/task/task.repository';
import { UpdateTaskCommand } from '@domain/task/commands/impl';

@CommandHandler(UpdateTaskCommand)
export class UpdateTaskCommandHandler
  implements ICommandHandler<UpdateTaskCommand>
{
  constructor(private repository: TaskRepository) {}

  async execute(command: UpdateTaskCommand) {
    const { taskId, description, title } = command;
    // const task = this.repository.update(command);
    // Update task in redis
  }
}
