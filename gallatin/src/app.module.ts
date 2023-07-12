import { Module } from '@nestjs/common';
import { DomainModule } from '@domain/domain.module';
import { Config } from '@common/config';
import { ConfigModule } from '@nestjs/config';
import { HealthModule } from '@health/health.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ScheduleModule } from '@nestjs/schedule';
import { DatabaseModule } from '@database/database.module';

@Module({
  imports: [
    ConfigModule.forRoot(Config.configModule.options),
    EventEmitterModule.forRoot(Config.eventEmitterModule.options),
    ScheduleModule.forRoot(),
    DomainModule,
    HealthModule,
    DatabaseModule,
  ],
})
export class AppModule {}
