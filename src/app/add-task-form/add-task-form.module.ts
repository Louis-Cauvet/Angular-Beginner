import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TaskFormComponent} from "./task-form/task-form.component";
import {ReactiveFormsModule} from "@angular/forms";
import {AddTasksFormRoutingModule} from "./add-task-form-routing.module";
import {MainAddTaskFormComponent} from "./main-add-task-form/main-add-task-form.component";

@NgModule({
  declarations: [TaskFormComponent, MainAddTaskFormComponent],
  imports: [
    CommonModule,ReactiveFormsModule,AddTasksFormRoutingModule
  ]
})

export class AddTaskFormModule {}
