import { Component } from '@angular/core';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss'
})
export class TaskComponent {
  showDetails: boolean = true;
  showPeople: boolean = true;
  showDates: boolean = true;

  public toggleDetails() {
    this.showDetails = !this.showDetails;
  }

  public togglePeople() {
    this.showPeople = !this.showPeople;
  }

  public toggleDates() {
    this.showDates = !this.showDates;
  }
}
