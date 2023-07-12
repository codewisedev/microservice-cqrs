import { RedisModule as Redis } from '@liaoliaots/nestjs-redis';
import { Module } from '@nestjs/common';
import { RedisService } from '@database/redis/redis.service';
import { Config } from '@app/common/config';

@Module({
  imports: [
    Redis.forRoot({
      config: {
        host: Config.redis.host,
        port: +Config.redis.port,
      },
    }),
  ],
  exports: [RedisService],
  providers: [RedisService],
})
export class RedisModule {}
