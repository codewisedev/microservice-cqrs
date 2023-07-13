export class UpdateTaskCommand {
  constructor(
    public readonly taskId: string,
    public readonly title: string,
    public readonly description: string,
  ) {}
}
