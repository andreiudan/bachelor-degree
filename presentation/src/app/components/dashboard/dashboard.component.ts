import { Component } from '@angular/core';
import { Task } from '../../../models/task';
import { ProjectService } from '../../services/project/project.service';
import { Project } from '../../../models/project';
import { SprintService } from '../../services/sprint/sprint.service';
import { Sprint } from '../../../models/sprint';
import { lastValueFrom, of } from 'rxjs';
import { PriorityTypes } from '../../../models/priorityTypes';
import { StatusTypes } from '../../../models/statusTypes';

export interface OneColCard{
  data: number;
  title: string;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  public blockerTasks: Task[] = [];
  public tasksNumber: number;

  public lowPriorityTasksNumber: number;
  public mediumPriorityTasksNumber: number;
  public highPriorityTasksNumber: number;
  public blockerPriorityTasksNumber: number;

  public toDoTasksNumber: number;
  public inProgressTasksNumber: number;
  public inReviewTasksNumber: number;
  public doneTasksNumber: number;

  public completedStoryPoints: number;
  public plannedStoryPoints: number;

  private allProjectsSub: any;
  public projects: Project[] = [];

  public selectedProject: Project = new Project();

  public dataLoaded: Promise<boolean>;
  public sprintsFetched: Promise<boolean>;

  oneColCards: OneColCard[] = [];

  constructor(private projectService: ProjectService, private sprintService: SprintService) { }

  ngOnInit() {
    this.initializeData();
    this.getAllProjects();
  }

  ngOnDestroy() {
    this.allProjectsSub.next();
    this.allProjectsSub.complete();
  }

  private getAllProjects() {
    this.allProjectsSub = this.projectService.getAll().subscribe(
      (projects) => {
        this.projects = projects;
        
        if(this.projects.length === 0){
          localStorage.setItem('selectedProjectId', '');
          return;
        }

        if(localStorage.getItem('selectedProjectId') === null || localStorage.getItem('selectedProjectId') === ''){
          this.selectedProject = this.projects[0];
          this.getSprints().then(() => this.calculateData());
          localStorage.setItem('selectedProjectId', this.selectedProject.id);
        }
        else{
          const selectedProject$ = this.projects.find(project => project.id === localStorage.getItem('selectedProjectId'));

          if(selectedProject$ !== undefined){
            this.selectedProject = selectedProject$;
            this.getSprints().then(() => this.calculateData());
          }
        }

        this.dataLoaded = Promise.resolve(true);
      },
      (error) => {
        this.dataLoaded = Promise.resolve(false);
      }
    );
  }

  private async getSprints(): Promise<Sprint[]> {
    let projectSprints: Sprint[] = [];

    const sprints = this.projectService.getSprintsForProject(this.selectedProject.id);
    this.selectedProject.sprints = await lastValueFrom(sprints);

    return projectSprints
  }

  trackByFn(index: number, item: any) {
    return item.id;
  }

  onProjectChange(selectedProject: any) {
    this.selectedProject = selectedProject;
    localStorage.setItem('selectedProjectId', this.selectedProject.id);
    this.initializeData();
    this.getSprints().then(() => this.calculateData());
  }

  private async setToDoTasksNumber() {
    const sprintToDoTasks = this.sprintService.getTasksByTaskStatusForSprint(this.selectedProject.sprints[0].id, StatusTypes.ToDo);
    const toDoTasks = await lastValueFrom(sprintToDoTasks);

    this.toDoTasksNumber = toDoTasks.length;

    toDoTasks.forEach((task: Task) => {
      this.plannedStoryPoints += task.storyPoints;
    });
  }

  private async setInProgressTasksNumber() {
    const sprintInProgressTasks = this.sprintService.getTasksByTaskStatusForSprint(this.selectedProject.sprints[0].id, StatusTypes.InProgress);
    const inProgressTasks = await lastValueFrom(sprintInProgressTasks);

    this.inProgressTasksNumber = inProgressTasks.length;

    inProgressTasks.forEach((task: Task) => {
      this.plannedStoryPoints += task.storyPoints;
    });
  }

  private async setInReviewTasksNumber() {
    const sprintInReviewTasks = this.sprintService.getTasksByTaskStatusForSprint(this.selectedProject.sprints[0].id, StatusTypes.InReview);
    const inReviewTasks = await lastValueFrom(sprintInReviewTasks);

    this.inReviewTasksNumber = inReviewTasks.length;

    inReviewTasks.forEach((task: Task) => {
      this.plannedStoryPoints += task.storyPoints;
    });
  }

