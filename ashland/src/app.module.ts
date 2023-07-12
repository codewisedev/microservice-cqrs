import { Module } from '@nestjs/common';
import { DomainModule } from '@domain/domain.module';
import { Config } from '@common/config';
import { ConfigModule } from '@nestjs/config';
import { HealthModule } from '@health/health.module';
import { DatabaseModule } from '@database/database.module';

@Module({
  imports: [
    ConfigModule.forRoot(Config.configModule.options),
    DomainModule,
    HealthModule,
    DatabaseModule,
  ],
})
export class AppModule {}
