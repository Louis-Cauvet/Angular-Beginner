import {Task} from "../model/task";

export interface CRUDTaskListInterface {
  createTask(task: Task): void;
  getTasks(): Task[];
  updateTask(updatedTask: Task): void;
  deleteTask(title: string): void;
}
