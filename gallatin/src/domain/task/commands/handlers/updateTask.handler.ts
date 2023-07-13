import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { TaskRepository } from '@domain/task/task.repository';
import { UpdateTaskCommand } from '@domain/task/commands/impl';
import { RedisService } from '@app/database/redis/redis.service';
import { TaskList } from '@app/common/constant';
import { LoggerService } from '@app/domain/logger/logger.service';

@CommandHandler(UpdateTaskCommand)
export class UpdateTaskCommandHandler
  implements ICommandHandler<UpdateTaskCommand>
{
  constructor(
    private repository: TaskRepository,
    private redisService: RedisService,
    private logService: LoggerService,
  ) {}

  /**
   * The function updates a task's title and description in a repository and updates the task in a Redis
   * cache if it has a parent task.
   * @param {UpdateTaskCommand} command - The `command` parameter is an object that contains the
   * following properties:
   * @returns the `dataValues` object.
   */
  async execute(command: UpdateTaskCommand) {
    const { taskId, description, title } = command;
    const [result] = await this.repository.update({
      taskId,
      title,
      description,
    });

    const { dataValues } = await this.repository.findOneById(taskId);

    if (result === 1) {
      if (dataValues.parentId === null) {
        this.redisService.hset(TaskList, taskId, dataValues);
      } else {
        const parent = JSON.parse(
          await this.redisService.hget(TaskList, taskId),
        );

        parent.subTasks.map((item) => {
          if (item.id === taskId) item = dataValues;
        });

        this.redisService.hset(TaskList, parent.id, JSON.stringify(parent));
      }
    }

    this.logService.sendLogs(taskId, 'Task updated!!');

    return dataValues;
  }
}
