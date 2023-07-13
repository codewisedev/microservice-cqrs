import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { TaskRepository } from '@domain/task/task.repository';
import { DeleteTaskCommand } from '@domain/task/commands/impl';

@CommandHandler(DeleteTaskCommand)
export class DeleteTaskCommandHandler
  implements ICommandHandler<DeleteTaskCommand>
{
  constructor(private repository: TaskRepository) {}

  async execute(command: DeleteTaskCommand) {
    const { taskId } = command;
    // const task = this.repository.delete(command);
    // Delete task from redis
  }
}
