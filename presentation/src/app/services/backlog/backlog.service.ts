import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Task } from '../../../models/task';

@Injectable({
  providedIn: 'root'
})
export class BacklogService {
  private baseUrl = 'Backlog/';

  constructor(private httpClient: HttpClient) { }

  public getBacklogTasksForProject(projectId: string): Observable<any> {
    const getBacklogTasksForProjectUrl = this.baseUrl + 'projectId=' + projectId;

    return this.httpClient.get<Task[]>(getBacklogTasksForProjectUrl).pipe(
      map((tasks) => tasks.map(task => ({
        ...task,
        dueDate: new Date(task.dueDate),
        startDate: new Date(task.startDate),
      })))
    );
  }
}
