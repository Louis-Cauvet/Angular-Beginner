import {Task, taskStatus} from "../model/task";

export interface ByStatutTaskListInterface {
  getTasksByStatus(status: taskStatus): Task[]
}
