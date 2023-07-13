import { Module } from '@nestjs/common';
import { LogService } from '@domain/log/log.service';
import { LogRepository } from '@domain/log/log.repository';
import { SequelizeModule } from '@nestjs/sequelize';
import { Log } from '@domain/log/models';
import { LogController } from '@domain/log/log.controller';

@Module({
  imports: [SequelizeModule.forFeature([Log])],
  controllers: [LogController],
  providers: [LogService, LogRepository],
  exports: [LogService],
})
export class LogModule {}
