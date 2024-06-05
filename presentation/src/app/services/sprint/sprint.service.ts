import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Sprint } from '../../../models/sprint';
import { Project } from '../../../models/project';
import { Task } from '../../../models/task';
import { PriorityTypes } from '../../../models/priorityTypes';

@Injectable({
  providedIn: 'root'
})
export class SprintService {
  private baseUrl = 'Sprint'

  constructor(private httpClient: HttpClient) { }

  public create(sprint: Sprint): Observable<any> {
    return this.httpClient.post(this.baseUrl, sprint, {responseType: 'text'});
  }

  public get(id: string): Observable<any> {
    const getUrl = this.baseUrl + id;

    return this.httpClient.get(getUrl);
  }

  public getAll() : Observable<any> {
    return this.httpClient.get(this.baseUrl);
  }

  public getTasksForSprint(sprintId: string) : Observable<any> {
    return this.httpClient.get<Task[]>(this.baseUrl + '/' + sprintId + '/tasks').pipe(
      map((tasks) => tasks.map(task => ({
        ...task,
        dueDate: new Date(task.dueDate),
        createdDate: new Date(task.createdDate)
      })))
    );;
  }

  public getTasksByTaskPriorityForSprint(sprintId: string, taskPriority: PriorityTypes) : Observable<any> {
    return this.httpClient.get<Task[]>(this.baseUrl + '/' + sprintId + '/tasks/' + taskPriority).pipe(
      map((tasks) => tasks.map(task => ({
        ...task,
        dueDate: new Date(task.dueDate),
        createdDate: new Date(task.createdDate)
      })))
    );
  }
}
