import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { RedisService } from '@app/database/redis/redis.service';
import { FindTasksQuery } from '@domain/task/queries/impl';

@QueryHandler(FindTasksQuery)
export class CreateTaskQueryHandler implements IQueryHandler<FindTasksQuery> {
  constructor() {}
  // private repository: RedisService
  async execute(query: FindTasksQuery) {
    console.log('testsssssssssssssssssssssssss');

    const { limit, page } = query;
    // Get tasks from redis
  }
}
