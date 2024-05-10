import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Task } from '../../models/task.model';
import { TaskService } from '../../services/task.service';
import { TaskEditComponent } from '../task-edit/task-edit.component';
import { TaskServiceModule } from '../../services/task-service.module';
import { HttpClient, HttpClientModule, HttpHandler } from '@angular/common/http';
@Component({
  selector: 'app-tasks-table',
  templateUrl: './tasks-table.component.html',
  styleUrls: ['./tasks-table.component.scss'],
  standalone: true,
  imports: [MatTableModule, TaskServiceModule, HttpClientModule],
  providers: [
    TaskServiceModule, TaskService, HttpClient
  ]
})

export class TasksTableComponent implements OnInit {
  tasks: Task[] = [];
  displayedColumns: string[] = ['title', 'description', 'status', 'actions'];
  dataSource: MatTableDataSource<Task>

  constructor(
    private taskService: TaskService,
    private dialog: MatDialog,
    private router: Router
  ) {this.dataSource=new MatTableDataSource() }

  ngOnInit(): void {
    this.fetchTasks();
  }

  fetchTasks(): void {
    this.taskService.getTasks().subscribe(
      (tasks) => this.tasks = tasks,
      error => console.error('Error fetching tasks:', error)
    );
  }

  toggleTaskStatus(task: Task): void {
    task.completed = !task.completed;
    this.taskService.updateTask(task).subscribe(
      updatedTask => console.log('Task updated:', updatedTask),
      error => console.error('Error updating task:', error)
    );
  }

  editTask(task: Task): void {
    const dialogRef = this.dialog.open(TaskEditComponent, {
      data: { task: { ...task } }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.taskService.updateTask(result).subscribe(
          updatedTask => {
            const index = this.tasks.findIndex(t => t.id === updatedTask.id);
            this.tasks[index] = updatedTask;
          },
          error => console.error('Error updating task:', error)
        );
      }
    });
  }

  deleteTask(id: number): void {
    this.taskService.deleteTask(id).subscribe(
      () => {
        this.tasks = this.tasks.filter(task => task.id !== id);
      },
      error => console.error('Error deleting task:', error)
    );
  }

  addTask(): void {
    this.router.navigate(['/tasks/new']);
  }
}