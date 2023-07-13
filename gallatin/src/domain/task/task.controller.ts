import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import {
  CreateTaskInterface,
  DeleteTaskInterface,
  FindTaskInterface,
  UpdateTaskInterface,
} from '@domain/task/interfaces';
import { Metadata, ServerUnaryCall } from '@grpc/grpc-js';
import { TaskService } from '@domain/task/task.service';

@Controller()
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  /* The `@GrpcMethod('TaskService')` decorator is used to define a gRPC method in the `TaskController`
  class. This method is called `find` and it takes in three parameters: `request`, `metadata`, and
  `call`. */
  @GrpcMethod('TaskService')
  async find(
    request: FindTaskInterface,
    metadata: Metadata,
    call: ServerUnaryCall<any, any>,
  ) {
    console.log('grpc find');
    console.log(request);

    return await this.taskService.find(request);
  }

  /* The `@GrpcMethod('TaskService')` decorator is used to define a gRPC method in the `TaskController`
  class. This specific method is called `create` and it takes in three parameters: `request`,
  `metadata`, and `call`. */
  @GrpcMethod('TaskService')
  create(
    request: CreateTaskInterface,
    metadata: Metadata,
    call: ServerUnaryCall<any, any>,
  ) {
    console.log('grpc create');
    return this.taskService.create(request);
  }

  /* The `@GrpcMethod('TaskService')` decorator is used to define a gRPC method in the `TaskController`
  class. This specific method is called `update` and it takes in three parameters: `request`,
  `metadata`, and `call`. */
  @GrpcMethod('TaskService')
  update(
    request: UpdateTaskInterface,
    metadata: Metadata,
    call: ServerUnaryCall<any, any>,
  ) {
    console.log('grpc update');
    return this.taskService.update(request);
  }

  /* The `@GrpcMethod('TaskService')` decorator is used to define a gRPC method in the `TaskController`
  class. This specific method is called `delete` and it takes in three parameters: `request`,
  `metadata`, and `call`. */
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
