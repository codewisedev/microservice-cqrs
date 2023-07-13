import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { RedisService } from '@app/database/redis/redis.service';
import { FindTasksQuery } from '@domain/task/queries/impl';
import { TaskList } from '@app/common/constant';

@QueryHandler(FindTasksQuery)
export class CreateTaskQueryHandler implements IQueryHandler<FindTasksQuery> {
  constructor(private repository: RedisService) {}
  /**
   * The function executes a query to find tasks, retrieves the data from a repository, parses it, and
   * then paginates the tasks based on the specified limit and page.
   * @param {FindTasksQuery} query - The `query` parameter is an object that contains the following
   * properties:
   * @returns the paginated list of tasks.
   */
  async execute(query: FindTasksQuery) {
    const { limit, page } = query;
    const tasks = [];
    const data = Object.values(await this.repository.hgetall(TaskList));
    for (const item of data) tasks.push(JSON.parse(item));

    return {
      items: this.paginate(tasks, limit, page),
      total: tasks.length,
    };
  }

  /**
   * The `paginate` function takes an array, a limit, and a page number as input, and returns a new array
   * containing a subset of the original array based on the given limit and page number.
   * @param array - The array parameter is the array of elements that you want to paginate. It can be any
   * type of array, such as an array of numbers, strings, objects, etc.
   * @param limit - The limit parameter determines the number of elements to be displayed on each page.
   * It specifies the maximum number of elements that should be included in the returned array.
   * @param page - The page parameter represents the current page number that you want to retrieve from
   * the array.
   * @returns a portion of the input array based on the given limit and page number.
   */
  paginate(array, limit, page) {
    return array.slice((page - 1) * limit, page * limit);
  }
}
