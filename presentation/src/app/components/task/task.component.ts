import { animate, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';
import { Task } from '../../../models/task';
import { SubTask } from '../../../models/subTask';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from '../../services/task/task.service';
import { lastValueFrom } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { AddSubtaskDialogComponent } from '../add-subtask-dialog/add-subtask-dialog.component';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss',
  animations: [
    trigger('panelInOut', [
        transition('void => *', [
            style({transform: 'translateY(-100%)'}),
            animate(800)
        ]),
        transition('* => void', [
            animate(800, style({transform: 'translateY(-100%)'}))
        ])
    ])
]
})
export class TaskComponent {
  public showDetails: boolean = true;
  public showPeople: boolean = true;
  public showDates: boolean = true;

  public taskId: any;
  public task: Task = new Task();
  private taskIdSub: any;

  public sprintName: string = "";
  public projectName: string = "";

  public taskLoaded: Promise<boolean>;

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private taskService: TaskService, private dialog: MatDialog) {}

  ngOnInit() {
    this.taskIdSub = this.activatedRoute.params.subscribe(params => {
      this.taskId = params['taskId'];}
    );

    this.taskLoaded = Promise.resolve(this.getTask());
  }

  ngOnDestroy() {
    this.taskIdSub.unsubscribe();
  }

  private async getTask() {
    const task$ = this.taskService.get(this.taskId);
    const task = await lastValueFrom(task$)

    if (task === undefined) {
      this.taskNotFound();
    }
    
    this.task = task;

    this.setParentData();
    return true;
  }

  private setParentData() {
    this.setProjectName();
    this.setSprintName();
  }

  private async setProjectName() {
    const projectName = this.taskService.getProjectName(this.taskId).subscribe(
      project => {
        this.projectName = project;
      }
    );
  }

  private async setSprintName() {
    const sprintName = this.taskService.getSprintName(this.taskId);
    this.sprintName = await lastValueFrom(sprintName);

    this.sprintName = "A";
  }

  private taskNotFound(): void{
    alert('Task not found');
    this.router.navigate(['/dashboard']);
  }
  
  public toggleDetails() {
    this.showDetails = !this.showDetails;
  }

  public togglePeople() {
    this.showPeople = !this.showPeople;
  }

  public toggleDates() {
    this.showDates = !this.showDates;
  }

  public onAddSubtaskClick(): void {
    const dialogRef = this.dialog.open(AddSubtaskDialogComponent, {
      height: '25%',
      width: '35%',
      data: {subtaskName: ''}
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result === undefined || result === ''){
        return;
      }

      this.addSubtask(result);
    });
  }

  private addSubtask(subtaskName: string) {
    this.taskService.addNewSubtask(this.taskId, subtaskName).subscribe((result) => {
      this.task.subtasks.push(result);
    });
  }

  public onSubtaskStatusChanged(subtask: SubTask) {
    this.taskService.updateSubtask(this.taskId, subtask).subscribe();
  }
}
