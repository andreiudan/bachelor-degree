import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Sprint } from '../../../models/sprint';
import { Project } from '../../../models/project';
import { Task } from '../../../models/task';
import { PriorityTypes } from '../../../models/priorityTypes';
import { StatusTypes } from '../../../models/statusTypes';
import { TaskTypes } from '../../../models/taskTypes';
import { SprintCreation } from '../../../models/sprintCreation';

@Injectable({
  providedIn: 'root',
})
export class SprintService {
  private baseUrl = 'Sprint';

  constructor(private httpClient: HttpClient) {}

  public create(sprint: SprintCreation): Observable<any> {
    return this.httpClient.post(this.baseUrl, sprint, { responseType: 'text' });
  }

  public get(id: string): Observable<any> {
    const getUrl = this.baseUrl + id;

    return this.httpClient.get<Sprint>(getUrl).pipe(
      map((sprint) => ({
        ...sprint,
        dueDate: new Date(sprint.dueDate),
        startDate: new Date(sprint.startDate),
      }))
    );
  }

  public getAll(): Observable<any> {
    return this.httpClient.get<Sprint[]>(this.baseUrl).pipe(
      map((sprints) =>
        sprints.map((sprint) => ({
          ...sprint,
          dueDate: new Date(sprint.dueDate),
          startDate: new Date(sprint.startDate),
        }))
      )
    );
  }

  public getTasksForSprint(sprintId: string): Observable<any> {
    return this.httpClient
      .get<Task[]>(this.baseUrl + '/' + sprintId + '/tasks')
      .pipe(
        map((tasks) =>
          tasks.map((task) => ({
            ...task,
            dueDate: new Date(task.dueDate),
            createdDate: new Date(task.startDate),
          }))
        )
      );
  }

  public getTasksByTaskPriorityForSprint(
    sprintId: string,
    taskPriority: PriorityTypes
  ): Observable<any> {
    const getTasksByTaskPriorityForSprintUrl =
      this.baseUrl + '/' + sprintId + '/tasks/priority/' + taskPriority;
    return this.httpClient.get<Task[]>(getTasksByTaskPriorityForSprintUrl).pipe(
      map((tasks) =>
        tasks.map((task) => ({
          ...task,
          dueDate: new Date(task.dueDate),
          createdDate: new Date(task.startDate),
        }))
      )
    );
  }

  public getTasksByTaskStatusForSprint(
    sprintId: string,
    taskStatus: StatusTypes
  ): Observable<any> {
    const getTasksByTaskStatusForSprintUrl =
      this.baseUrl + '/' + sprintId + '/tasks/status/' + taskStatus;
    return this.httpClient.get<Task[]>(getTasksByTaskStatusForSprintUrl).pipe(
      map((tasks) =>
        tasks.map((task) => ({
          ...task,
          dueDate: new Date(task.dueDate),
          createdDate: new Date(task.startDate),
          status: StatusTypes[task.status],
          priority: PriorityTypes[task.priority],
          type: TaskTypes[task.type],
          progress: this.calculateTaskProgress(task),
        }))
      )
    );
  }

  public getActiveSprintForProject(projectId: string): Observable<any> {
    const getActiveSprintForProjectUrl =
      this.baseUrl + '/projectId=' + projectId + '/active';

    return this.httpClient.get<Sprint>(getActiveSprintForProjectUrl).pipe(
      map((sprint) => ({
        ...sprint,
        dueDate: new Date(sprint.dueDate),
        startDate: new Date(sprint.startDate),
        tasks: sprint.tasks.map((task) => ({
          ...task,
          dueDate: new Date(task.dueDate),
          startDate: new Date(task.startDate),
          status: StatusTypes[task.status],
          priority: PriorityTypes[task.priority],
          type: TaskTypes[task.type],
          progress: this.calculateTaskProgress(task),
        })),
      }))
    );
  }

  public getInactiveSprintsForProject(projectId: string): Observable<any> {
    const getInactiveSprintsForProjectUrl =
      this.baseUrl + '/projectId=' + projectId + '/inactive';

    return this.httpClient.get<Sprint[]>(getInactiveSprintsForProjectUrl).pipe(
      map((sprints) =>
        sprints.map((sprint) => ({
          ...sprint,
          dueDate: new Date(sprint.dueDate),
          startDate: new Date(sprint.startDate),
          tasks: sprint.tasks.map((task) => ({
            ...task,
            dueDate: new Date(task.dueDate),
            startDate: new Date(task.startDate),
            status: StatusTypes[task.status],
            priority: PriorityTypes[task.priority],
            type: TaskTypes[task.type],
            progress: this.calculateTaskProgress(task),
          })),
        }))
      )
    );
  }

  private calculateTaskProgress(task: Task): number {
    if (!task.keyTasks) {
        return 0;
    }
    const completedSubTasks = task.keyTasks.filter(subTask => subTask.isDone).length;
    const totalSubTasks = task.keyTasks.length;
    return totalSubTasks === 0 ? 0 : (completedSubTasks / totalSubTasks) * 100;
}
}
