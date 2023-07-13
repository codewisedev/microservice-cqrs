import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { LogService } from './log.service';

@Controller()
export class LogController {
  constructor(private readonly logService: LogService) {}

  @EventPattern('log_task')
  async logTask(data: Record<string, unknown>) {
    console.log(data);
  }
}
