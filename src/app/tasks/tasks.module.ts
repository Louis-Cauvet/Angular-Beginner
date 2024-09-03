import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TasksRoutingModule } from './tasks-routing.module';
import {TaskComponent} from "./task/task.component";
import {MainTaskComponent} from "./main-task/main-task.component";
import {TaskListComponent} from "./task-list/task-list.component";
import {ColorTaskDirective} from "./task/color-task.directive";
import {FormatdatePipe} from "./task/formatdate.pipe";



@NgModule({
  declarations: [
    TaskComponent, MainTaskComponent, TaskListComponent, ColorTaskDirective, FormatdatePipe
  ],
  imports: [
    CommonModule,
    TasksRoutingModule
  ]
})
export class TasksModule { }
