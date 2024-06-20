import { Component } from '@angular/core';
import { Task } from '../../../models/task';
import { SubTask } from '../../../models/subTask';
import { Sprint } from '../../../models/sprint';
import { BacklogService } from '../../services/backlog/backlog.service';
import { SprintService } from '../../services/sprint/sprint.service';
import { Project } from '../../../models/project';
import { ProjectService } from '../../services/project/project.service';
import { lastValueFrom } from 'rxjs';
import { TaskService } from '../../services/task/task.service';
import { TaskCreation } from '../../../models/taskCreation';
import { MatDialog } from '@angular/material/dialog';
import { CreateSprintDialogComponent } from '../create-sprint-dialog/create-sprint-dialog.component';
import { SprintCreation } from '../../../models/sprintCreation';
import { Router } from '@angular/router';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

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

  constructor(private backlogService: BacklogService, 
              private sprintService: SprintService, 
              private projectService: ProjectService,
              private dialog: MatDialog,
              private router: Router) {}

  ngOnInit() {
    this.initialize();
  }

  private initialize() {
    this.projectsLoaded = Promise.resolve(this.loadProjects()).then(async () => await this.loadData());
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
    try{
      this.activeSprintLoaded = Promise.resolve(this.setActiveSprint());
      this.inactiveSprintsLoaded = Promise.resolve(this.setInactiveSprints());
      this.backlogTasksLoaded = Promise.resolve(this.setBacklogTasks());
    }
    catch{
      return false;
    }

    return true;
  }


  private async setActiveSprint() {
    try{
      const activeSprint$ = this.sprintService.getActiveSprintForProject(this.selectedProject.id);
      this.activeSprint = await lastValueFrom(activeSprint$);
    }
    catch{
      return false;
    }

    return true;
  }

  private async setInactiveSprints() {
    try{
      const inactiveSprints$ = this.sprintService.getInactiveSprintsForProject(this.selectedProject.id);
      this.inactiveSprints = await lastValueFrom(inactiveSprints$);
    }
    catch(e){
      console.log(e);
      return false;
    }

    return true;
  }

  private async setBacklogTasks() {
    try{
      const backlogTasks$ = this.backlogService.getBacklogTasksForProject(this.selectedProject.id);
      this.backlogTasks = await lastValueFrom(backlogTasks$);
    }
    catch{
      return false;
    }

    return true;
  }

  public changeDateTimeToDate(date: Date) {
    return new Date(date).toLocaleDateString();
  }

  public openCreateSprintDialog() {
    const dialogRef = this.dialog.open(CreateSprintDialogComponent, {
      height: '55%',
      width: '40%',
      data: {sprint: new SprintCreation()}
    });

    dialogRef.afterClosed().subscribe(result => {
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

  public drop(event: CdkDragDrop<Task[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray<Task>(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem<Task>(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );

      switch(event.container.id) {
        case 'activeSprintTasksList':
          console.log('move to active sprint');
          break;

        case 'backlogTasksList':
          console.log('move to backlog');
          break;
        
        default:
          if(this.inactiveSprints.filter(sprint => sprint.id === event.container.id).length > 0){
            console.log('move to inactive sprint');
            break;
          }
          else{
            console.log('default');
            break;
          }
      }
    }
  }
}
