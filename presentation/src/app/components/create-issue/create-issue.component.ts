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
import { StorageService } from '../../services/storage/storage.service';
import { JwtService } from '../../services/authentication/jwt.service';

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

  public usersLoaded: Promise<boolean>;

  public typesControl = new FormControl('Type');
  public priorityControl = new FormControl('Priority');
  public assigneeControl = new FormControl('Assignee');

  private sprintId: string = '';

  constructor(private storageService: StorageService,
              private jwtService: JwtService,
              private userService: UserService, 
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

    this.assigneeControl = new FormControl('', Validators.required);
    this.typesControl = new FormControl('', Validators.required);
    this.priorityControl = new FormControl('', Validators.required);

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
      priority: this.priorityControl,
      type: this.typesControl,
      assignee: this.assigneeControl,
      storyPoints: [
        null,
        [
          Validators.required,
          Validators.min(0),
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

  public get name() {
    return this.taskCreationForm.get('name');
  }

  public get description() {
    return this.taskCreationForm.get('description');
  }

  public get dueDate() {
    return this.taskCreationForm.get('dueDate');
  }

  public get priority() {
    return this.taskCreationForm.get('priority');
  }

  public get type() {
    return this.taskCreationForm.get('type');
  }

  public get assignee() {
    return this.taskCreationForm.get('assignee');
  }

  public get storyPoints() {
    return this.taskCreationForm.get('storyPoints');
  }

  public onSubmit() {
    if(this.taskCreationForm.invalid) {
      return;
    }

    this.createIssue();
  }

  private createIssue() {
    const projectId = localStorage.getItem('selectedProjectId') ?? '';

    if(projectId === null || projectId === ''){
      alert('Please select a project first!');
      this.router.navigate(['/backlog']);
    }

    const jwtToken = this.storageService.getJwtToken();
    const username = this.jwtService.getClaim(jwtToken, 'username');

    let newTask: TaskCreation = {
      name: this.name?.value,
      description: this.description?.value,
      dueDate: this.dueDate?.value,
      priority: 1,
      type: 0,
      storyPoints: this.storyPoints?.value,
      sprintId: '',
      projectId: projectId,
      username: username,
    };

    if(this.sprintId !== ''){
      newTask.sprintId = this.sprintId;
    }

    this.taskService.create(newTask).subscribe(
      (response) => {
        this.router.navigate(['/backlog']);
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
