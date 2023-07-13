import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Task } from '@domain/task/models';
import {
  CreateTaskInterface,
  DeleteTaskInterface,
  UpdateTaskInterface,
} from '@domain/task/interfaces';
import { TaskEntity } from '@domain/task/entity';

@Injectable()
export class TaskRepository {
  constructor(
    @InjectModel(Task)
    private taskModel: typeof Task,
  ) {}

  /**
   * The find() function returns all tasks from the taskModel.
   * @returns The findAll() method is being called on the taskModel, and the result of this method is
   * being returned.
   */
  find() {
    return this.taskModel.findAll();
  }

  /**
   * The function findOneById takes an id as input and returns a task object with a matching id from
   * the taskModel.
   * @param {string} id - A string representing the unique identifier of the task to be found.
   * @returns The findOneById function is returning the result of the findOne method of the taskModel,
   * which is a single task object that matches the provided id.
   */
  findOneById(id: string) {
    return this.taskModel.findOne({
      where: {
        id,
      },
    });
  }

  /**
   * The create function creates a new task entity with the provided data and saves it to the task
   * model.
   * @param {CreateTaskInterface} body - The `body` parameter is an object that contains the data
   * needed to create a new task. It should have the following properties:
   * @returns the result of the `this.taskModel.create()` method, which is likely a Promise that
   * resolves to the newly created task object.
   */
  create(body: CreateTaskInterface) {
    if (!body.parentId) body.parentId = null;
    const newTask = new TaskEntity(body);

    return this.taskModel.create({
      id: newTask.id,
      parentId: newTask.parentId,
      title: newTask.title,
      description: newTask.description,
    });
  }

  /**
   * The `update` function updates a task in the database based on the provided `UpdateTaskInterface`
   * object.
   * @param {UpdateTaskInterface} body - The `body` parameter is an object that contains the data
   * needed to update a task. It should implement the `UpdateTaskInterface` interface.
   * @returns The `update` method is returning the result of the `taskModel.update` function.
   */
  update(body: UpdateTaskInterface) {
    const newTask = new TaskEntity(body);

    return this.taskModel.update(
      {
        title: newTask.title,
        description: newTask.description,
      },
      {
        where: {
          id: body.taskId,
        },
      },
    );
  }

  /**
   * The delete function deletes a task from the taskModel based on the taskId provided in the body.
   * @param {DeleteTaskInterface} body - The `body` parameter is an object that contains the
   * information needed to delete a task. It should have a property called `taskId` which represents
   * the ID of the task to be deleted.
   * @returns The `destroy` method of the `taskModel` is being called with a `where` clause specifying
   * the `id` of the task to be deleted. The method returns the result of the deletion operation.
   */
  delete(body: DeleteTaskInterface) {
    return this.taskModel.destroy({
      where: {
        id: body.taskId,
      },
    });
  }
}
