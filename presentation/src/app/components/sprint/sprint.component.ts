import { Component } from '@angular/core';
import { Task } from '../../../models/task';
import { TaskService } from '../../services/task/task.service';
import { StatusTypes } from '../../../models/statusTypes';
import { Sprint } from '../../../models/sprint';
import { SprintService } from '../../services/sprint/sprint.service';
import { lastValueFrom } from 'rxjs';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Router } from '@angular/router';
import { User } from '../../../models/user';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-sprint',
  templateUrl: './sprint.component.html',
  styleUrl: './sprint.component.scss'
})
export class SprintComponent {
  public toDoTasks: Task[] = [];
  public inProgressTasks: Task[] = [];
  public inReviewTasks: Task[] = [];
  public doneTasks: Task[] = [];

  public activeSprint: Sprint = new Sprint();
  public projectName: string;

  public toDoTasksLoaded: Promise<boolean>;
  public inProgressTasksLoaded: Promise<boolean>;
  public inReviewTasksLoaded: Promise<boolean>;
  public doneTasksLoaded: Promise<boolean>;
  public sprintLoaded: Promise<boolean>;

  public taskUserMap: Map<string, User> = new Map<string, User>();

  constructor(private sprintService: SprintService, 
              private userService: UserService, 
              private taskService: TaskService, 
              private router: Router) {}

  ngOnInit() {
    this.initialize();
  }

  private async initialize() {
    await this.loadActiveSprint();
    await this.loadTasks();

    this.sprintLoaded = Promise.resolve(true);
  }

  private async loadActiveSprint() {
    const projectId = localStorage.getItem('selectedProjectId');

    if (!projectId) {
      alert('No project selected');
      return;
    }

    const activeSprint$ = this.sprintService.getActiveSprintForProject(projectId);
    this.activeSprint = await lastValueFrom(activeSprint$);

    if (this.activeSprint.id === '') {
      alert('No active sprint for project');
      this.router.navigate(['/backlog']);
    }
  }

  private async loadTasks() {
    await this.loadToDoTasks();
    await this.loadInProgressTasks();
    await this.loadInReviewTasks();
    await this.loadDoneTasks();
    await this.mapTasksToUsers();

    this.toDoTasksLoaded = Promise.resolve(true);
    this.inProgressTasksLoaded = Promise.resolve(true);
    this.inReviewTasksLoaded = Promise.resolve(true);
    this.doneTasksLoaded = Promise.resolve(true);
  }

  private async loadToDoTasks(): Promise<void> {
    const toDoTasks$ = this.sprintService.getTasksByTaskStatusForSprint(this.activeSprint.id, StatusTypes.ToDo);
    this.toDoTasks = await lastValueFrom(toDoTasks$);
  }

  private async loadInProgressTasks(): Promise<void> {
    const inProgressTasks$ = this.sprintService.getTasksByTaskStatusForSprint(this.activeSprint.id, StatusTypes.InProgress);
    this.inProgressTasks = await lastValueFrom(inProgressTasks$);
  }

  private async loadInReviewTasks(): Promise<void> {
    const inReviewTasks$ = this.sprintService.getTasksByTaskStatusForSprint(this.activeSprint.id, StatusTypes.InReview);
    this.inReviewTasks = await lastValueFrom(inReviewTasks$);
  }

  private async loadDoneTasks(): Promise<void> {
    const doneTasks$ = this.sprintService.getTasksByTaskStatusForSprint(this.activeSprint.id, StatusTypes.Done);
    this.doneTasks = await lastValueFrom(doneTasks$);
  }

  private async mapTasksToUsers() {
    if(this.toDoTasks.length > 0) {
      await this.setTaskUserMap(this.toDoTasks);
    }

    if(this.inProgressTasks.length > 0) {
      await this.setTaskUserMap(this.inProgressTasks);
    }

    if(this.inReviewTasks.length > 0) {
      await this.setTaskUserMap(this.inReviewTasks);
    }

    if(this.doneTasks.length > 0) {
      await this.setTaskUserMap(this.doneTasks);
    }
  }

  private setTaskUserMap(tasks: Task[]) {
    const promises = tasks.map(async task => {
      const user$ = this.userService.get(task.assigneeId);
      const user = await lastValueFrom(user$);
      this.taskUserMap.set(task.id, user);
    })

    return Promise.all(promises);
  }

  public async drop(event: CdkDragDrop<Task[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray<Task>(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      let wasUpdateSuccessful = false;
      let movedTask = new Task();
      let newStatus: StatusTypes = StatusTypes.ToDo;

      switch(event.container.id) {
        case 'toDoList':
          newStatus = StatusTypes.ToDo;
          break;

        case 'inProgressList':
          newStatus = StatusTypes.InProgress;
          break;

        case 'inReviewList':
          newStatus = StatusTypes.InReview;
          break;

        case 'doneList':
          newStatus = StatusTypes.Done;
          break;
        
        default:
          console.log('default');
          break;
      }

      movedTask = event.previousContainer.data[event.previousIndex];

      const modified$ = this.taskService.updateStatus(movedTask.id, newStatus);
      wasUpdateSuccessful = await lastValueFrom(modified$);

      if(wasUpdateSuccessful) {
        transferArrayItem<Task>(
          event.previousContainer.data,
          event.container.data,
          event.previousIndex,
          event.currentIndex,
        );
      } else {
        alert('Task status update failed');
      }
    }
  }

  public releaseSprint() {
    this.sprintService.release(this.activeSprint.id).subscribe(() => {
      this.router.navigate(['/backlog']);
    });
  }

  public getAssigneeFullName(taskId: string): string {
    const user = this.taskUserMap.get(taskId);

    if(user === undefined || user === null) {
      return 'No assignee';
    }

    return user.firstName + ' ' + user.lastName;
  }

  public getAssigneeUsername(taskId: string): string {
    const user = this.taskUserMap.get(taskId);

    if(user === undefined || user === null) {
      return 'No assignee';
    }

    return user.username;
  }
}
