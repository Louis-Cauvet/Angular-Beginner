import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {Task, taskStatus} from "../../tasks/model/task";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";


@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.css'
})

export class TaskFormComponent implements OnInit {
  @Output() formSubmitted = new EventEmitter<Task>();
  addTaskForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
  ) {}

  ngOnInit(): void {
    this.addTaskForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      description: ['', [Validators.minLength(10), Validators.maxLength(200)]],
      state:[taskStatus.A_FAIRE],
      creationDate: [new Date()]
    });
  }

  onSubmit() {
    if (this.addTaskForm.valid) {
      this.formSubmitted.emit(this.addTaskForm.value);
      this.addTaskForm.reset({
        title: '',
        description: '',
        state: taskStatus.A_FAIRE,
        creationDate: new Date()
      });
    }
  }
}
