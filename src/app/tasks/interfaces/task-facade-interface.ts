import {Task, taskStatus} from "../model/task";
import {Observable} from "rxjs";

export interface TaskFacadeInterface {
  createTask(task: Task): Observable<void>;

  getAllTasks(): Observable<Task[]>;

  updateTask(task: Task): Observable<void>;

  deleteTask(title: string): Observable<void>;

  getTasksByStatus(status: taskStatus): Observable<Task[]>;
}
