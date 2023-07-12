import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { TaskRepository } from '@domain/task/task.repository';

export class DeleteTaskCommand {
  constructor(public readonly taskId: string) {}
}

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
