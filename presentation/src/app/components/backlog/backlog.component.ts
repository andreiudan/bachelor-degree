import { Component } from '@angular/core';
import { Task } from '../../../models/task';
import { Sprint } from '../../../models/sprint';
import { BacklogService } from '../../services/backlog/backlog.service';
import { SprintService } from '../../services/sprint/sprint.service';
import { Project } from '../../../models/project';
import { ProjectService } from '../../services/project/project.service';
import { Observable, lastValueFrom } from 'rxjs';
import { TaskService } from '../../services/task/task.service';
import { MatDialog } from '@angular/material/dialog';
import { CreateSprintDialogComponent } from '../create-sprint-dialog/create-sprint-dialog.component';
import { SprintCreation } from '../../../models/sprintCreation';
import { Router } from '@angular/router';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { UserService } from '../../services/user/user.service';
import { User } from '../../../models/user';
import { SubTask } from '../../../models/subTask';
import { ActivateSprintAlertDialogComponent } from '../activate-sprint-alert-dialog/activate-sprint-alert-dialog.component';

@Component({
  selector: 'app-backlog',
  templateUrl: './backlog.component.html',
  styleUrl: './backlog.component.scss'
})
export class BacklogComponent {
  public activeSprint: Sprint = new Sprint();
  public inactiveSprints: Sprint[] = [];
  public backlogTasks: Task[] = [];
  
  public projects: Project[] = [];
  public selectedProject: Project = new Project();

  public projectsLoaded: Promise<boolean>;
  public activeSprintLoaded: Promise<boolean>;
  public inactiveSprintsLoaded: Promise<boolean>;
  public backlogTasksLoaded: Promise<boolean>;

  private taskUserMap: Map<string, User> = new Map<string, User>();

  constructor(private backlogService: BacklogService, 
              private sprintService: SprintService, 
              private projectService: ProjectService,
              private tasksService: TaskService,
              private userService: UserService,
              private dialog: MatDialog,
              private router: Router) {}

  ngOnInit() {
    this.initialize();
  }

  private async initialize() {
    await this.loadProjects();
    await this.loadData();

    this.projectsLoaded = Promise.resolve(true);
  }

  private async loadProjects() {
    const projects$ = this.projectService.getAll();
    this.projects = await lastValueFrom(projects$); 

    if(this.projects.length === 0){
      localStorage.setItem('selectedProjectId', '');
      return;
    }

    if(localStorage.getItem('selectedProjectId') === null || localStorage.getItem('selectedProjectId') === ''){
      this.selectedProject = this.projects[0];
      localStorage.setItem('selectedProjectId', this.selectedProject.id);
    }
    else{
      const selectedProject$ = this.projects.find(project => project.id === localStorage.getItem('selectedProjectId'));

      if(selectedProject$ !== undefined){
        this.selectedProject = selectedProject$;
      }
    }
  }

  trackByFn(index: number, item: any) {
    return item.id;
  }

  onProjectChange(selectedProject: any) {
    this.selectedProject = selectedProject;
    localStorage.setItem('selectedProjectId', this.selectedProject.id);
    this.loadData();
  }

  private async loadData() {
    await this.setActiveSprint();
    await this.setInactiveSprints();
    await this.setBacklogTasks();
    await this.mapTasksToUser();
    await this.setTasksProgress();

    this.activeSprintLoaded = Promise.resolve(true);
    this.inactiveSprintsLoaded = Promise.resolve(true);
    this.backlogTasksLoaded = Promise.resolve(true);
  }

  private async setTasksProgress() {
    if (this.activeSprint !== undefined && this.activeSprint.tasks !== undefined && this.activeSprint.tasks.length > 0) {
      await this.calculateTasksProgress(this.activeSprint.tasks);
    }
  
    for (const sprint of this.inactiveSprints) {
      if (sprint.tasks !== undefined && sprint.tasks.length > 0) {
        await this.calculateTasksProgress(sprint.tasks);
      }
    }
  }

  private async calculateTasksProgress(tasks: Task[]) {
    const promises = tasks.map(async task => {
      const subtasks$ = this.tasksService.getSubtasks(task.id);
      const subtasks: SubTask[] = await lastValueFrom(subtasks$);

      const completedSubtasks = subtasks.filter(subtask => subtask.done).length;
      const totalSubtasks = subtasks.length;

      task.progress = (completedSubtasks / totalSubtasks) * 100;

      if(Number.isNaN(task.progress)){
        task.progress = 0;
      }
    });

    await Promise.all(promises);
  }

