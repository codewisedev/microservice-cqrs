import { Module } from '@nestjs/common';
import { EventModule } from '@domain/general/event/event.module';

@Module({
  imports: [EventModule],
})
export class GeneralModule {}
