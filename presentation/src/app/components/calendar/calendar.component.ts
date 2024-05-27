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
  private currentUTCDate = new Date();
  public currentUTCMonthName = this.currentUTCDate.toLocaleString('default', {
    month: 'long',
  });
  public currentUTCYear = this.currentUTCDate.getUTCFullYear();
  public currentUTCMonth = this.currentUTCDate.getMonth();
  public currentUTCDay = this.currentUTCDate.getDate();

  public selectedCalendarType = 'week';
  public daysInSelectedWeek = this.getCurrentUTCWeekdays();
  public hours = new Array(24).fill(0);

  private calendarEventsDivs: HTMLElement[] = [];
  @ViewChild('events') calendarEvents: ElementRef;

  constructor(private renderer: Renderer2) {}

  public onDayClicked(): void {
    this.selectedCalendarType = 'day';
  }

  public onWeekClicked(): void {
    this.selectedCalendarType = 'week';

    this.daysInSelectedWeek = this.getCurrentUTCWeekdays();
  }

  private getCurrentUTCWeekdays(): ICalendarDay[] {
    let daysInCurrentUTCMonth = new Date(
      this.currentUTCYear,
      this.currentUTCDate.getMonth() + 1,
      0
    ).getDate();
    let firstDayOfCurrentUTCWeek =
      this.currentUTCDay - (this.currentUTCDay % 7) - 1;
    let lastDayOfCurrentUTCWeek = 7;
    let currentUTCWeek: ICalendarDay[] = [];

    if (firstDayOfCurrentUTCWeek + 6 <= daysInCurrentUTCMonth) {
      lastDayOfCurrentUTCWeek = firstDayOfCurrentUTCWeek + 6;

      for (
        let day = firstDayOfCurrentUTCWeek;
        day <= lastDayOfCurrentUTCWeek;
        day++
      ) {
        currentUTCWeek.push({
          date: day,
          name: new Date(
            this.currentUTCYear,
            this.currentUTCMonth,
            day
          ).toLocaleString('default', { weekday: 'short' }),
        });
      }
    } else {
      for (
        let day = firstDayOfCurrentUTCWeek;
        day <= daysInCurrentUTCMonth;
        day++
      ) {
        currentUTCWeek.push({
          date: day,
          name: new Date(
            this.currentUTCYear,
            this.currentUTCMonth,
            day
          ).toLocaleString('default', { weekday: 'short' }),
        });
      }

      if (currentUTCWeek.length < 7) {
        const nextMonthDays = 7 - currentUTCWeek.length;
        for (let day = 1; day <= nextMonthDays; day++) {
          currentUTCWeek.push({
            date: day,
            name: new Date(
              this.currentUTCYear,
              this.currentUTCMonth + 1,
              day
            ).toLocaleString('default', { weekday: 'short' }),
          });
        }
      }
    }

    return currentUTCWeek;
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
}
