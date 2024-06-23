import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProjectCreation } from '../../../models/projectCreation';
import { MatDatepicker, MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { CustomValidators } from '../../input-validation/custom-validators';

@Component({
  selector: 'app-create-project-dialog',
  standalone: true,
  imports: [MatCardModule, MatFormFieldModule, MatInputModule, MatButton,
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogTitle,
    FormsModule,
    MatDatepickerModule,
    MatDatepicker,
    ReactiveFormsModule,
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './create-project-dialog.component.html',
  styleUrl: './create-project-dialog.component.scss'
})
export class CreateProjectDialogComponent implements OnInit{
  public project: ProjectCreation;
  public createProjectForm: FormGroup;
  public today = new Date();
  
  constructor(public dialogRef: MatDialogRef<CreateProjectDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ProjectCreation,
    private formBuilder: FormBuilder) { }

  public ngOnInit() {
    this.createProjectForm = this.formBuilder.group({
      projectName: [
        '',
        [
          Validators.required,
          CustomValidators.nameMinimumLengthValidator,
        ]
      ],
      description: [''],
      dueDate: [
        '',
        [
          Validators.required
        ]
      ]
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  public get projectName() {
    return this.createProjectForm.get('projectName');
  }

  public get description() {
    return this.createProjectForm.get('description');
  }

  public get dueDate() {
    return this.createProjectForm.get('dueDate');
  }

  public onSubmit(): void {
    if(this.createProjectForm.invalid) {
      return;
    }

    this.project = new ProjectCreation(); {
      this.project.name = this.createProjectForm.value.projectName,
      this.project.description = this.createProjectForm.value.projectDescription,
      this.project.dueDate = this.createProjectForm.value.dueDate
    }

    this.dialogRef.close(this.project);
  }
}
