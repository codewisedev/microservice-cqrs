import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Task } from '@domain/task/models';

@Injectable()
export class TaskRepository {
  constructor(
    @InjectModel(Task)
    private taskModel: typeof Task,
  ) {}
}
