import { Component, ComponentRef, ElementRef, Renderer2, ViewChild, ViewContainerRef } from '@angular/core';
import { CalendarEventDetailsComponent } from '../calendar-event-details/calendar-event-details.component';
import { DynamicHostDirective } from '../../directives/dynamic-host/dynamic-host.directive';
import { TimesheetService } from '../../services/timesheet/timesheet.service';
import { StorageService } from '../../services/storage/storage.service';
import { JwtService } from '../../services/authentication/jwt.service';
import { Timesheet } from '../../../models/timesheet';
import { TimesheetCreation } from '../../../models/timesheetCreation';
import { lastValueFrom } from 'rxjs';

interface ICalendarDay {
  date: number;
  name: string;
}

interface IInsetInline {
  start: number;
  end: number;
}

interface ICalendarElement {
  eventElement: HTMLElement;
  eventElementButton: HTMLElement;
  clickListener: () => void;
  dblClickListener: () => void;
  timesheetId: string;
}

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss',
})
export class CalendarComponent {
  public currentUTCDate = new Date();
  public currentUTCYear = this.currentUTCDate.getUTCFullYear();
  public currentUTCMonth = this.currentUTCDate.getUTCMonth();
  public currentUTCDay = this.currentUTCDate.getUTCDate();

  public selectedYear: number;
  public selectedMonth: number;
  public selectedMonthName: string;
  public daysInSelectedWeek: ICalendarDay[] = [];
  public selectedDay: number;
  public selectedWeekStartDay: number;
  public selectedCalendarType = 'week';

  public hours = new Array(24).fill(0);

  private calendarEventsDivs: ICalendarElement[] = [];

  @ViewChild(DynamicHostDirective, {static: true}) dynamicHost: DynamicHostDirective;
  @ViewChild('events') calendarEvents: ElementRef;
  @ViewChild('calendarEventDetails') calendarEventDetails: ElementRef;
  @ViewChild('calendar') calendar: ElementRef;

  private documentClickListener: () => void;
  private documentContextMenuListener: () => void;
  private documentMouseDownListener: () => void;

  private calendarEventDetailsComponent: CalendarEventDetailsComponent;
  private viewContainerRef: ViewContainerRef;

  constructor(private renderer: Renderer2, 
              private timesheetService: TimesheetService,
              private storageService: StorageService,
              private jwtService: JwtService) {}

  ngOnInit(): void {
    this.initializeCurrentUTCDate();
    Promise.resolve(this.loadTimesheets());
  }

  private async loadTimesheets() {
    return new Promise(async () => {
      const jwtToken = this.storageService.getJwtToken();
      const username = this.jwtService.getClaim(jwtToken, 'username');
      const startDate = new Date(this.selectedYear, this.selectedMonth, this.daysInSelectedWeek[0].date).toDateString();
      const endDate = new Date(this.selectedYear, this.selectedMonth, this.daysInSelectedWeek[6].date).toDateString();

      this.clearCalendar();

      const timesheets$ = this.timesheetService.getAllForUserByDateInterval(startDate, endDate, username);
      let timesheets: Timesheet[] = await lastValueFrom(timesheets$);

      timesheets.forEach(timesheet => {
        this.createCalendarEventByKnownDates(timesheet);
      })
    });
  }

  private clearCalendar(){
    if(this.viewContainerRef){
      this.onCalendarEventDetailsClose();
    }

    const elements = this.calendarEventsDivs;

    elements.forEach(element => {
      const divToRemove = this.calendarEventsDivs.filter(
        (div) => div.eventElementButton === element.eventElementButton
      );

      this.renderer.removeChild(this.calendarEvents.nativeElement, divToRemove[0].eventElement);
    });

    this.calendarEventsDivs = [];
  }

  private getInsetInlineByDate(date: string): IInsetInline {
    const calendarEventsRect = this.calendarEvents.nativeElement.getBoundingClientRect();
    var eventDivWidthAsPercentage = 100 / 7;
    const dateAsDate: Date = new Date(date);
    const dateDay = dateAsDate.getDate();

    const dayInCalendar = this.daysInSelectedWeek.findIndex(value => value.date === dateDay) + 1;

    const insetInlineStart = (dayInCalendar * eventDivWidthAsPercentage) - eventDivWidthAsPercentage;
    const insetInlineEnd = 100 - (dayInCalendar * eventDivWidthAsPercentage);

    return {
      start: insetInlineStart,
      end: insetInlineEnd,
    };
  }

