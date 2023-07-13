import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { CreateTaskRequest, UpdateTaskRequest } from '@domain/task/request';
import { EventService } from '@domain/general/event/event.service';
import { ClientGrpc } from '@nestjs/microservices';
import { TaskGRPCService } from '@domain/task/interfaces';
import { Task } from '@domain/task/entity';

@Injectable()
export class TaskService implements OnModuleInit {
  private taskGrpcService: TaskGRPCService;

  constructor(
    private readonly eventService: EventService,
    @Inject('TASK_PACKAGE') private readonly client: ClientGrpc,
  ) {}

  /**
   * The function initializes the taskGrpcService by getting the TaskService from the client.
   */
  onModuleInit() {
    this.taskGrpcService =
      this.client.getService<TaskGRPCService>('TaskService');
  }

  /**
   * The function "findTasks" calls a gRPC service to find tasks, logs the result, and returns a
   * message indicating that tasks have been returned.
   * @returns The console.log(result) statement will print the result of the Find method from the
   * taskGrpcService. The return statement will print the string 'return tasks!!'.
   */
  findTasks(): any {
    const result = this.taskGrpcService.find({ limit: 10, page: 1 });
    console.log(result);
    console.log('return tasks!!');
    return result;
  }

  /**
   * The `createTask` function creates a new task using the provided parameters, calls the `getTask`
   * method of the `eventService` with a new `Task` object, and logs a message indicating that the task
   * has been created.
   * @param {CreateTaskRequest} body - The `body` parameter is an object that contains the following
   * properties:
   */
  createTask(body: CreateTaskRequest) {
    const { title, description, parentId } = body;
    this.taskGrpcService.create({ title, description, parentId });

    /* `this.eventService.getTask(new Task(body));` is calling the `getTask` method of the
    `eventService` and passing a new `Task` object created from the `body` parameter. It is likely
    that the `getTask` method is responsible for handling events related to tasks, such as emitting
    an event or performing some other action. */
    this.eventService.getTask(new Task(body));
    console.log('task created!!');
  }

  /**
   * The `updateTask` function updates a task by calling a gRPC service to update the task details and
   * then calls the `getTask` method of the `eventService` to handle events related to the updated
   * task.
   * @param {string} taskId - A string representing the ID of the task to be updated.
   * @param {UpdateTaskRequest} body - The `body` parameter is an object that contains the updated
   * information for the task. It has two properties:
   */
  updateTask(taskId: string, body: UpdateTaskRequest) {
    const { title, description } = body;
    this.taskGrpcService.update({ taskId, title, description });

    /* `this.eventService.getTask(new Task(body));` is calling the `getTask` method of the
    `eventService` and passing a new `Task` object created from the `body` parameter. It is likely
    that the `getTask` method is responsible for handling events related to tasks, such as emitting
    an event or performing some other action. */
    this.eventService.getTask(new Task(body));
    console.log('task updated!!');
  }

  /**
   * The deleteTasks function deletes a task using the taskGrpcService and logs a message indicating
   * that the task has been deleted.
   * @param {string} taskId - The `taskId` parameter is a string that represents the unique identifier
   * of the task that needs to be deleted.
   */
  deleteTasks(taskId: string) {
    this.taskGrpcService.delete({ taskId });

    console.log('task deleted!!');
  }
}
