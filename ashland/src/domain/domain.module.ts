import { Module } from '@nestjs/common';
import { LogModule } from '@domain/log/log.module';

@Module({
  imports: [LogModule],
})
export class DomainModule {}
