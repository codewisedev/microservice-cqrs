import { Observable } from 'rxjs';

export interface TaskGRPCService {
  find(data: FindTaskInterface): Observable<TaskInterface>;
  create(data: CreateTaskInterface): Observable<AKGInterface>;
  update(data: UpdateTaskInterface): Observable<AKGInterface>;
  delete(data: DeleteTaskInterface): Observable<AKGInterface>;
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
