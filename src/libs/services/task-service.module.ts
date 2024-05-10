import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskService } from './task.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';


@NgModule({
  imports: [CommonModule],
  providers: [TaskService, HttpClientModule]
})
export class TaskServiceModule {
  static forRoot(): ModuleWithProviders<TaskServiceModule>{
    return{
      ngModule: TaskServiceModule,
      providers:[TaskService, HttpClient, HttpClientModule]
    }
  }
}