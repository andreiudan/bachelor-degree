import { Component } from '@angular/core';
import { Task } from '../../../models/task';
import { SubTask } from '../../../models/subTask';
import { TaskService } from '../../services/task/task.service';
import { StatusTypes } from '../../../models/statusTypes';
import { Sprint } from '../../../models/sprint';
import { SprintService } from '../../services/sprint/sprint.service';
import { ProjectService } from '../../services/project/project.service';
import { lastValueFrom } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { CreateSprintDialogComponent } from '../create-sprint-dialog/create-sprint-dialog.component';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

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

  constructor(private sprintService: SprintService, private projectService: ProjectService, private taskService: TaskService) {}

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
  }

  private async loadTasks() {
    await this.loadToDoTasks();
    await this.loadInProgressTasks();
    await this.loadInReviewTasks();
    await this.loadDoneTasks();

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

  public async drop(event: CdkDragDrop<Task[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray<Task>(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      let wasUpdateSuccessful = false;
      let movedTask = new Task();
      let newStatus: StatusTypes = StatusTypes.ToDo;

      switch(event.container.id) {
        case 'toDoList':
          movedTask = event.previousContainer.data[event.currentIndex];
          newStatus = StatusTypes.ToDo;
          break;

        case 'inProgressList':
          movedTask = event.previousContainer.data[event.currentIndex];
          newStatus = StatusTypes.InProgress;
          break;

        case 'inReviewList':
          movedTask = event.previousContainer.data[event.currentIndex];
          newStatus = StatusTypes.InReview;
          break;

        case 'doneList':
          movedTask = event.previousContainer.data[event.currentIndex];
          newStatus = StatusTypes.Done;
          break;
        
        default:
          console.log('default');
          break;
      }

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
}
