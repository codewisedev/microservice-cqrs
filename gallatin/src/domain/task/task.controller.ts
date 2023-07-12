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

@Controller()
export class TaskController {
  @GrpcMethod('TaskService')
  find(
    request: FindTaskInterface,
    metadata: Metadata,
    call: ServerUnaryCall<any, any>,
  ): TaskInterface {
    console.log('grpc find');
    return {
      items: new Uint8Array(),
      total: 0,
    };
  }

  @GrpcMethod('TaskService')
  create(
    request: CreateTaskInterface,
    metadata: Metadata,
    call: ServerUnaryCall<any, any>,
  ): AKGInterface {
    console.log('grpc create');
    return {
      status: true,
    };
  }

  @GrpcMethod('TaskService')
  update(
    request: UpdateTaskInterface,
    metadata: Metadata,
    call: ServerUnaryCall<any, any>,
  ): AKGInterface {
    console.log('grpc update');
    return {
      status: true,
    };
  }

  @GrpcMethod('TaskService')
  delete(
    request: DeleteTaskInterface,
    metadata: Metadata,
    call: ServerUnaryCall<any, any>,
  ): AKGInterface {
    console.log('grpc delete');
    return {
      status: true,
    };
  }
}