  private async setActiveSprint() {
    const activeSprint$ = this.sprintService.getActiveSprintForProject(this.selectedProject.id);
    this.activeSprint = await lastValueFrom(activeSprint$);
  }

  private async setInactiveSprints() {
    const inactiveSprints$ = this.sprintService.getInactiveSprintsForProject(this.selectedProject.id);
    this.inactiveSprints = await lastValueFrom(inactiveSprints$);
  }

  private async setBacklogTasks() {
    const backlogTasks$ = this.backlogService.getBacklogTasksForProject(this.selectedProject.id);
    this.backlogTasks = await lastValueFrom(backlogTasks$);
  }

  private async mapTasksToUser() {
    if (this.activeSprint !== undefined && this.activeSprint.tasks !== undefined && this.activeSprint.tasks.length > 0) {
      await this.setTaskUser(this.activeSprint.tasks);
    }
  
    for (const sprint of this.inactiveSprints) {
      if (sprint.tasks !== undefined && sprint.tasks.length > 0) {
        await this.setTaskUser(sprint.tasks);
      }
    }
  }

  private async setTaskUser(tasks: Task[]) {
    const promises = tasks.map(async task => {
      if (!this.taskUserMap.has(task.id)) {
        const user$ = this.userService.get(task.assigneeId);
        const user: User = await lastValueFrom(user$);
        this.taskUserMap.set(task.id, user);
      }
    });

    await Promise.all(promises);
  }

  public getUserFullName(taskId: string): string {
    if(this.taskUserMap.has(taskId)){
      const user = this.taskUserMap.get(taskId);

      if(user?.firstName === undefined || user?.lastName === undefined){
        return 'No assignee';
      }

      return user?.firstName + ' ' + user?.lastName;
    }

    return 'No assignee';
  }

  getUsername(taskId: string): string {
    if(this.taskUserMap.has(taskId)){
      const user = this.taskUserMap.get(taskId);
      return user?.username ? user.username : 'No assignee';
    }

    return 'No assignee';
  }

  public changeDateTimeToDate(date: Date) {
    return new Date(date).toLocaleDateString();
  }

  public openCreateSprintDialog() {
    const dialogRef = this.dialog.open(CreateSprintDialogComponent, {
      height: '58%',
      width: '40%',
      data: {sprint: new SprintCreation()}
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result === undefined){
        return;
      }
      
      this.createSprint(result);
    });
  }

  private createSprint(newSprint: SprintCreation) {
    newSprint.projectId = this.selectedProject.id;

    this.sprintService.create(newSprint).subscribe(() => {
      this.ngOnInit();
    });
  }

  public onCreateIssueClick(sprintId: string): void {
    this.router.navigate(['/createIssue', sprintId]);
  }

  public async drop(event: CdkDragDrop<Task[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray<Task>(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      let wasMoved = false;
      let movedTask$: Observable<any> = new Observable();

      const taskToBeMovedId = event.previousContainer.data[event.previousIndex].id;

      switch(event.container.id) {
        case 'activeSprintTasksList':
          movedTask$ = this.tasksService.changeSprint(taskToBeMovedId, this.activeSprint.id);
          break;

        case 'backlogTasksList':
          movedTask$ = this.tasksService.moveToBacklog(taskToBeMovedId);
          break;
        
        default:
          if(this.inactiveSprints.filter(sprint => sprint.id === event.container.id).length > 0){
            movedTask$ = this.tasksService.changeSprint(taskToBeMovedId, event.container.id);
            break;
          }
          else{
            console.log('default');
            break;
          }
      }

      wasMoved = await lastValueFrom(movedTask$);

      if(wasMoved){
        transferArrayItem<Task>(
          event.previousContainer.data,
          event.container.data,
          event.previousIndex,
          event.currentIndex,
        );
      } else {
        alert("Task could not be moved.")
      }
    }
  }

  public startSprint(sprintId: string) {
    if(this.activeSprint.id !== ''){
      const dialogRef = this.dialog.open(ActivateSprintAlertDialogComponent);

      dialogRef.afterClosed().subscribe(result => {
        if(result === false || result === undefined){
          return;
        }
        
        this.sprintService.release(this.activeSprint.id).subscribe(() => {
          this.sprintService.activate(sprintId).subscribe(() => {
            this.ngOnInit();
          });
        });

        return;
      });
    }
    else{
      this.sprintService.activate(sprintId).subscribe(() => {
        this.ngOnInit();
      });
    }
  }
}
