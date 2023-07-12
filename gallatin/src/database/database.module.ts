import { Module } from '@nestjs/common';
import { RedisModule } from '@database/redis/redis.module';
import { MysqlModule } from '@database/mysql/mysql.module';

@Module({
  imports: [RedisModule, MysqlModule],
})
export class DatabaseModule {}
