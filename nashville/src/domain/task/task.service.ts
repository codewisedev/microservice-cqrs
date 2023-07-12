import { Injectable } from '@nestjs/common';
import { CreateTaskRequest, UpdateTaskRequest } from '@domain/task/request';

@Injectable()
export class TaskService {
  constructor() {}

  findTasks() {
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
