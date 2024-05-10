import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TasksTableComponent } from './tasks-table/tasks-table.component';
import { TaskEditComponent } from './task-edit/task-edit.component';


const routes: Routes = [
  {
    path: 'tasks',
    component: TasksTableComponent,
    children: [
      { path: 'new', component: TaskEditComponent },
      { path: ':id', component: TasksTableComponent },
      { path: ':id/edit', component: TaskEditComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TasksRoutingModule { }