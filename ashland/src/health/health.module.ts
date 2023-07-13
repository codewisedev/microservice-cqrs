import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { HttpModule } from '@nestjs/axios';
import { HealthController } from '@health/health.controller';
import { TerminusLogger } from '@health/terminus-logger.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Config } from '@app/common/config';

@Module({
  imports: [
    TerminusModule.forRoot({
      logger: TerminusLogger,
      errorLogStyle: 'pretty',
    }),
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: Config.mysql.host,
      port: Config.mysql.port,
      username: Config.mysql.username,
      password: Config.mysql.password,
      database: Config.mysql.database,
      autoLoadModels: true,
      synchronize: true,
    }),
    HttpModule,
  ],
  controllers: [HealthController],
})
export class HealthModule {}
