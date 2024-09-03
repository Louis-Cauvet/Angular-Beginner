import { Injectable } from '@angular/core';
import {Task, taskStatus} from "../model/task";
import {CRUDTaskListInterface} from "../interfaces/crudtask-list-interface";

@Injectable({
  providedIn: 'root'
})
export class CRUDTaskListServiceService implements CRUDTaskListInterface {
  currentList !: Task[]

  constructor() {
    this.currentList = [
      { title: 'Tâche entamée 1', description: 'Cette tâche est entamée !', state: taskStatus.EN_COURS, creationDate: new Date(2024, 4, 8) },
      { title: 'Tâche achevée 1', description: 'Cette tâche est finie !', state: taskStatus.TERMINE, creationDate: new Date(2024, 4, 10) },
      { title: 'Tâche entamée 2', description: 'Cette tâche est aussi entamée !', state: taskStatus.EN_COURS, creationDate: new Date(2024, 4, 4) },
      { title: 'Tâche non commencée 1', description: 'Cette tâche est en attente !', state: taskStatus.A_FAIRE, creationDate: new Date(2024, 4, 8) },
      { title: 'Tâche achevée 2', description: 'Cette tâche est aussi finie !', state: taskStatus.TERMINE, creationDate: new Date(2024, 4, 7) },
      { title: 'Tâche entamée 3', description: 'Cette tâche est également entamée !', state: taskStatus.EN_COURS, creationDate: new Date(2024, 4, 9) },
    ]
  }

  createTask(task: Task): void {
    this.currentList.push(task);
  }

  getTasks(): Task[] {
    return this.currentList;
  }

  updateTask(updatedTask: Task): void {
    const index = this.currentList.findIndex(task => task.title === updatedTask.title);
    if (index !== -1) {
      this.currentList[index] = updatedTask;
    }
  }

  deleteTask(title: string): void {
    this.currentList = this.currentList.filter(task => task.title !== title);
  }
}
