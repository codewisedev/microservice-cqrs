import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Log } from '@domain/logger/entity';

@Injectable()
export class TaskService {
  constructor(@Inject('LOGGER_SERVICE') private readonly client: ClientProxy) {}

  sendLogs() {
    this.client.emit<any>('log_task', new Log('Hello World'));
  }
}
