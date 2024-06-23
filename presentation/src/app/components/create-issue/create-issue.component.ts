import { Component, OnInit } from '@angular/core';
import { TaskTypes } from '../../../models/taskTypes';
import { PriorityTypes } from '../../../models/priorityTypes';
import { User } from '../../../models/user';
import { UserService } from '../../services/user/user.service';
import { TaskService } from '../../services/task/task.service';
import { lastValueFrom } from 'rxjs';
import { TaskCreation } from '../../../models/taskCreation';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { CustomValidators } from '../../input-validation/custom-validators';
import { StorageService } from '../../services/storage/storage.service';
import { JwtService } from '../../services/authentication/jwt.service';

@Component({
  selector: 'app-create-issue',
  templateUrl: './create-issue.component.html',
  styleUrl: './create-issue.component.scss'
})
export class CreateIssueComponent implements OnInit{
  public taskCreationForm: FormGroup;

  public taskTypes = this.getEnumValuesAndIndices(TaskTypes);
  public priorityTypes = this.getEnumValuesAndIndices(PriorityTypes);

  public users: User[] = [];
  public today = new Date();

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

    this.taskCreationForm = this.formBuilder.group({
      name: [
        '',
        [
          Validators.required,
          CustomValidators.nameMinimumLengthValidator,
        ],
      ],
      description: [
        '',
        [
          Validators.required,
        ]
      ],
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
        ]
      ],
      assignee: [''],
      storyPoints: [
        null,
        [
          Validators.required,
          Validators.min(0),
        ],
      ]
    });

    this.sprintId = this.activatedRoute.snapshot.paramMap.get('sprintId') ?? '';

    await this.loadAssignees();
  }

  private getEnumValuesAndIndices(enumObj: any): { value: string, index: number }[] {
    return Object.keys(enumObj)
      .filter(key => typeof enumObj[key] === 'number')
      .map(key => ({
        value: key,
        index: enumObj[key]
      }));
  }

  private async loadAssignees(): Promise<void> {
    const assignees$ = this.userService.getAll();
    this.users = await lastValueFrom(assignees$);
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
      priority: this.priority?.value,
      type: this.type?.value,
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
      }
    );
  }

  public onClearClick() {
    this.taskCreationForm.reset();
  }

  public clearForm(form: FormGroupDirective): void {
    form.resetForm();
    this.taskCreationForm.reset();
  }
}
