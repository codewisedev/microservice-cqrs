export interface FindTaskInterface {
  limit: number;
  page: number;
}

export interface CreateTaskInterface {
  parentId: string;
  title: string;
  description: string;
}

export interface UpdateTaskInterface {
  taskId: string;
  title: string;
  description: string;
}

export interface DeleteTaskInterface {
  taskId: string;
}
