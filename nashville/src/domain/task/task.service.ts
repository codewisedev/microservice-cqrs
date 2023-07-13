import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { CreateTaskRequest, UpdateTaskRequest } from '@domain/task/request';
import { EventService } from '@domain/general/event/event.service';
import { WSEvents } from '@domain/general/event/enum';
import { ClientGrpc } from '@nestjs/microservices';
import { TaskGRPCService } from '@domain/task/interfaces';

@Injectable()
export class TaskService implements OnModuleInit {
  private taskGrpcService: TaskGRPCService;

  constructor(
    @Inject('TASK_PACKAGE') private client: ClientGrpc,
    private readonly eventService: EventService,
  ) {}

  onModuleInit() {
    this.taskGrpcService =
      this.client.getService<TaskGRPCService>('TaskService');
  }

  async findTasks() {
    const result = await this.taskGrpcService.Find({ limit: 10, page: 1 });
    console.log(result);
    return console.log('return tasks!!');
  }

  createTask(body: CreateTaskRequest) {
    // this.eventService.getTask(WSEvents.GET_TASK, {});
    console.log('task created!!');
  }

  updateTask(taskId: string, body: UpdateTaskRequest) {
    console.log('task updated!!');
  }

  deleteTasks(taskId: string) {
    console.log('task deleted!!');
  }
}
