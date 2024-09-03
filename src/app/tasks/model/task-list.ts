import {Task, taskStatus} from './task';

export class TaskList {
  listTasks = [
    { title: 'Tâche entamée 1', description: 'Cette tâche est entamée !', state: taskStatus.EN_COURS, creationDate: new Date(2024, 4, 8) },
    { title: 'Tâche achevée 1', description: 'Cette tâche est finie !', state: taskStatus.TERMINE, creationDate: new Date(2024, 4, 10) },
    { title: 'Tâche entamée 2', description: 'Cette tâche est aussi entamée !', state: taskStatus.EN_COURS, creationDate: new Date(2024, 4, 4) },
    { title: 'Tâche non commencée 1', description: 'Cette tâche est en attente !', state: taskStatus.A_FAIRE, creationDate: new Date(2024, 4, 8) },
    { title: 'Tâche achevée 2', description: 'Cette tâche est aussi finie !', state: taskStatus.TERMINE, creationDate: new Date(2024, 4, 7) },
    { title: 'Tâche entamée 3', description: 'Cette tâche est également entamée !', state: taskStatus.EN_COURS, creationDate: new Date(2024, 4, 11) }
  ];

  getList(): Task[] {
    return this.listTasks;
  }
}
