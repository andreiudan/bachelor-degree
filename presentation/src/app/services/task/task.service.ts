import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Task } from '../../../models/task';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private baseUrl: string = "Task/";

  constructor(private httpClient: HttpClient) { }

  public create(task: Task): Observable<any> {
    const createUrl = this.baseUrl + 'create';

    return this.httpClient.post(this.baseUrl, task, {responseType: 'text'});
  }

  public get(id: string): Observable<any> {
    const getUrl = this.baseUrl + id;

    return this.httpClient.get(getUrl);
  }

  public getAll(): Observable<any> {
    return this.httpClient.get(this.baseUrl);
  }
}
