import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { ProjectCreation } from '../../../models/projectCreation';

@Component({
  selector: 'app-create-project-dialog',
  standalone: true,
  imports: [MatCardModule, MatFormFieldModule, MatInputModule, MatButton,
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogTitle,
    FormsModule],
  templateUrl: './create-project-dialog.component.html',
  styleUrl: './create-project-dialog.component.scss'
})
export class CreateProjectDialogComponent {
  public project: ProjectCreation = new ProjectCreation();

  constructor(public dialogRef: MatDialogRef<CreateProjectDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ProjectCreation) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  closeDialog(): void {
    if(this.project.name !== '') {
      this.dialogRef.close(this.project);
    }
  }
}