  private getBottomPercentageFromTime(endTime: string) {
    let hourTo = Number.parseInt(endTime.split(':')[0]);
    let minutesTo = Number.parseInt(endTime.split(':')[1]);

    hourTo = (hourTo / 24 ) * 100;
    minutesTo = (minutesTo / (24 * 60)) * 100;

    const bottom = 100 - (hourTo + minutesTo);

    return bottom;
  }

  private getTopPercentageFromTime(startTime: string) {
    let hourFrom = Number.parseInt(startTime.split(':')[0]);
    let minutesFrom = Number.parseInt(startTime.split(':')[1]);

    hourFrom = (hourFrom * 100) / 24;
    minutesFrom = (minutesFrom * 100) / (60 * 24);

    const top = hourFrom + minutesFrom;

    return top;
  }

  private async createCalendarEventByKnownDates(timesheet: Timesheet) {
    const calendarEventsRect =
      this.calendarEvents.nativeElement.getBoundingClientRect();

    const eventDiv = this.renderer.createElement('div');
    this.renderer.addClass(eventDiv, 'event');

    var insetInline = this.getInsetInlineByDate(timesheet.date);

    var top = this.getTopPercentageFromTime(timesheet.startTime);

    if(top < 0) {
      top = 0;
    }

    const bottom = this.getBottomPercentageFromTime(timesheet.endTime);

    const eventPreviewDiv = this.renderer.createElement('div');
    this.renderer.addClass(eventPreviewDiv, 'event-preview');
    
    let eventButton = this.createCalendarEventButton();

    this.renderer.appendChild(eventPreviewDiv, eventButton.button);

    this.renderer.appendChild(eventDiv, eventPreviewDiv);

    this.renderer.setStyle(
      eventDiv,
      'inset-inline',
      `calc(${insetInline.start}%) calc(${insetInline.end}%)`
    );
    this.renderer.setStyle(eventDiv, 'top', `calc(${top}%)`);
    this.renderer.setStyle(eventDiv, 'bottom', `calc(${bottom}%)`)

    this.renderer.appendChild(this.calendarEvents.nativeElement, eventDiv);

    this.calendarEventsDivs.push({
      eventElement: eventDiv,
      eventElementButton: eventButton.button, 
      clickListener: this.renderer.listen(eventDiv, 'mousedown', (e: MouseEvent) => {
        e.stopPropagation();
      }),
      dblClickListener: eventButton.dbClickListener,
      timesheetId: timesheet.id,
    });
  }

  public onDayClicked(): void {
    this.selectedCalendarType = 'day';
  }

  public onWeekClicked(): void {
    this.selectedCalendarType = 'week';
  }

  public onMonthClicked(): void {
    this.selectedCalendarType = 'month';
  }

  private initializeCurrentUTCDate(): void {
    this.currentUTCDate = new Date();
    this.selectedMonthName = this.currentUTCDate.toLocaleString('default', {
      month: 'long',
    });
    this.selectedYear = this.currentUTCDate.getUTCFullYear();
    this.selectedMonth = this.currentUTCDate.getMonth();
    this.selectedDay = this.currentUTCDate.getDate();

    this.setSelectedWeekStartDay();
  }

  private getNrOfDaysInSelectedMonth(): number {
    return new Date(
      this.selectedYear,
      this.selectedMonth + 1,
      0
    ).getDate();
  }

  private selectedWeekFromSelectedMonth(): ICalendarDay[] {
    const weekDays: ICalendarDay[] = [];
    const selectedWeekEndDay = this.selectedWeekStartDay + 6;

    for (
      let day = this.selectedWeekStartDay;
      day <= selectedWeekEndDay;
      day++
    ) {
      weekDays.push({
        date: day,
        name: new Date(
          this.selectedYear,
          this.selectedMonth,
          day
        ).toLocaleString('default', { weekday: 'short' }),
      });
    }

    return weekDays;
  }

