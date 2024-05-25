import { Component } from '@angular/core';

interface ICalendarDay {
  date: number;
  name: string;
}

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss'
})
export class CalendarComponent {
  private currentUTCDate = new Date();
  public currentUTCMonthName = this.currentUTCDate.toLocaleString('default', { month: 'long' });
  public currentUTCYear = this.currentUTCDate.getUTCFullYear();
  public currentUTCMonth = this.currentUTCDate.getMonth();
  public currentUTCDay = this.currentUTCDate.getDate();
  public selectedCalendarType = 'week';
  public daysInSelectedWeek = this.getCurrentUTCWeekdays();
  public hours = new Array(24).fill(0);

  constructor() { }

  public onDayClicked(): void {
    this.selectedCalendarType = 'day';
  }

  public onWeekClicked(): void {
    this.selectedCalendarType = 'week';
    
    this.daysInSelectedWeek = this.getCurrentUTCWeekdays();
  }

  private getCurrentUTCWeekdays(): ICalendarDay[] {
    let daysInCurrentUTCMonth = new Date(this.currentUTCYear, this.currentUTCDate.getMonth() + 1, 0).getDate();
    let firstDayOfCurrentUTCWeek = this.currentUTCDay - (this.currentUTCDay % 7) - 1;
    let lastDayOfCurrentUTCWeek = 7;
    let currentUTCWeek: ICalendarDay[] = [];    

    if(firstDayOfCurrentUTCWeek + 6 <= daysInCurrentUTCMonth) {
      lastDayOfCurrentUTCWeek = firstDayOfCurrentUTCWeek + 6;

      for(let day = firstDayOfCurrentUTCWeek; day <= lastDayOfCurrentUTCWeek; day++) {
        currentUTCWeek.push({
          date: day,
          name: new Date(this.currentUTCYear, this.currentUTCMonth, day).toLocaleString('default', { weekday: 'short' })
        });
      }
    }
    else {
      for(let day = firstDayOfCurrentUTCWeek; day <= daysInCurrentUTCMonth; day++) {
        currentUTCWeek.push({
          date: day,
          name: new Date(this.currentUTCYear, this.currentUTCMonth, day).toLocaleString('default', { weekday: 'short' })
        });
      }

      if(currentUTCWeek.length < 7) {
        for(let day = 1; day <= 7 - currentUTCWeek.length; day++) {
          currentUTCWeek.push({
            date: day,
            name: new Date(this.currentUTCYear, this.currentUTCMonth + 1, day).toLocaleString('default', { weekday: 'short' })
          });
        }
      }
    }

    return currentUTCWeek;
  }

  public onMonthClicked(): void {
    this.selectedCalendarType = 'month';
  }
}
