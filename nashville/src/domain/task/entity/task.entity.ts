/* The Task class is a TypeScript class that represents a task with properties such as title,
description, createdAt, and updatedAt. */
export class Task {
  _id: string;
  parentId: string;
  title: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;

  /**
   * The constructor function initializes a new instance of the Task class with the provided properties.
   * @param task - The `task` parameter is an object that represents a task. It can have properties such
   * as `title`, `description`, `dueDate`, etc. The `Partial<Task>` type indicates that the `task`
   * parameter can be a partial object of the `Task` type, meaning it can have
   */

  constructor(task: Partial<Task>) {
    this.createdAt = new Date();
    Object.assign(this, task);
  }
}
