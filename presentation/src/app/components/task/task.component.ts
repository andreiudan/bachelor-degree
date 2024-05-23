import { animate, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss',
  animations: [
    trigger('panelInOut', [
        transition('void => *', [
            style({transform: 'translateY(-100%)'}),
            animate(800)
        ]),
        transition('* => void', [
            animate(800, style({transform: 'translateY(-100%)'}))
        ])
    ])
]
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
