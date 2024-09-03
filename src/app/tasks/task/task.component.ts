import {Component, OnInit, Input} from '@angular/core';
import { Task, taskStatus } from '../model/task';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrl: './task.component.css'
})

export class TaskComponent {
  @Input() currentTaskComponent!: Task;
}
