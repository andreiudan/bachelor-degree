import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';

interface ICalendarDay {
  date: number;
  name: string;
}

interface IInsetInline {
  start: number;
  end: number;
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

  private calendarEventsDivs: HTMLElement[] = [];
  @ViewChild('events') calendarEvents: ElementRef;

  constructor(private renderer: Renderer2) {}

  ngOnInit(): void {
    this.initializeCurrentUTCDate();
  }

  public onDayClicked(): void {
    this.selectedCalendarType = 'day';
  }

  public onWeekClicked(): void {
    this.selectedCalendarType = 'week';

    this.daysInSelectedWeek = this.getWeekdays();
  }

  private initializeCurrentUTCDate(): void {
    this.currentUTCDate = new Date();
    this.selectedMonthName = this.currentUTCDate.toLocaleString('default', {
      month: 'long',
    });
    this.selectedYear = this.currentUTCDate.getUTCFullYear();
    this.selectedMonth = this.currentUTCDate.getMonth();
    this.selectedDay = this.currentUTCDate.getDate();

    this.selectedWeekStartDay = this.findMondayInWeek();

    this.daysInSelectedWeek = this.getWeekdays();
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

  private findMondayInWeek(): number {
    let mondayDateInSelectedWeek = 1;

    this.selectedWeekStartDay =
      this.selectedDay - (this.selectedDay % 7) - 1;

    for(let i = this.selectedWeekStartDay; i >= 1; i--) {
      if(new Date(this.selectedYear, this.selectedMonth, i).getDay() === 1) {
        mondayDateInSelectedWeek = i;
        break;
      }
    }

    return mondayDateInSelectedWeek;
  }

  private getWeekdays(): ICalendarDay[] {
    const weekDays: ICalendarDay[] = [];
    const daysInSelectedMonth = this.getNrOfDaysInSelectedMonth();
    
    let selectedWeekEndDay = 7;
    let selectedWeekdays: ICalendarDay[] = [];

    if (this.selectedWeekStartDay + 6 <= daysInSelectedMonth) {
       return this.selectedWeekFromSelectedMonth();
    }

    return this.selectedWeekFromTwoMonths(daysInSelectedMonth);
  }

  public onMonthClicked(): void {
    this.selectedCalendarType = 'month';
  }

  public createEventDiv(event: MouseEvent): void {
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

    const eventPreviewDiv = this.renderer.createElement('div');
    this.renderer.addClass(eventPreviewDiv, 'event-preview');

    const button = this.renderer.createElement('button');
    this.renderer.addClass(button, 'event-button');
    this.renderer.appendChild(eventPreviewDiv, button);

    this.renderer.appendChild(eventDiv, eventPreviewDiv);

    this.renderer.setStyle(
      eventDiv,
      'inset-inline',
      `calc(${insetInline.start}%) calc(${insetInline.end}%)`
    );
    this.renderer.setStyle(eventDiv, 'top', `${top}%`);

    this.renderer.listen(eventDiv, 'mousedown', (e: MouseEvent) => {
      e.stopPropagation();
    });

    this.renderer.appendChild(this.calendarEvents.nativeElement, eventDiv);

    this.setBottomPercentageOfEventDiv(eventDiv);

    this.calendarEventsDivs.push(eventDiv);
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
        
        break;

      case 'week':
        this.calculateNextWeek();
        this.daysInSelectedWeek = this.getWeekdays();
        break;

      case 'month':
        this.calculateNextMonth();
        this.selectedDay = 1;
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
  }

  public onPreviousClicked(): void {
    switch (this.selectedCalendarType) {
      case 'day':
        
        break;

      case 'week':
        this.calculatePreviousWeek();
        this.daysInSelectedWeek = this.getWeekdays();
        break;

      case 'month':
        this.calculatePreviousMonth();
        this.selectedDay = 1;
        this.daysInSelectedWeek = this.getWeekdays();
        break;
    }
  }

  private calculatePreviousMonth(): void {
    if(this.selectedMonth === 0) {
      this.selectedMonth = 11;
      this.selectedYear -= 1;
    } 
    else {
      this.selectedMonth -= 1;
    }

    this.selectedMonthName = new Date(
      this.selectedYear,
      this.selectedMonth,
      1
    ).toLocaleString('default', { month: 'long' });
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
  }

  public onTodayClicked(): void {
    this.initializeCurrentUTCDate();
  }
}
