import { Module } from '@nestjs/common';
import { TaskModule } from '@domain/task/task.module';

@Module({
  imports: [TaskModule],
})
export class DomainModule {}
