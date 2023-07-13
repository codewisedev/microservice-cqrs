import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Log } from '@domain/logger/entity';

@Injectable()
export class LoggerService {
  constructor(@Inject('LOGGER_SERVICE') private readonly client: ClientProxy) {}

  /**
   * The function `sendLogs` sends a log message with a task ID and status to a client.
   * @param {string} taskId - The taskId parameter is a string that represents the unique identifier of
   * a task. It is used to identify and track the progress or status of a specific task.
   * @param {string} status - The status parameter is a string that represents the current status of a
   * task.
   */
  sendLogs(taskId: string, status: string) {
    this.client.emit<any>('log_task', new Log({ taskId, status }));
  }
}
