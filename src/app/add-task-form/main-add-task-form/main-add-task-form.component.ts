import { Component } from '@angular/core';
import {TaskFacadeService} from "../../tasks/facade/task-facade.service";
import {Task, taskStatus} from "../../tasks/model/task";

@Component({
  selector: 'app-main-add-task-form',
  templateUrl: './main-add-task-form.component.html',
  styleUrl: './main-add-task-form.component.css'
})

export class MainAddTaskFormComponent {
  constructor(private taskFacade: TaskFacadeService) {}

  onTaskFormSubmit(task: Task): void {
    this.taskFacade.createTask(task).subscribe(() => {
      console.log("La tâche à bien été ajoutée à la liste");
    });
  }

}
