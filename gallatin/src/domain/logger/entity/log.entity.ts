import { v4 as uuidv4 } from 'uuid';

/* The Log class is a TypeScript class that represents a log entry with properties such as _id, taskId,
status, and createdAt, and has a constructor that initializes a new instance of the class with
optional properties. */
export class Log {
  id: string;
  taskId: string;
  status: string;
  createdAt: Date;

  /**
   * The constructor function initializes a new instance of a Log object with a createdAt property set
   * to the current date and assigns any additional properties passed in the log parameter.
   * @param log - The `log` parameter is an object of type `Partial<Log>`. The `Partial` utility type
   * in TypeScript allows all properties of the `Log` type to be optional. This means that when
   * creating an instance of the class, you can pass in an object that may or may not have
   */
  constructor(log: Partial<Log>) {
    this.id = uuidv4();
    this.createdAt = new Date();
    Object.assign(this, log);
  }
}
