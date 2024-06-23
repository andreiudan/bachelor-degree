import { Component, Inject } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';

@Component({
  selector: 'app-activate-sprint-alert-dialog',
  standalone: true,
  imports: [ MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogTitle,
    MatButton,],
  templateUrl: './activate-sprint-alert-dialog.component.html',
  styleUrl: './activate-sprint-alert-dialog.component.scss'
})
export class ActivateSprintAlertDialogComponent {


  constructor(public dialogRef: MatDialogRef<ActivateSprintAlertDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: boolean) {}

  public close() {
    this.dialogRef.close(false);
  }

  public activateSprint() {
    this.dialogRef.close(true);
  }
}
