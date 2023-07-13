import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { LogService } from './log.service';

@Controller()
export class LogController {
  constructor(private readonly logService: LogService) {}

  /**
   * The function "logTask" asynchronously logs data by calling the "createLog" method of the
   * "logService" object.
   * @param data - The `data` parameter is of type `Record<string, unknown>`, which means it is an
   * object with string keys and values of unknown type.
   */
  @EventPattern('log_task')
  async logTask(data: Record<string, unknown>) {
    this.logService.createLog(data);
  }
}
