import {Component, Input, OnInit} from '@angular/core';
import { TaskList } from '../model/task-list';
import { Task } from '../model/task';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css'
})

export class TaskListComponent {
  @Input() currentTaskListComponent!: Task[];
}
