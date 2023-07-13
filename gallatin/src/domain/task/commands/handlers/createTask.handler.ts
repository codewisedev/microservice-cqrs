import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { TaskRepository } from '@domain/task/task.repository';
import { CreateTaskCommand } from '@domain/task/commands/impl';
import { RedisService } from '@app/database/redis/redis.service';
import { TaskList } from '@app/common/constant';
import { LoggerService } from '@app/domain/logger/logger.service';

@CommandHandler(CreateTaskCommand)
export class CreateTaskCommandHandler
  implements ICommandHandler<CreateTaskCommand>
{
  constructor(
    private repository: TaskRepository,
    private redisService: RedisService,
    private logService: LoggerService,
  ) {}

  async execute(command: CreateTaskCommand) {
    const { description, title, parentId } = command;
    const { dataValues } = await this.repository.create({
      title,
      description,
      parentId,
    });

    /* The code `if (dataValues) { this.redisService.hset(TaskList, dataValues.id, dataValues); }` is
    checking if the `dataValues` object is truthy (i.e., not null or undefined). If it is truthy, it
    means that the task was successfully created and the `dataValues` object contains the created
    task's data. */
    if (dataValues) {
      if (!parentId) {
        this.redisService.hset(
          TaskList,
          dataValues.id,
          JSON.stringify(dataValues),
        );
      } else {
        const parent = JSON.parse(
          await this.redisService.hget(TaskList, parentId),
        );

        if (parent.subTasks) parent.subTasks.push(dataValues);
        else parent.subTasks = [dataValues];

        this.redisService.hset(TaskList, parentId, JSON.stringify(parent));
      }
    }

    this.logService.sendLogs(dataValues.id, 'Task created!!');

    return dataValues;
  }
}
