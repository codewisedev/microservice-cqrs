import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { TaskRepository } from '@domain/task/task.repository';
import { DeleteTaskCommand } from '@domain/task/commands/impl';
import { RedisService } from '@app/database/redis/redis.service';
import { TaskList } from '@app/common/constant';
import { LoggerService } from '@app/domain/logger/logger.service';

@CommandHandler(DeleteTaskCommand)
export class DeleteTaskCommandHandler
  implements ICommandHandler<DeleteTaskCommand>
{
  constructor(
    private repository: TaskRepository,
    private redisService: RedisService,
    private logService: LoggerService,
  ) {}

  /**
   * The function deletes a task from a repository and updates the Redis cache if necessary.
   * @param {DeleteTaskCommand} command - The `command` parameter is an object that contains the
   * `taskId` property.
   * @returns The `task` object is being returned.
   */
  async execute(command: DeleteTaskCommand) {
    const { taskId } = command;
    const task = await this.repository.findOneById(taskId);
    if (task) {
      const result = await this.repository.delete({ taskId });

      if (result === 1) {
        if (task.parentId === null) {
          this.redisService.hdel(TaskList, taskId);
        } else {
          const parent = JSON.parse(
            await this.redisService.hget(TaskList, task.parentId),
          );

          parent.subTasks = parent.subTasks.filter(
            (item) => item.id !== taskId,
          );

          this.redisService.hset(
            TaskList,
            task.parentId,
            JSON.stringify(parent),
          );
        }
      }
    }

    this.logService.sendLogs(taskId, 'Task deleted!!');

    return task;
  }
}
