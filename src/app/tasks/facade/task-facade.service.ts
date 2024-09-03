import { Injectable } from '@angular/core';
import { Task, taskStatus } from '../model/task';
import {CRUDTaskListServiceService} from "../services/crudtask-list-service.service";
import {ByStatutTaskListServiceService} from "../services/by-statut-task-list-service.service";
import {TaskFacadeInterface} from "../interfaces/task-facade-interface";
import { Observable, BehaviorSubject, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskFacadeService implements TaskFacadeInterface {
  private tasksSubject: BehaviorSubject<Task[]> = new BehaviorSubject<Task[]>(this.crudService.getTasks());
  tasks$: Observable<Task[]> = this.tasksSubject.asObservable();

  constructor(
    private crudService: CRUDTaskListServiceService,
    private byStatusService: ByStatutTaskListServiceService
  ) {}

  createTask(task: Task): Observable<void> {
    this.crudService.createTask(task);
    this.tasksSubject.next(this.crudService.getTasks());
    return of(void 0);
  }

  getAllTasks(): Observable<Task[]> {
    return this.tasks$;
  }

  updateTask(task: Task): Observable<void> {
    this.crudService.updateTask(task);
    this.tasksSubject.next(this.crudService.getTasks());
    return of(void 0);
  }

  deleteTask(title: string): Observable<void> {
    this.crudService.deleteTask(title);
    this.tasksSubject.next(this.crudService.getTasks()); // Mise à jour du BehaviorSubject
    return of(void 0);
  }

  getTasksByStatus(status: taskStatus): Observable<Task[]> {
    const filterStatusTasks = this.byStatusService.getTasksByStatus(status);
    return of(filterStatusTasks);
  }
}
