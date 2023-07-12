import { Module } from '@nestjs/common';
import { EventGateway } from '@domain/general/event/event.gateway';
import { EventService } from '@domain/general/event/event.service';

@Module({
  imports: [],
  providers: [EventGateway, EventService],
  exports: [EventGateway, EventService],
})
export class EventModule {}
