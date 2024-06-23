import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CustomValidators } from '../../input-validation/custom-validators';

@Component({
  selector: 'app-add-subtask-dialog',
  standalone: true,
  imports: [MatCardModule, MatFormFieldModule, MatInputModule, MatButton,
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogTitle,
    FormsModule,
    ReactiveFormsModule,],
  templateUrl: './add-subtask-dialog.component.html',
  styleUrl: './add-subtask-dialog.component.scss'
})
export class AddSubtaskDialogComponent implements OnInit{
  public createSubtaskForm: FormGroup;

  constructor(public dialogRef: MatDialogRef<AddSubtaskDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.createSubtaskForm = this.formBuilder.group({
      subtaskName: [
        '',
        [
          Validators.required,
          CustomValidators.nameMinimumLengthValidator
        ]
      ]
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  public get subtaskName() {
    return this.createSubtaskForm.get('subtaskName');
  }

  public onSubmit(): void {
    if(this.createSubtaskForm.invalid){
      return;
    }

    this.dialogRef.close(this.subtaskName?.value);
  }
}
