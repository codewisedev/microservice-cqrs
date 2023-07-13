import { Observable } from 'rxjs';

export interface TaskGRPCService {
  Find(data: FindTaskInterface): Observable<TaskInterface>;
  Create(data: CreateTaskInterface): Observable<AKGInterface>;
  Update(data: UpdateTaskInterface): Observable<AKGInterface>;
  Delete(data: DeleteTaskInterface): Observable<AKGInterface>;
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
