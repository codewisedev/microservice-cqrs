import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import {
  AKGInterface,
  CreateTaskInterface,
  DeleteTaskInterface,
  FindTaskInterface,
  TaskInterface,
  UpdateTaskInterface,
} from '@domain/task/interfaces';
import { Metadata, ServerUnaryCall } from '@grpc/grpc-js';
import { TaskService } from '@domain/task/task.service';

@Controller()
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @GrpcMethod('TaskService')
  find(
    request: FindTaskInterface,
    metadata: Metadata,
    call: ServerUnaryCall<any, any>,
  ) {
    console.log('grpc find');
    return this.taskService.find(request);
  }

  @GrpcMethod('TaskService')
  create(
    request: CreateTaskInterface,
    metadata: Metadata,
    call: ServerUnaryCall<any, any>,
  ) {
    console.log('grpc create');
    return this.taskService.create(request);
  }

  @GrpcMethod('TaskService')
  update(
    request: UpdateTaskInterface,
    metadata: Metadata,
    call: ServerUnaryCall<any, any>,
  ) {
    console.log('grpc update');
    return this.taskService.update(request);
  }

  @GrpcMethod('TaskService')
  delete(
    request: DeleteTaskInterface,
    metadata: Metadata,
    call: ServerUnaryCall<any, any>,
  ) {
    console.log('grpc delete');
    return this.taskService.delete(request);
  }
}
