import { Component, ComponentRef, ElementRef, Renderer2, ViewChild, ViewContainerRef } from '@angular/core';
import { CalendarEventDetailsComponent } from '../calendar-event-details/calendar-event-details.component';
import { DynamicHostDirective } from '../../directives/dynamic-host/dynamic-host.directive';
import { EventEmitter } from 'node:stream';

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

  constructor(private renderer: Renderer2) {}

  ngOnInit(): void {
    this.initializeCurrentUTCDate();
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

  public createCalendarEventDiv(event: MouseEvent): void {
    if (event.button !== 0) {
      return;
    }

    const calendarEventsRect =
      this.calendarEvents.nativeElement.getBoundingClientRect();
    const mouseX = event.clientX - calendarEventsRect.left;
    const mouseY = event.clientY - calendarEventsRect.top;

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
    this.renderer.setStyle(eventDiv, 'top', `${top}%`);

    this.calendarEventsDivs.push({
      eventElement: eventDiv,
      eventElementButton: eventButton.button, 
      clickListener: this.renderer.listen(eventDiv, 'mousedown', (e: MouseEvent) => {
        e.stopPropagation();
      }),
      dblClickListener: eventButton.dbClickListener
    });

    this.renderer.appendChild(this.calendarEvents.nativeElement, eventDiv);

    this.setBottomPercentageOfEventDiv(eventDiv);
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

  public onCalendarEventDelete(): void {
    const divToRemove = this.calendarEventsDivs.filter(
        (div) => div.eventElementButton === this.calendarEventDetailsComponent.eventElement
    );
    this.renderer.removeChild(this.calendarEvents.nativeElement, divToRemove[0].eventElement);

    divToRemove[0].clickListener;
    divToRemove[0].clickListener = () => {};
    divToRemove[0].dblClickListener;
    divToRemove[0].dblClickListener = () => {};
    
    const divToRemoveIndex = this.calendarEventsDivs.indexOf(divToRemove[0]);
    this.calendarEventsDivs.splice(divToRemoveIndex, 1);

    this.onCalendarEventDetailsClose();
}

  public onCalendarEventModified(event: any): void {
    const newTimeInterval: { hourFrom: string, hourTo: string } = event;
    
    const hourFrom = Number.parseInt(newTimeInterval.hourFrom.split(':')[0]);
    const minutesFrom = Number.parseInt(newTimeInterval.hourFrom.split(':')[1]);

    const hourTo = Number.parseInt(newTimeInterval.hourTo.split(':')[0]);
    const minutesTo = Number.parseInt(newTimeInterval.hourTo.split(':')[1]);
    
    const divToModify = this.calendarEventsDivs.filter(
      (div) => div.eventElementButton === this.calendarEventDetailsComponent.eventElement
    );

    this.setNewCalendarEventPositions(divToModify[0].eventElement, hourFrom, minutesFrom, hourTo, minutesTo);
  }

  private setNewCalendarEventPositions(eventElement: HTMLElement, hourFrom: number, minutesFrom: number, hourTo: number, minutesTo: number): void {
    const calendarEventsRect = this.calendarEvents.nativeElement.getBoundingClientRect();

    hourFrom = (hourFrom * 100) / 24;
    minutesFrom = (minutesFrom * 100) / (60 * 24);

    const top = hourFrom + minutesFrom;

    hourTo = (hourTo / 24 ) * 100;
    minutesTo = (minutesTo / (24 * 60)) * 100;

    const bottom = 100 - (hourTo + minutesTo);

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

    const topPercentage = (mouseY / calendarEventsHeight) * 100;
    const topSegment = (topPercentage * fiveMinuesSegments) / maxTopPercentage;
    const top = Math.floor(topSegment) * oneFiveMinuteSegmentPercentage;

    return top;
  }

  private setBottomPercentageOfEventDiv(eventDiv: any): void {
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

        this.renderer.setStyle(eventDiv, 'bottom', `${bottom}%`);
      }
    );

    const mouseUpListener = this.renderer.listen(
      this.calendarEvents.nativeElement,
      'mouseup',
      () => {
        mouseMoveListener();
        mouseUpListener();
      }
    );
  }

  public onNextClicked(): void {
    switch (this.selectedCalendarType) {
      case 'day':
        this.calculateNextDay();
        break;

      case 'week':
        this.calculateNextWeek();
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
