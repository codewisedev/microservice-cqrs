import { Injectable } from '@nestjs/common';
import { CreateTaskRequest, UpdateTaskRequest } from '@domain/task/request';
import { EventService } from '@domain/general/event/event.service';
import { WSEvents } from '@domain/general/event/enum';

@Injectable()
export class TaskService {
  constructor(private readonly eventService: EventService) {}

  findTasks() {
    // this.eventService.getTask(WSEvents.GET_TASK, []);
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
