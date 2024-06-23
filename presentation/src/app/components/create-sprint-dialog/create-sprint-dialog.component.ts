import { Component, Inject, OnInit } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { SprintCreation } from '../../../models/sprintCreation';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDatepicker, MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { CustomValidators } from '../../input-validation/custom-validators';


@Component({
  selector: 'app-create-sprint-dialog',
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
  templateUrl: './create-sprint-dialog.component.html',
  styleUrl: './create-sprint-dialog.component.scss'
})

export class CreateSprintDialogComponent implements OnInit{
  public createSprintForm: FormGroup;
  public today = new Date();

  public sprint: SprintCreation;

  constructor(public dialogRef: MatDialogRef<CreateSprintDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: SprintCreation, 
    private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.createSprintForm = this.formBuilder.group({
      sprintName: [
        '',
        [
          Validators.required,
          CustomValidators.nameMinimumLengthValidator,
        ]
      ],
      dueDate: [
        '',
        [
          Validators.required
        ]
      ]
    });
  }

  public get sprintName() {
    return this.createSprintForm.get('sprintName');
  }

  public get dueDate() {
    return this.createSprintForm.get('dueDate');
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  public onSubmit() {
    if(this.createSprintForm.invalid){
      return;
    }

    this.sprint = new SprintCreation();{
      this.sprint.name = this.sprintName?.value;
      this.sprint.dueDate = this.dueDate?.value;
    }
    
    this.dialogRef.close(this.sprint);
  }
}
