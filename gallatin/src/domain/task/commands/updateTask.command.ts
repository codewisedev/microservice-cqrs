import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { TaskRepository } from '@domain/task/task.repository';

export class UpdateTaskCommand {
  constructor(
    public readonly taskId: string,
    public readonly title: string,
    public readonly description: string,
  ) {}
}

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
