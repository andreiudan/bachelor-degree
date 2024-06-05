import { Component } from '@angular/core';
import { Task } from '../../../models/task';
import { SubTask } from '../../../models/subTask';
import { ProjectService } from '../../services/project/project.service';
import { Project } from '../../../models/project';
import { error } from 'node:console';
import { SprintService } from '../../services/sprint/sprint.service';
import { Sprint } from '../../../models/sprint';
import { lastValueFrom } from 'rxjs';
import { PriorityTypes } from '../../../models/priorityTypes';

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

  oneColCards: OneColCard[] = [
    {title: 'Days left until release', data: 0},
    {title: 'Days left in this sprint', data: 0},
    {title: 'Hours worked on this project', data: 0},
    {title: 'Meetings today?', data: 2},
  ];

  

  constructor(private projectService: ProjectService, private sprintService: SprintService) { }

  ngOnInit() {
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
        
        if(this.projects.length != 0){
          this.selectedProject = this.projects[0];
          this.getSprints().then(() => this.calculateData());
        }

        this.dataLoaded = Promise.resolve(true);
      },
      (error) => {
        this.dataLoaded = Promise.resolve(true);
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
    this.getSprints().then(() => this.calculateData());
  }

  private setStatusTasksNumbers() {

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

  private setplannedStoryPoints() {

  }

  private setCompletedStoryPoints() {

  }

  private calculateData() {
    this.calculateOneCollumCardData();
    // this.setCompletedStoryPoints();
    // this.setplannedStoryPoints();
    // this.setStatusTasksNumbers();
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

  subTasks: SubTask[] = [
    {
      id: "1",
      name: 'Sub Task 1',
      description: 'Description 1',
      isDone: false
    }
  ];

  toDoTasks: Task[] = [
    {
      id: "1",
      name: 'Login API Integration',
      description: 'Description 1',
      priority: 'High',
      type: 'Task',
      labels: 'Label 1',
      status: 'To Do',
      storyPoints: 5,
      assignee: 'Assignee 1',
      author: 'Author 1',
      dueDate: new Date(),
      createdDate: new Date(),
      keyTasks: this.subTasks,
      progress: 28,
    },
    {
      id: "2",
      name: 'Login page',
      description: 'Description 1',
      priority: 'High',
      type: 'Task',
      labels: 'Label 1',
      status: 'To Do',
      storyPoints: 5,
      assignee: 'Assignee 1',
      author: 'Author 1',
      dueDate: new Date(),
      createdDate: new Date(),
      keyTasks: this.subTasks,
      progress: 0,
    }
  ];
}