  private selectedWeekFromTwoMonths(daysInSelectedMonth: number): ICalendarDay[] {
    const weekDays: ICalendarDay[] = [];

    for (
      let day = this.selectedWeekStartDay;
      day <= daysInSelectedMonth;
      day++
    ) {
      weekDays.push({
        date: day,
        name: new Date(
          this.selectedYear,
          this.selectedMonth,
          day
        ).toLocaleString('default', { weekday: 'short' }),
      });
    }

    if (weekDays.length < 7) {
      const daysFromNextMonth = 7 - weekDays.length;
      for (let day = 1; day <= daysFromNextMonth; day++) {
        weekDays.push({
          date: day,
          name: new Date(
            this.selectedYear,
            this.selectedMonth + 1,
            day
          ).toLocaleString('default', { weekday: 'short' }),
        });
      }
    }

    return weekDays;
  }

  private setSelectedWeekStartDay(): void {
    if(new Date(this.selectedYear, this.selectedMonth, this.selectedDay).getDay() === 1) {
      this.selectedWeekStartDay = this.selectedDay;
      this.daysInSelectedWeek = this.getWeekdays();

      return;
    }

    if(this.selectedDay - 6 >= 1) {
      for(let i = this.selectedDay - 6; i <= this.selectedDay; i++) {
        if(new Date(this.selectedYear, this.selectedMonth, i).getDay() === 1) {
          this.selectedWeekStartDay = i;
          this.daysInSelectedWeek = this.getWeekdays();

          return;
        }
      }
    } else {
      this.selectedMonth -= 1;
      const daysInPreviousMonth = this.getNrOfDaysInSelectedMonth();
      let remainingDays = 7 - this.selectedDay;

      for(let i = daysInPreviousMonth - remainingDays; i <= daysInPreviousMonth; i++) {
        if(new Date(this.selectedYear, this.selectedMonth, i).getDay() === 1) {
          this.selectedWeekStartDay = i;
          this.daysInSelectedWeek = this.getWeekdays();

          this.selectedMonth += 1;
          return;
        }
      }

      remainingDays = this.selectedDay % 7;

      for(let i = this.selectedDay - remainingDays; i <= this.selectedDay; i++) {
        if(new Date(this.selectedYear, this.selectedMonth, i).getDay() === 1) {
          this.selectedWeekStartDay = i;
          this.daysInSelectedWeek = this.getWeekdays();

          this.selectedMonth += 1;
          return;
        }
      }
    }
  }

  private getWeekdays(): ICalendarDay[] {
    const weekDays: ICalendarDay[] = [];
    const daysInSelectedMonth = this.getNrOfDaysInSelectedMonth();

    if (this.selectedWeekStartDay + 6 <= daysInSelectedMonth) {
       return this.selectedWeekFromSelectedMonth();
    }

    return this.selectedWeekFromTwoMonths(daysInSelectedMonth);
  }

