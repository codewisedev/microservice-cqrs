import {
  Controller,
  HttpCode,
  HttpStatus,
  UseInterceptors,
  Version,
  Get,
  Body,
  Post,
  Param,
  Put,
  Delete,
  ParseUUIDPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { DocumentGenerator } from '@common/decorator';
import { FormatResponseInterceptor } from '@common/interceptor';
import { TaskService } from '@domain/task/task.service';
import { CreateTaskRequest, UpdateTaskRequest } from '@domain/task/request';
import { TaskResponse } from '@domain/task/response';
import {
  PaginatedResponse,
  TransformPlainToInstancePaginated,
} from '@app/common/pagination';

@ApiTags(TaskController.path)
@Controller(TaskController.path)
@UseInterceptors(FormatResponseInterceptor)
export class TaskController {
  static path = 'task';

  /**
   * injects Task service to be used in controller
   */
  constructor(private readonly taskService: TaskService) {}

  /**
   * GET /task/list
   *
   * Compatibility 1.0.0
   *
   * Summary: Get all task list.
   *
   * Description: Get all task list and return status code 200.
   *
   * Exception Code:
   *  - 400 (Bad Request): Pagination params not valid.
   */
  @Get('/list/:limit/:page')
  @Version('1.0')
  @DocumentGenerator({
    description: 'Get all task list.',
    summary: 'Get all task list and return status code 200.',
    exceptions: ['400 (Bad Request): Pagination params not valid.'],
    200: [TaskResponse],
  })
  @HttpCode(HttpStatus.OK)
  @TransformPlainToInstancePaginated(TaskResponse)
  findTasks() {
    //Promise<PaginatedResponse<TaskResponse>>
    this.taskService.findTasks();
  }

  /**
   * POST /task/create
   *
   * Compatibility 1.0.0
   *
   * Summary: Create new task.
   *
   * Description: Create new task and return status code 201.
   *
   * Exception Code:
   *  - 400 (Bad Request): The request cannot be fulfilled due to bad syntax.
   */
  @Post('/create')
  @Version('1.0')
  @DocumentGenerator({
    description: 'Create new task',
    summary: 'Create new task and return status code 201',
    exceptions: [
      '400 (Bad Request): The request cannot be fulfilled due to bad syntax.',
    ],
  })
  @HttpCode(HttpStatus.CREATED)
  createNewTask(@Body() body: CreateTaskRequest) {
    return this.taskService.createTask(body);
  }

  /**
   * PUT /task/:taskId/update
   *
   * Compatibility 1.0.0
   *
   * Summary: Update specified task.
   *
   * Description: Update specified task return status code 204.
   *
   * Exception Code:
   *  - 404 (Not Found): Could not find task by id.
   *  - 400 (Bad Request): The request cannot be fulfilled due to bad syntax.
   */
  @Put(':taskId/update')
  @Version('1.0')
  @DocumentGenerator({
    description: 'Update specified task.',
    summary: 'Update specified task return status code 204.',
    exceptions: [
      '404 (Not Found): Could not find task by id.',
      '400 (Bad Request): The request cannot be fulfilled due to bad syntax.',
    ],
    params: [
      {
        name: 'taskId',
        type: 'string',
      },
    ],
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  updateGroup(
    @Param('taskId', new ParseUUIDPipe({ version: '4' })) taskId: string,
    @Body() body: UpdateTaskRequest,
  ) {
    return this.taskService.updateTask(taskId, body);
  }

  /**
   * DELETE /task/:taskId/delete
   *
   * Compatibility 1.0.0
   *
   * Summary: Delete specified task.
   *
   * Description: Delete specified task return status code 204.
   *
   * Exception Code:
   *  - 404 (Not Found): Could not find task by id.
   */
  @Delete(':taskId/delete')
  @Version('1.0')
  @DocumentGenerator({
    description: 'Delete specified task.',
    summary: 'Delete specified task return status code 204.',
    exceptions: ['404 (Not Found): Could not find task by id.'],
    params: [
      {
        name: 'taskId',
        type: 'string',
      },
    ],
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteGroup(
    @Param('taskId', new ParseUUIDPipe({ version: '4' })) taskId: string,
  ) {
    return this.taskService.deleteTasks(taskId);
  }
}
