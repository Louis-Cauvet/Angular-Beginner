import { Injectable } from '@angular/core';
import {CRUDTaskListServiceService} from "./crudtask-list-service.service";
import { Task, taskStatus } from '../model/task';
import {ByStatutTaskListInterface} from "../interfaces/by-statut-task-list-interface";

@Injectable({
  providedIn: 'root'
})
export class ByStatutTaskListServiceService implements ByStatutTaskListInterface{

  constructor(private crudService: CRUDTaskListServiceService) {}

  getTasksByStatus(status: taskStatus): Task[] {
    return this.crudService.getTasks().filter(task => task.state === status);
  }
}
