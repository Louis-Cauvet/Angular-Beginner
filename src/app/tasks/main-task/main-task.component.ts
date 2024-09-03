import {Component, OnInit} from '@angular/core';
import {Task, taskStatus} from "../model/task";
import {TaskFacadeService} from "../facade/task-facade.service";

@Component({
  selector: 'app-main-task',
  templateUrl: './main-task.component.html',
  styleUrls: ['./main-task.component.css'],
})

export class MainTaskComponent implements OnInit {
  archivedTasks!: Task[];

  constructor(private taskFacade: TaskFacadeService) {}

  ngOnInit(): void {
    this.taskFacade.getAllTasks().subscribe(tasks => {
      this.archivedTasks = tasks.filter(task => task.state === taskStatus.A_FAIRE);
    });
  }
}
