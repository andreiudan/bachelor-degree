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

  private initialize() {
    this.sprintLoaded = Promise.resolve(this.loadActiveSprint()).then(async () => await this.loadTasks());
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
    try{
      this.toDoTasksLoaded = Promise.resolve(this.loadToDoTasks());
      this.inProgressTasksLoaded = Promise.resolve(this.loadInProgressTasks());
      this.inReviewTasksLoaded = Promise.resolve(this.loadInReviewTasks());
      this.doneTasksLoaded = Promise.resolve(this.loadDoneTasks());
    }
    catch(error) {
      return false;
    }

    return true;
  }

  private async loadToDoTasks(): Promise<boolean> {
    try{
      const toDoTasks$ = this.sprintService.getTasksByTaskStatusForSprint(this.activeSprint.id, StatusTypes.ToDo);
      this.toDoTasks = await lastValueFrom(toDoTasks$);
    }
    catch(error) {
      return false;
    }
    
    return true;
  }

  private async loadInProgressTasks(): Promise<boolean> {
    try{
      const inProgressTasks$ = this.sprintService.getTasksByTaskStatusForSprint(this.activeSprint.id, StatusTypes.InProgress);
      this.inProgressTasks = await lastValueFrom(inProgressTasks$);
    }
    catch(error) {
      return false;
    }
    
    return true;
  }

  private async loadInReviewTasks(): Promise<boolean> {
    try{
      const inReviewTasks$ = this.sprintService.getTasksByTaskStatusForSprint(this.activeSprint.id, StatusTypes.InReview);
      this.inReviewTasks = await lastValueFrom(inReviewTasks$);
    }
    catch(error) {
      return false;
    }
    
    return true;
  }

  private async loadDoneTasks(): Promise<boolean> {
    try{
      const doneTasks$ = this.sprintService.getTasksByTaskStatusForSprint(this.activeSprint.id, StatusTypes.Done);
      this.doneTasks = await lastValueFrom(doneTasks$);
    }
    catch(error) {
      return false;
    }
    
    return true;
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
