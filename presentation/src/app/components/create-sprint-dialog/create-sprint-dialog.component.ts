import { Component, Inject } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { SprintCreation } from '../../../models/sprintCreation';
import { FormsModule } from '@angular/forms';
import { MatDatepicker, MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';

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
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './create-sprint-dialog.component.html',
  styleUrl: './create-sprint-dialog.component.scss'
})

export class CreateSprintDialogComponent {
  public today = new Date();

  public sprint: SprintCreation = new SprintCreation();

  constructor(public dialogRef: MatDialogRef<CreateSprintDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: SprintCreation) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  closeDialog(): void {
    if(this.sprint.name !== '' && this.sprint.dueDate !== null && this.sprint.name !== undefined && this.sprint.dueDate !== undefined){
      this.dialogRef.close(this.sprint);
    }
  }
}
