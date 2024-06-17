import { Component, OnInit } from '@angular/core';
import { types } from 'util';
import { TaskTypes } from '../../../models/taskTypes';
import { PriorityTypes } from '../../../models/priorityTypes';
import { User } from '../../../models/user';
import { UserService } from '../../services/user/user.service';
import { TaskService } from '../../services/task/task.service';
import { lastValueFrom } from 'rxjs';
import { Task } from '../../../models/task';
import { StatusTypes } from '../../../models/statusTypes';
import { TaskCreation } from '../../../models/taskCreation';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from '../../input-validation/custom-validators';

@Component({
  selector: 'app-create-issue',
  templateUrl: './create-issue.component.html',
  styleUrl: './create-issue.component.scss'
})
export class CreateIssueComponent implements OnInit{
  public taskTypes = Object.values(TaskTypes).filter(value => typeof value === 'string');
  public priorityTypes = Object.values(PriorityTypes).filter(value => typeof value === 'string');
  public users: User[] = [];
  
  public taskCreationForm: FormGroup;
  public newTask: TaskCreation = new TaskCreation();

  public usersLoaded: Promise<boolean>;

  public typesControl = new FormControl('Type');
  public priorityControl = new FormControl('Priority');
  public assigneeControl = new FormControl('Assignee');

  private sprintId: string = '';

  constructor(private userService: UserService, 
              private taskService: TaskService,
              private router: Router,
              private formBuilder: FormBuilder,
              private activatedRoute: ActivatedRoute) 
              {
  }

  public async ngOnInit() {
    if(localStorage.getItem('selectedProjectId') === null || localStorage.getItem('selectedProjectId') === ''){
      alert('Please select a project first!');
      this.router.navigate(['/backlog']);
    }

    this.sprintId = this.activatedRoute.snapshot.paramMap.get('sprintId') ?? '';

    this.usersLoaded = Promise.resolve(this.loadAssignees());

    this.taskCreationForm = this.formBuilder.group({
      name: [
        '',
        [
          Validators.required,
          CustomValidators.nameMinimumLengthValidator,
        ],
      ],
      description: [''],
      dueDate: [
        '',
        [
          Validators.required,
        ],
      ],
      priority: [
        '',
        [
          Validators.required,
        ],
      ],
      type: [
        '',
        [
          Validators.required,
        ],
      ],
      storyPoints: [
        '',
        [
          Validators.required,
        ],
      ]
    });
  }

  private async loadAssignees(): Promise<boolean> {
    try{
      const assignees$ = this.userService.getAll();
      this.users = await lastValueFrom(assignees$);
    }
    catch(error) {
      return false;
    }

    return true;
  }

  trackByFn(index: number, item: any) {
    return item.id;
  }

  public onSubmit() {
    if(this.taskCreationForm.invalid) {
      return;
    }

    this.createIssue(this.newTask);
  }

  private createIssue(task: TaskCreation) {
    if(localStorage.getItem('selectedProjectId') === null || localStorage.getItem('selectedProjectId') === ''){
      alert('Please select a project first!');
      this.router.navigate(['/backlog']);
    }

    if(this.sprintId !== ''){
      task.sprintId = this.sprintId;
    }

    task.projectId = localStorage.getItem('selectedProjectId') ?? '';

    this.taskService.create(task).subscribe(
      (response) => {
        this.router.navigate(['/backlog']);
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
