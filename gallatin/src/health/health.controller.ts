import { Controller, Get } from '@nestjs/common';
import {
  HealthCheckService,
  HttpHealthIndicator,
  HealthCheck,
  DiskHealthIndicator,
  MemoryHealthIndicator,
  HealthCheckResult,
  SequelizeHealthIndicator,
} from '@nestjs/terminus';
import { RedisHealthIndicator } from '@liaoliaots/nestjs-redis-health';
import Redis from 'ioredis';
import { Config } from '@app/common/config';
import { GrpcMethod } from '@nestjs/microservices';

enum ServingStatus {
  UNKNOWN = 0,
  SERVING = 1,
  NOT_SERVING = 2,
}

interface HealthCheckRequest {
  service: string;
}

interface HealthCheckResponse {
  status: ServingStatus;
}

@Controller(HealthController.path)
export class HealthController {
  static path = 'health';
  private readonly redis: Redis;

  constructor(
    private health: HealthCheckService,
    private http: HttpHealthIndicator,
    private readonly disk: DiskHealthIndicator,
    private memory: MemoryHealthIndicator,
    private mysqlDb: SequelizeHealthIndicator,
    private readonly redisIndicator: RedisHealthIndicator,
  ) {
    this.redis = new Redis({
      host: Config.redis.host,
      port: Config.redis.port,
    });
  }

  /* The `@GrpcMethod('Health', 'Check')` decorator is used to define a gRPC method called "Check" in
  the "Health" service. This method takes two parameters: `data` of type `HealthCheckRequest` and
  `metadata` of type `any`. */
  @GrpcMethod('Health', 'Check')
  check(data: HealthCheckRequest, metadata: any): HealthCheckResponse {
    console.log(data);
    return { status: ServingStatus.SERVING };
  }

  /* This is a method in a NestJS controller that is used to perform a health check on an HTTP
  endpoint. It uses the `@Get` decorator to specify the HTTP method and route path for the endpoint.
  The `@HealthCheck()` decorator is used to indicate that this endpoint is a health check endpoint.
  The `checkHTTP()` method then uses the `HealthCheckService` to perform a health check on the
  specified HTTP endpoint (`https://www.google.com`) using the `HttpHealthIndicator` and returns the
  result of the health check. */
  @Get('http')
  @HealthCheck()
  checkHTTP() {
    return this.health.check([
      () => this.http.pingCheck('Google', 'https://www.google.com'),
    ]);
  }

  /* This is a method in a NestJS controller that is used to perform a health check on a database
  connection using the Sequelize ORM. */
  @Get('mysql')
  @HealthCheck()
  checkDB() {
    return this.health.check([async () => this.mysqlDb.pingCheck('sequelize')]);
  }

  /* This is a method in a NestJS controller that is used to perform a health check on a Redis database
  connection. It uses the `@Get` decorator to specify the HTTP method and route path for the
  endpoint. The `@HealthCheck()` decorator is used to indicate that this endpoint is a health check
  endpoint. The `checkRedis()` method then uses the `HealthCheckService` to perform a health check
  on the Redis database connection using the `RedisHealthIndicator` and returns the result of the
  health check. The `checkHealth()` method of the `RedisHealthIndicator` is used to check the health
  of the Redis database connection and sets a timeout of 500ms. */
  @Get('redis')
  @HealthCheck()
  async checkRedis(): Promise<HealthCheckResult> {
    return await this.health.check([
      () =>
        this.redisIndicator.checkHealth('redis', {
          type: 'redis',
          client: this.redis,
          timeout: 500,
        }),
    ]);
  }

  /* This is a method in a NestJS controller that is used to perform a health check on the storage
  space of the server. It uses the `@Get` decorator to specify the HTTP method and route path for
  the endpoint. The `@HealthCheck()` decorator is used to indicate that this endpoint is a health
  check endpoint. The `checkStorage()` method then uses the `HealthCheckService` to perform a health
  check on the storage space of the server using the `DiskHealthIndicator` and returns the result of
  the health check. The `checkStorage()` method checks the storage space of the root directory (`/`)
  and sets a threshold of 250 GB using the `checkStorage()` method of the `DiskHealthIndicator`. */
  @Get('storage')
  @HealthCheck()
  checkStorage() {
    return this.health.check([
      () =>
        this.disk.checkStorage('storage', {
          path: '/',
          threshold: 250 * 1024 * 1024 * 1024,
        }),
    ]);
  }

  /* This is a method in a NestJS controller that is used to perform a health check on the heap memory
  usage of the server. It uses the `@Get` decorator to specify the HTTP method and route path for
  the endpoint. The `@HealthCheck()` decorator is used to indicate that this endpoint is a health
  check endpoint. The `checkMemoryHeap()` method then uses the `HealthCheckService` to perform a
  health check on the heap memory usage of the server using the `MemoryHealthIndicator` and returns
  the result of the health check. The `checkHeap()` method of the `MemoryHealthIndicator` is used to
  check the heap memory usage and sets a threshold of 150 MB. */
  @Get('memory_heap')
  @HealthCheck()
  checkMemoryHeap() {
    return this.health.check([
      () => this.memory.checkHeap('memory_heap', 150 * 1024 * 1024),
    ]);
  }

  /* This is a method in a NestJS controller that is used to perform a health check on the resident set
  size (RSS) memory usage of the server. It uses the `@Get` decorator to specify the HTTP method and
  route path for the endpoint. The `@HealthCheck()` decorator is used to indicate that this endpoint
  is a health check endpoint. The `checkMemoryRSS()` method then uses the `HealthCheckService` to
  perform a health check on the RSS memory usage of the server using the `MemoryHealthIndicator` and
  returns the result of the health check. The `checkRSS()` method of the `MemoryHealthIndicator` is
  used to check the RSS memory usage and sets a threshold of 150 MB. */
  @Get('memory_rss')
  @HealthCheck()
  checkMemoryRSS() {
    return this.health.check([
      () => this.memory.checkRSS('memory_rss', 150 * 1024 * 1024),
    ]);
  }
}
