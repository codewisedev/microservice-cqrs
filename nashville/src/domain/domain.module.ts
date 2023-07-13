import { Module } from '@nestjs/common';
import { TaskModule } from '@domain/task/task.module';
import { GeneralModule } from '@domain/general/general.module';

@Module({
  imports: [GeneralModule, TaskModule],
})
export class DomainModule {}
