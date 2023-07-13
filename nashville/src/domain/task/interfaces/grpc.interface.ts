export interface TaskGRPCService {
  find(data: FindTaskInterface): TaskInterface;
  create(data: CreateTaskInterface): AKGInterface;
  update(data: UpdateTaskInterface): AKGInterface;
  delete(data: DeleteTaskInterface): AKGInterface;
}

interface TaskInterface {
  items: Uint8Array;
  total: number;
}

interface AKGInterface {
  status: boolean;
}

interface FindTaskInterface {
  limit: number;
  page: number;
}

interface CreateTaskInterface {
  parentId: string;
  title: string;
  description: string;
}

interface UpdateTaskInterface {
  taskId: string;
  title: string;
  description: string;
}

interface DeleteTaskInterface {
  taskId: string;
}
