import { Injectable } from '@nestjs/common';
import { CreateTaskRequest, UpdateTaskRequest } from '@domain/task/request';
import { EventGateway } from '@domain/general/event/event.gateway';
import { WSEvents } from '@domain/general/event/enum';

@Injectable()
export class TaskService {
  constructor(private readonly eventGateway: EventGateway) {}

  findTasks() {
    this.eventGateway.server.emit(WSEvents.GET_TASK, ['task 1', 'task 2']);
    return console.log('return tasks!!');
  }

  createTask(body: CreateTaskRequest) {
    console.log('task created!!');
  }

  updateTask(taskId: string, body: UpdateTaskRequest) {
    console.log('task updated!!');
  }

  deleteTasks(taskId: string) {
    console.log('task deleted!!');
  }
}