  private async createCalendarEventByMousePosition(xPosition: number, yPosition: number) : Promise<void> {
    const calendarEventsRect =
    this.calendarEvents.nativeElement.getBoundingClientRect();
    const mouseX = xPosition - calendarEventsRect.left;
    const mouseY = yPosition - calendarEventsRect.top;

    const eventDiv = this.renderer.createElement('div');
    this.renderer.addClass(eventDiv, 'event');

    var insetInline = this.getInsetInlineOfEventDiv(
      mouseX,
      calendarEventsRect.width
    );

    var top = this.getTopPercentageOfEventDiv(
      mouseY,
      calendarEventsRect.height
    );

    if(top < 0) {
      top = 0;
    }

    const eventPreviewDiv = this.renderer.createElement('div');
    this.renderer.addClass(eventPreviewDiv, 'event-preview');
    
    let eventButton = this.createCalendarEventButton();

    this.renderer.appendChild(eventPreviewDiv, eventButton.button);

    this.renderer.appendChild(eventDiv, eventPreviewDiv);

    this.renderer.setStyle(
      eventDiv,
      'inset-inline',
      `calc(${insetInline.start}%) calc(${insetInline.end}%)`
    );
    this.renderer.setStyle(eventDiv, 'top', `calc(${top}%)`);

    this.renderer.appendChild(this.calendarEvents.nativeElement, eventDiv);

    const bottom = await this.getBottomPercentageOfEventDiv(eventDiv);

    let newTimesheetId = await this.addNewTimesheet(top, bottom, insetInline);

    newTimesheetId = newTimesheetId.replace(/"/g, '');

    this.calendarEventsDivs.push({
      eventElement: eventDiv,
      eventElementButton: eventButton.button, 
      clickListener: this.renderer.listen(eventDiv, 'mousedown', (e: MouseEvent) => {
        e.stopPropagation();
      }),
      dblClickListener: eventButton.dbClickListener,
      timesheetId: newTimesheetId,
    });

    if(newTimesheetId === '' || undefined){
      this.deleteCalendarEventElement(eventDiv);
    }
  }

  public onCalendarEventClick(event: MouseEvent) {
    if (event.button !== 0) {
      return;
    }

    this.createCalendarEventByMousePosition(event.clientX, event.clientY);
  }

  private createCalendarEventButton(): {button: HTMLElement, dbClickListener: () => void} {
    const button = this.renderer.createElement('button');
    this.renderer.addClass(button, 'event-button');

    const buttonTitleDiv = this.renderer.createElement('div');
    this.renderer.addClass(buttonTitleDiv, 'event-button-title');
    const buttonTitle = this.renderer.createText('Event title');
    this.renderer.appendChild(buttonTitleDiv, buttonTitle);

    const buttonSubTitleDiv = this.renderer.createElement('div');
    this.renderer.addClass(buttonSubTitleDiv, 'event-button-subtitle');
    const buttonSubTitle = this.renderer.createText('Event subtitle');
    this.renderer.appendChild(buttonSubTitleDiv, buttonSubTitle);

    this.renderer.appendChild(button, buttonTitleDiv);
    this.renderer.appendChild(button, buttonSubTitleDiv);

    const listener = this.renderer.listen(button, 'dblclick', (event: MouseEvent) => 
      this.onCalendarEventDoubleClick(event, event.target as HTMLElement));

    return {button: button, dbClickListener: listener};
  }

  private onCalendarEventDoubleClick(event: MouseEvent, eventElement: HTMLElement): void {
    this.viewContainerRef = this.dynamicHost.viewContainerRef;
    this.viewContainerRef.clear();

    const componentRef = this.viewContainerRef.createComponent(CalendarEventDetailsComponent);
    this.calendarEventDetailsComponent = componentRef.instance;

    componentRef.instance.onClose.subscribe(() => this.onCalendarEventDetailsClose());
    componentRef.instance.onDelete.subscribe(() => this.onCalendarEventDelete());
    componentRef.instance.onSave.subscribe((event) => this.onCalendarEventModified(event));

    this.calendarEventDetailsComponent.initialize(eventElement, this.calendar, this.calendarEvents);

    this.renderer.addClass(this.calendar.nativeElement, 'disable-scroll');

    event.stopPropagation();
    event.preventDefault();

    this.removeDocumentListeners();

    this.documentClickListener = this.renderer.listen('document', 'click', this.onDocumentClick.bind(this));
    this.documentContextMenuListener = this.renderer.listen('document', 'contextmenu', this.onDocumentClick.bind(this));
    this.documentMouseDownListener = this.renderer.listen('document', 'mousedown', this.onDocumentClick.bind(this));
  }

  private onDocumentClick(event: MouseEvent): void {
    const clickedInside = this.calendarEventDetailsComponent.detailsRoot.nativeElement.contains(event.target as Node);
      if (!clickedInside) {
        this.viewContainerRef.clear();

        if (this.documentClickListener) {
          this.documentClickListener();
        }
        
        this.renderer.removeClass(this.calendar.nativeElement, 'disable-scroll');
      }
  }

  private removeDocumentListeners(): void {
    if (this.documentClickListener) {
      this.documentClickListener();
      this.documentClickListener = () => {};
    }
    if (this.documentContextMenuListener) {
      this.documentContextMenuListener();
      this.documentContextMenuListener = () => {};
    }
    if (this.documentMouseDownListener) {
      this.documentMouseDownListener();
      this.documentMouseDownListener = () => {};
    }
  }

  ngOnDestroy(): void {
    this.removeDocumentListeners();

    if (this.calendar) {
      this.renderer.removeClass(this.calendar.nativeElement, 'disable-scroll');
    }

    for(let calendarEventDiv of this.calendarEventsDivs) {
      calendarEventDiv.clickListener;
      calendarEventDiv.clickListener = () => {};
      calendarEventDiv.dblClickListener;
      calendarEventDiv.dblClickListener = () => {};

      this.renderer.removeChild(this.calendarEvents.nativeElement, calendarEventDiv.eventElement);
    }

    this.calendarEventsDivs = [];
  }

  private async addNewTimesheet(top: number, bottom: number, insetInline: IInsetInline): Promise<string> {
    const jwtToken = this.storageService.getJwtToken();
    const username = this.jwtService.getClaim(jwtToken, 'username');
    let timesheetId = '';

    const calculatedDate = this.calculateDateFromInsetInline(insetInline);

    const timesheet: TimesheetCreation = {
      username: username,
      date: calculatedDate.toDateString(),
      startTime: this.calculateTimeFromPositions(top),
      endTime: this.calculateTimeFromPositions(100 - bottom),
    };

    const createTimesheet = this.timesheetService.create(timesheet);
    timesheetId = await lastValueFrom(createTimesheet);

    return timesheetId;
  }

  private calculateDateFromInsetInline(insetInline: IInsetInline): Date{
    const dateDayIndex = Math.floor((insetInline.start * 7) / 100);

    const dateDay = this.daysInSelectedWeek[dateDayIndex].date;

    return new Date(this.selectedYear, this.selectedMonth, dateDay);
  }

  private calculateTimeFromPositions(position: number) {
    const calendarEventsRect = this.calendarEvents.nativeElement.getBoundingClientRect();

    const positionAsPx = (position / 100) * calendarEventsRect.height;

    const time = (positionAsPx * 24) / calendarEventsRect.height;
    const hour = Math.floor(time);
    const minutes = Math.floor((time - hour) * 60);

    return `${hour < 10 ? '0' : ''}${hour}:${minutes < 10 ? '0' : ''}${minutes}`;
  } //floating point precision problem

  public onCalendarEventDelete(): void {
    this.deleteCalendarEventElement(this.calendarEventDetailsComponent.eventElement);
  }

  private deleteCalendarEventElement(eventElement: HTMLElement) {
    const divToRemove = this.calendarEventsDivs.filter(
      (div) => div.eventElementButton === this.calendarEventDetailsComponent.eventElement
    );
    this.renderer.removeChild(this.calendarEvents.nativeElement, divToRemove[0].eventElement);

    this.timesheetService.delete(divToRemove[0].timesheetId).subscribe(
      () => {
        divToRemove[0].clickListener;
        divToRemove[0].clickListener = () => {};
        divToRemove[0].dblClickListener;
        divToRemove[0].dblClickListener = () => {};
        
        const divToRemoveIndex = this.calendarEventsDivs.indexOf(divToRemove[0]);
        this.calendarEventsDivs.splice(divToRemoveIndex, 1);

        this.onCalendarEventDetailsClose();
      },
      error => {
        console.log(error);
      }
    );
  }

  public onCalendarEventModified(event: any): void {
    const newTimeInterval: { hourFrom: string, hourTo: string } = event;
    
    const divToModify = this.calendarEventsDivs.filter(
      (div) => div.eventElementButton === this.calendarEventDetailsComponent.eventElement
    );

    const timesheet: Timesheet = {
      id: divToModify[0].timesheetId,
      username: this.jwtService.getClaim(this.storageService.getJwtToken(), 'username'),
      date: new Date(this.selectedYear, this.selectedMonth, this.selectedDay).toDateString(),
      startTime: newTimeInterval.hourFrom,
      endTime: newTimeInterval.hourTo,
    }

    this.timesheetService.update(timesheet).subscribe(
      () => {
        this.setNewCalendarEventPositions(divToModify[0].eventElement, newTimeInterval.hourFrom, newTimeInterval.hourTo);
      },
      error => {
        console.log(error);
      }
    );
  }

  private setNewCalendarEventPositions(eventElement: HTMLElement, hourFrom: string, hourTo: string): void {
    const calendarEventsRect = this.calendarEvents.nativeElement.getBoundingClientRect();

    const top = this.getTopPercentageFromTime(hourFrom);
    const bottom = this.getBottomPercentageFromTime(hourTo)

    this.renderer.setStyle(eventElement, 'top', `${top}%`);
    this.renderer.setStyle(eventElement, 'bottom', `${bottom}%`);

    this.onCalendarEventDetailsClose();
  }

  public onCalendarEventDetailsClose(): void {
    this.viewContainerRef.clear();

    this.removeDocumentListeners();

    this.renderer.removeClass(this.calendar.nativeElement, 'disable-scroll');
  } 

  private getInsetInlineOfEventDiv(
    mouseX: number,
    calendarEventsWidth: number
  ): IInsetInline {
    var eventDivWidth = calendarEventsWidth / 7;
    var eventDivWidthAsPercentage = 100 / 7;

    var insetInlineStart =
      Math.floor(mouseX / eventDivWidth) * eventDivWidthAsPercentage;
    var insetInlineEnd =
      Math.floor(7 - mouseX / eventDivWidth) * eventDivWidthAsPercentage;

    return {
      start: insetInlineStart,
      end: insetInlineEnd,
    };
  }

  private getTopPercentageOfEventDiv(
    mouseY: number,
    calendarEventsHeight: number
  ): number {
    const fiveMinuesSegments = 24 * 12;
    const oneFiveMinuteSegmentPercentage = 100 / fiveMinuesSegments;
    const maxTopPercentage =
      fiveMinuesSegments * oneFiveMinuteSegmentPercentage;

    const topPercentage = (mouseY * 100) / calendarEventsHeight;
    const topSegment = (topPercentage * fiveMinuesSegments) / maxTopPercentage;
    const top = Math.floor(topSegment) * oneFiveMinuteSegmentPercentage;

    return top;
  }

  private async getBottomPercentageOfEventDiv(eventDiv: any): Promise<number> {
    return new Promise<number>((resolve) => {
      let finalBottom = 0; 

      const mouseMoveListener = this.renderer.listen(
        this.calendarEvents.nativeElement,
        'mousemove',
        (moveEvent: MouseEvent) => {
          const calendarEventsRectMove =
            this.calendarEvents.nativeElement.getBoundingClientRect();
          const fiveMinuesSegments = 24 * 12;
          const oneFiveMinuteSegmentPercentage = 100 / fiveMinuesSegments;
          const maxBottomPercentage =
            fiveMinuesSegments * oneFiveMinuteSegmentPercentage;

          const mouseYMove = moveEvent.clientY - calendarEventsRectMove.top;

          const bottomPercentage =
            ((calendarEventsRectMove.height - mouseYMove) /
              calendarEventsRectMove.height) *
            100;
          const bottomSegment =
            (bottomPercentage * fiveMinuesSegments) / maxBottomPercentage;

          const bottom =
            Math.floor(bottomSegment) * oneFiveMinuteSegmentPercentage;

            finalBottom = bottom;
            this.renderer.setStyle(eventDiv, 'bottom', `${bottom}%`);
        }
      );

      const mouseUpListener = this.renderer.listen(
        this.calendarEvents.nativeElement,
        'mouseup',
        () => {
          mouseMoveListener();
          mouseUpListener();
          resolve(finalBottom)
        }
      );
    });
  }

  public onNextClicked(): void {
    switch (this.selectedCalendarType) {
      case 'day':
        this.calculateNextDay();
        break;

      case 'week':
        this.calculateNextWeek();
        Promise.resolve(this.loadTimesheets());
        break;

      case 'month':
        this.calculateNextMonth();
        break;
    }
  }

  private calculateNextMonth(): void {
    this.selectedMonth += 1;

    if(this.selectedMonth > 11) {
      this.selectedMonth = 0;
      this.selectedYear += 1;
    }

    this.selectedMonthName = new Date(
      this.selectedYear,
      this.selectedMonth,
      1
    ).toLocaleString('default', { month: 'long' });
    
    this.selectedDay = 1;
    this.setSelectedWeekStartDay();
  }

  private calculateNextWeek(): void {
    if(this.selectedWeekStartDay + 7 <= this.getNrOfDaysInSelectedMonth()) {
      this.selectedWeekStartDay += 7;
    } 
    else {
      const remainingDays = 7 - (this.getNrOfDaysInSelectedMonth() - this.selectedWeekStartDay);

      if(remainingDays <= 0) {
        this.selectedWeekStartDay = 1;
      }
      else {
        this.selectedWeekStartDay = remainingDays;
      }

      this.selectedMonth += 1;

      if(this.selectedMonth > 11) {
        this.selectedMonth = 0;
        this.selectedYear += 1;
      }

      this.selectedMonthName = new Date(
        this.selectedYear,
        this.selectedMonth,
        1
      ).toLocaleString('default', { month: 'long' });
    }

    this.daysInSelectedWeek = this.getWeekdays();
  }

  private calculateNextDay(): void {
    let previousDay = this.selectedDay;

    if(this.selectedDay + 1 <= this.getNrOfDaysInSelectedMonth()) {
      this.selectedDay += 1;
    }
    else {
      this.selectedDay = 1;
      this.selectedMonth += 1;

      if(this.selectedMonth > 11) {
        this.selectedMonth = 0;
        this.selectedYear += 1;
      }

      this.selectedMonthName = new Date(
        this.selectedYear,
        this.selectedMonth,
        1
      ).toLocaleString('default', { month: 'long' });
    }

    if(previousDay === this.daysInSelectedWeek[6].date){
      this.setSelectedWeekStartDay();
    }
  }

  public onPreviousClicked(): void {
    switch (this.selectedCalendarType) {
      case 'day':
        this.calculatePreviousDay();
        break;

      case 'week':
        this.calculatePreviousWeek();
        Promise.resolve(this.loadTimesheets());
        break;

      case 'month':
        this.calculatePreviousMonth();
        break;
    }
  }

  private calculatePreviousMonth(): void {
    this.selectedMonth -= 1;

    if(this.selectedMonth < 0) {
      this.selectedMonth = 11;
      this.selectedYear -= 1;
    }

    this.selectedMonthName = new Date(
      this.selectedYear,
      this.selectedMonth,
      1
    ).toLocaleString('default', { month: 'long' });

    this.selectedDay = 1;
    this.setSelectedWeekStartDay();
  }

  private calculatePreviousWeek(): void {
    if(this.selectedWeekStartDay - 7 >= 1) {
      this.selectedWeekStartDay -= 7;
    }
    else {
      const remainingDays = 7 - this.selectedWeekStartDay;
      this.selectedMonth -= 1;

      if(this.selectedMonth < 0) {
        this.selectedMonth = 11;
        this.selectedYear -= 1;
      }

      this.selectedMonthName = new Date(
        this.selectedYear,
        this.selectedMonth,
        1
      ).toLocaleString('default', { month: 'long' });

      const daysInSelectedMonth = this.getNrOfDaysInSelectedMonth();
      this.selectedWeekStartDay = daysInSelectedMonth - remainingDays;
    }

    this.daysInSelectedWeek = this.getWeekdays();
  }

  private calculatePreviousDay(): void {
    let previousDay = this.selectedDay;

    if(this.selectedDay - 1 >= 1) {
      this.selectedDay -= 1;
    }
    else {
      this.selectedMonth -= 1;

      if(this.selectedMonth < 0) {
        this.selectedMonth = 11;
        this.selectedYear -= 1;
      }

      this.selectedMonthName = new Date(
        this.selectedYear,
        this.selectedMonth,
        1
      ).toLocaleString('default', { month: 'long' });

      this.selectedDay = this.getNrOfDaysInSelectedMonth();
    }

    if(previousDay === this.daysInSelectedWeek[0].date){
      this.setSelectedWeekStartDay();
    }
  }

  public onTodayClicked(): void {
    this.initializeCurrentUTCDate();
  }
}
