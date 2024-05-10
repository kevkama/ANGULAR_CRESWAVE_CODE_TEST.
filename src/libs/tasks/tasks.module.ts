import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { TasksTableComponent } from './tasks-table/tasks-table.component';
import { TaskEditComponent } from './task-edit/task-edit.component';
import { TasksRoutingModule } from './task-routing.module';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({

  declarations: [

  ],
  imports: [
    CommonModule,
    TasksRoutingModule,
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatTableModule,
    MatIconModule,
    FormsModule,
    MatFormField,
    TasksTableComponent,
    TaskEditComponent,
    MatDialogModule  
  ],


})
export class TasksModule { }