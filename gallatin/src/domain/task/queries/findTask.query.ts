import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { RedisService } from '@app/database/redis/redis.service';

export class FindTasksQuery {
  constructor(public readonly limit: number, public readonly page: number) {}
}

@QueryHandler(FindTasksQuery)
export class CreateTaskQueryHandler implements IQueryHandler<FindTasksQuery> {
  constructor(private repository: RedisService) {}

  async execute(query: FindTasksQuery) {
    const { limit, page } = query;
    // Get tasks from redis
  }
}
