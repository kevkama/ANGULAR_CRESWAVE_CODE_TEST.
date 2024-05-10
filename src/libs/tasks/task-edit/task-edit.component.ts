import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Task } from '../../models/task.model';
import { TaskService } from '../../services/task.service';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TaskServiceModule } from '../../services/task-service.module';

@Component({
  selector: 'app-task-edit',
  standalone: true,
  imports: [FormsModule, HttpClientModule, ReactiveFormsModule],
  providers: [
    TaskServiceModule, TaskService, HttpClient
  ],
  templateUrl: './task-edit.component.html',
  styleUrls: ['./task-edit.component.scss'],
})


export class TaskEditComponent implements OnInit {
  taskForm: FormGroup;
  task!: Task;
  isEditMode = false;
  isNew: boolean = true;

  constructor(
    private formBuilder: FormBuilder,
    private taskService: TaskService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.taskForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      status: ['incomplete', Validators.required],
      completed: [false]
    });
  }

  ngOnInit() {
    const taskId = this.route.snapshot.paramMap.get('id');
    if (taskId) {
      this.isEditMode = true;
      this.isNew = false;
      this.taskService.getTask(+taskId).subscribe((task) => {
        this.task = task;
        this.taskForm.patchValue(task);
      });
    } 
  }

  onSubmit() {
    if (this.taskForm.valid) {
      const formValue = this.taskForm.value;
      const task: Task = {
        id: this.isEditMode ? this.task.id : undefined,
        title: formValue.title,
        description: formValue.description,
        status: formValue.status,
        completed: formValue.completed
      };

      if (this.isEditMode) {
        this.taskService.updateTask(task).subscribe(() => {
          this.router.navigate(['/tasks']);
        });
      } else {
        // this.taskService.addTask(task).subscribe(() => {
        //   this.router.navigate(['/tasks']);
        // });
      }
    }
  }
}