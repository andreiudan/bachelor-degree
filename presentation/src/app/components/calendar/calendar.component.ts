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
  public readonly hoursSize = 85;
  private readonly scrollBarSize = 17;

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
  private calendarEventDetailsDiv: HTMLElement | null = null;
  @ViewChild('events') calendarEvents: ElementRef;
  @ViewChild('calendarEventDetails') calendarEventDetails: ElementRef;
  @ViewChild('calendar') calendar: ElementRef;

  private documentClickListener: () => void;
  private documentContextMenuListener: () => void;
  private documentMouseDownListener: () => void;

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

    const eventPreviewDiv = this.renderer.createElement('div');
    this.renderer.addClass(eventPreviewDiv, 'event-preview');
    
    this.renderer.appendChild(eventPreviewDiv, this.createCalendarEventButton());

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

  private createCalendarEventButton(): HTMLElement {
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

    this.renderer.listen(button, 'dblclick', (event: MouseEvent) => 
      this.onCalendarEventDoubleClick(event, event.target as HTMLElement));

    return button;
  }

  private onCalendarEventDoubleClick(event: MouseEvent, eventElement: HTMLElement): void {
    this.createCalendarEventDetailsDiv(event, eventElement);

    event.stopPropagation();
    event.preventDefault();
      
    this.documentClickListener = this.renderer.listen('document', 'click', this.onDocumentClick.bind(this));
    this.documentContextMenuListener = this.renderer.listen('document', 'contextmenu', this.onDocumentClick.bind(this));
    this.documentMouseDownListener = this.renderer.listen('document', 'mousedown', this.onDocumentClick.bind(this));

    this.renderer.addClass(this.calendar.nativeElement, 'disable-scroll');
  }

  private createCalendarEventDetailsDiv(event: MouseEvent, eventElement: HTMLElement): void {
    this.calendarEventDetailsDiv = this.renderer.createElement('div');
    this.renderer.addClass(this.calendarEventDetailsDiv, 'calendar-event-details');
  
    const calendarEventDetailsTitle = this.renderer.createText('Event Details');
    this.renderer.appendChild(this.calendarEventDetailsDiv, calendarEventDetailsTitle);

    const alignmentAttributes = this.getCalendarEventDetailsDivAlignmentAttributes(eventElement);

    this.renderer.setAttribute(this.calendarEventDetailsDiv, 'style', alignmentAttributes);

    this.renderer.appendChild(this.calendarEventDetails.nativeElement, this.calendarEventDetailsDiv);
  }

  private getCalendarEventDetailsDivAlignmentAttributes(eventElement: HTMLElement): string{
    const width = 247;
    const height = 247;
    const margin = 6;
    const padding = 12;
    const buttonPadding = 4;
    let top = 200;

    const eventElementRect = eventElement.getBoundingClientRect();
    const calendarEventsRect = this.calendarEvents.nativeElement.getBoundingClientRect();
    const calendarRect = this.calendar.nativeElement.getBoundingClientRect();

    const topOffset = (height + 2 * margin + 2 * padding  - eventElementRect.height) / 2;
    top = eventElementRect.top - topOffset;

    if(top + height + margin >= calendarRect.bottom){
      top = calendarRect.bottom - height - 2 * margin - 2 * padding;
    }

    const sizeAttributes = `--width: ${width}px; 
      --height:${height}px; 
      --margin: ${margin}px; 
      --top: ${top}px;
      --padding: ${padding}px;`;

    const sidenavOffset = calendarRect.left;

    let eventElementLeft: number | null = eventElementRect.right - sidenavOffset + buttonPadding;
    let eventElementRight: number | null = null;

    let alignmentAttribute = `--left: ${eventElementLeft}px;`;

    const distanceToRight = calendarEventsRect.right - eventElementRect.right;
    const elementWidth = eventElementRect.right - eventElementRect.left;

    if(eventElementLeft + width > calendarEventsRect.width){
      eventElementRight = distanceToRight + elementWidth + this.scrollBarSize + buttonPadding;
      eventElementLeft = null;

      alignmentAttribute = `--right: ${eventElementRight}px;`;
    }

    return sizeAttributes + alignmentAttribute;
  }

  private onDocumentClick(event: MouseEvent): void {
    if (this.calendarEventDetailsDiv && !this.calendarEventDetailsDiv.contains(event.target as Node)) {
      this.renderer.removeChild(this.calendarEventDetails.nativeElement, this.calendarEventDetailsDiv);
      this.calendarEventDetailsDiv = null;

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
