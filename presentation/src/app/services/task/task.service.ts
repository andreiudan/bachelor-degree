import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Task } from '../../../models/task';
import { Observable, map } from 'rxjs';
import { TaskCreation } from '../../../models/taskCreation';
import { SubTask } from '../../../models/subTask';
import { StatusTypes } from '../../../models/statusTypes';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private baseUrl: string = "Task/";

  constructor(private httpClient: HttpClient) { }

  public create(task: TaskCreation): Observable<any> {
    const createUrl = this.baseUrl + 'create';

    return this.httpClient.post(this.baseUrl, task, {responseType: 'text'});
  }

  public get(id: string): Observable<any> {
    const getUrl = this.baseUrl + id;

    return this.httpClient.get<Task>(getUrl).pipe(
      map(task => ({
        ...task,
        dueDate: new Date(task.dueDate),
        startDate: new Date(task.startDate),
      }))
    );
  }

  public getAll(): Observable<any> {
    return this.httpClient.get<Task[]>(this.baseUrl).pipe(
      map((tasks) => tasks.map(task => ({
        ...task,
        dueDate: new Date(task.dueDate),
        startDate: new Date(task.startDate),
      })))
    );
  }

  public getSprintName(taskId: string): Observable<string> {
    const getSprintNameUrl = this.baseUrl + taskId + '/sprintName';

    return this.httpClient.get<string>(getSprintNameUrl);
  }

  public getProjectName(taskId: string): Observable<string> {
    const getProjectNameUrl = this.baseUrl + taskId + '/projectName';

    return this.httpClient.get<string>(getProjectNameUrl);
  }

  public addNewSubtask(taskId: string, subtaskName: string): Observable<any> {
    const addSubtaskUrl = this.baseUrl + taskId + '/newSubtask=' + subtaskName;

    return this.httpClient.put<SubTask>(addSubtaskUrl, {responseType: 'text'}).pipe(
      map(subtask => ({
        id: subtask.id,
        name: subtask.name,
        isDone: subtask.done,
      }))
    );
  }

  public updateSubtask(taskId: string, subtask: SubTask): Observable<any> {
    const updateSubtaskUrl = this.baseUrl + taskId + '/subtask';

    return this.httpClient.put(updateSubtaskUrl, subtask, {responseType: 'text'});
  }

  public updateStatus(taskId: string, status: StatusTypes): Observable<any> {
    const updateStatusUrl = this.baseUrl + taskId + '/status/' + status;

    return this.httpClient.put(updateStatusUrl, {responseType: 'text'});
  }
}
