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

  constructor(private sprintService: SprintService, private projectService: ProjectService) {}

  ngOnInit() {
    this.initialize();
  }

  private initialize() {
    this.sprintLoaded = Promise.resolve(this.loadActiveSprint()).then(async () => await this.loadTasks());
  }

  private async loadActiveSprint() {
    const activeSprint$ = this.sprintService.getActiveSprintForProject("2B50DAC7-EFFF-4E90-9080-BC6CE3058CC5");
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
}
