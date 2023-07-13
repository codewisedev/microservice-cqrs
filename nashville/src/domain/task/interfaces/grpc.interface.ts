export interface TaskGRPCService {
  find(data: FindTaskInterface): TaskInterface;
  create(data: CreateTaskInterface): TaskResponseInterface;
  update(data: UpdateTaskInterface): TaskResponseInterface;
  delete(data: DeleteTaskInterface): TaskResponseInterface;
}

interface TaskInterface {
  items: Uint8Array;
  total: number;
}

interface TaskResponseInterface {
  id: string;
  parentId: string;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
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