  private async setDoneTasksNumber() {
    const sprintDoneTasks = this.sprintService.getTasksByTaskStatusForSprint(this.selectedProject.sprints[0].id, StatusTypes.Done);
    const doneTasks = await lastValueFrom(sprintDoneTasks);

    this.doneTasksNumber = doneTasks.length;

    doneTasks.forEach((task: Task) => {
      this.completedStoryPoints += task.storyPoints;
      this.plannedStoryPoints += task.storyPoints;
    });
  }

  private setStatusTasksNumbers() {
    this.setDoneTasksNumber();
    this.setToDoTasksNumber();
    this.setInProgressTasksNumber();
    this.setInReviewTasksNumber();
  }

  private async setBlockerTasksNumber() {
    const sprintBlockerTasks = this.sprintService.getTasksByTaskPriorityForSprint(this.selectedProject.sprints[0].id, PriorityTypes.Blocker);
    this.blockerTasks = await lastValueFrom(sprintBlockerTasks);

    this.blockerPriorityTasksNumber = this.blockerTasks.length;
  }

  private async setHighPriorityTasksNumber() {
    const sprintHighPriorityTasks = this.sprintService.getTasksByTaskPriorityForSprint(this.selectedProject.sprints[0].id, PriorityTypes.High);
    const highPriorityTasks = await lastValueFrom(sprintHighPriorityTasks);

    this.highPriorityTasksNumber = highPriorityTasks.length;
  }

  private async setMediumPriorityTasksNumber() {
    const sprintMediumPriorityTasks = this.sprintService.getTasksByTaskPriorityForSprint(this.selectedProject.sprints[0].id, PriorityTypes.Medium);
    const mediumPriorityTasks = await lastValueFrom(sprintMediumPriorityTasks);

    this.mediumPriorityTasksNumber = mediumPriorityTasks.length;
  }

  private async setLowPriorityTasksNumber() {
    const sprintLowPriorityTasks = this.sprintService.getTasksByTaskPriorityForSprint(this.selectedProject.sprints[0].id, PriorityTypes.Low);
    const lowPriorityTasks = await lastValueFrom(sprintLowPriorityTasks);

    this.lowPriorityTasksNumber = lowPriorityTasks.length;
  }

  private setPriorityTasksNumbers() {
    this.setBlockerTasksNumber();
    this.setHighPriorityTasksNumber();
    this.setMediumPriorityTasksNumber();
    this.setLowPriorityTasksNumber();
  }

  private initializeData() {
    this.blockerTasks = [];
    
    this.blockerPriorityTasksNumber = 0;
    this.highPriorityTasksNumber = 0;
    this.mediumPriorityTasksNumber = 0;
    this.lowPriorityTasksNumber = 0;
    
    this.toDoTasksNumber = 0;
    this.inProgressTasksNumber = 0;
    this.inReviewTasksNumber = 0;
    this.doneTasksNumber = 0;

    this.completedStoryPoints = 0;
    this.plannedStoryPoints = 0

    this.oneColCards = [
      {title: 'Days left until release', data: 0},
      {title: 'Days left in this sprint', data: 0},
      {title: 'Hours worked on this project', data: 0},
      {title: 'Meetings today?', data: 0},
    ]
  }

  private calculateData() {
    this.calculateOneCollumCardData();
    this.setStatusTasksNumbers();
    this.setPriorityTasksNumbers();
  }

  private calculateDaysLeftUnitlRelease(): number {
    let daysLeftUntilRelease = 0;

    const diff = Math.abs(this.selectedProject.dueDate.getTime() - new Date().getTime());
    daysLeftUntilRelease = Math.ceil(diff / (1000 * 3600 * 24));

    return daysLeftUntilRelease;
  }

  private calculateDaysLeftInSprint(): number {
    let daysLeftInSprint = 0;

    const diff = Math.abs(this.selectedProject.sprints[0].dueDate.getTime() - new Date().getTime());
    daysLeftInSprint = Math.ceil(diff / (1000 * 3600 * 24));

    return daysLeftInSprint;
  }

  private calculateHoursWorkedOnProject(): number {
    let hoursWorkedOnProject = 0;

    return hoursWorkedOnProject;
  }

  private calculateOneCollumCardData() {  
    this.oneColCards = [
      {title: 'Days left until release', data: this.calculateDaysLeftUnitlRelease()},
      {title: 'Days left in this sprint', data: this.calculateDaysLeftInSprint()},
      {title: 'Hours worked on this project', data: this.calculateHoursWorkedOnProject()},
      {title: 'Meetings today?', data: 2},
    ];
  }
}
