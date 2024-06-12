import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Project } from '../../../models/project';
import { Sprint } from '../../../models/sprint';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private readonly baseUrl: string = "Project";

  constructor(private httpClient: HttpClient) { }

  public create(project: Project): Observable<any> {
    return this.httpClient.post<Project>(this.baseUrl, project, {responseType: 'text' as 'json'});
  }

  public get(id: string): Observable<any> {
    const getUrl = this.baseUrl + id;

    return this.httpClient.get<Project>(getUrl).pipe(
      map(project => ({
        ...project,
        dueDate: new Date(project.dueDate),
        startDate: new Date(project.startDate),
      }))
    );
  }

  public getAll(): Observable<Project[]> {
    return this.httpClient.get<Project[]>(this.baseUrl).pipe(
      map((projects) => projects.map(project => ({
       ...project,
        dueDate: new Date(project.dueDate),
        startDate: new Date(project.startDate)
      })))
    );
  }

  public getAllWithAllChildren(): Observable<Project[]> {
    const getAllWithAllChildrenUrl = this.baseUrl + '/getAllChildren';

    return this.httpClient.get<Project[]>(getAllWithAllChildrenUrl).pipe(
      map((projects) => projects.map(project => ({
       ...project,
        dueDate: new Date(project.dueDate),
        startDate: new Date(project.startDate)
      })))
    );
  }

  public getSprintsForProject(projectId: string): Observable<any> {
    const getSprintsForProjectUrl = this.baseUrl + '/' + projectId + '/sprints';
    
    return this.httpClient.get<Sprint[]>(getSprintsForProjectUrl).pipe(
      map((sprints) => sprints.map(sprint => ({
       ...sprint,
        dueDate: new Date(sprint.dueDate),
        startDate: new Date(sprint.startDate)
      })))
    );
  }

  public getActiveSprint(projectId: string): Observable<any> {
    const getActiveSprintUrl = this.baseUrl + '/' + projectId + '/activeSprint';
    
    return this.httpClient.get<Sprint>(getActiveSprintUrl).pipe(
      map(sprint => ({
       ...sprint,
        dueDate: new Date(sprint.dueDate),
        startDate: new Date(sprint.startDate)
      }))
    );
  }
}
