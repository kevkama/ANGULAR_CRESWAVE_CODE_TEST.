import { Routes } from '@angular/router';
import { TasksTableComponent } from '../libs/tasks/tasks-table/tasks-table.component';

export const routes: Routes = [
  { path: '', component: TasksTableComponent },
  { path: 'tasks', component: TasksTableComponent },
];