import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { HttpModule } from '@nestjs/axios';
import { HealthController } from '@health/health.controller';
import { TerminusLogger } from '@health/terminus-logger.service';

@Module({
  imports: [
    TerminusModule.forRoot({
      logger: TerminusLogger,
      errorLogStyle: 'pretty',
    }),
    HttpModule,
  ],
  controllers: [HealthController],
})
export class HealthModule {}
