import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Log } from '@domain/log/models';

@Injectable()
export class LogRepository {
  constructor(
    @InjectModel(Log)
    private taskModel: typeof Log,
  ) {}

  /**
   * The create function creates a new task using the provided body.
   * @param body - The `body` parameter is an object that contains the data for creating a new task. It
   * typically includes properties such as `title`, `description`, `dueDate`, and `priority`.
   * @returns The create method is returning the result of the taskModel.create() method.
   */
  create(body) {
    return this.taskModel.create(body);
  }
}
