import { Component, Inject } from '@angular/core';
import { CreateSprintDialogComponent } from '../create-sprint-dialog/create-sprint-dialog.component';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-subtask-dialog',
  standalone: true,
  imports: [MatCardModule, MatFormFieldModule, MatInputModule, MatButton,
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogTitle,
    FormsModule],
  templateUrl: './add-subtask-dialog.component.html',
  styleUrl: './add-subtask-dialog.component.scss'
})
export class AddSubtaskDialogComponent {
  public subtaskName: string = '';

  constructor(public dialogRef: MatDialogRef<CreateSprintDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  closeDialog(): void {
    if (this.subtaskName !== '') {
      this.dialogRef.close(this.subtaskName);
    }
  }
}
