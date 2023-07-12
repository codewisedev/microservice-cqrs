import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';

@Controller()
export class LogController {
  constructor() {}

  @EventPattern('log_task')
  async logTask(data: Record<string, unknown>) {
    console.log(data);
  }
}
