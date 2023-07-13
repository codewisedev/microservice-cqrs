import { Observable } from 'rxjs';

export interface TaskGRPCService {
  Find(data: FindTaskInterface): Observable<TaskInterface>;
  Create(data: CreateTaskInterface): Observable<TaskResponseInterface>;
  Update(data: UpdateTaskInterface): Observable<TaskResponseInterface>;
  Delete(data: DeleteTaskInterface): Observable<TaskResponseInterface>;
}

interface TaskInterface {
  items: string;
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
