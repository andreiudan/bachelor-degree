import { Component, ElementRef } from '@angular/core';

@Component({
  selector: 'app-calendar-event',
  standalone: true,
  templateUrl: './calendar-event.component.html',
  styleUrl: './calendar-event.component.scss'
})
export class CalendarEventComponent {
  public insetInlineStart = 0;
  public insetInlineEnd = 0;
  public top = 0;
  public bottom = 0;
  private calendarEvents: ElementRef;

  public initialize(mouseEvent: MouseEvent, calendarEvents: ElementRef): void {
    this.calendarEvents = calendarEvents;

    const calendarEventsRect =
      this.calendarEvents.nativeElement.getBoundingClientRect();
    const mouseX = mouseEvent.clientX - calendarEventsRect.left;
    const mouseY = mouseEvent.clientY - calendarEventsRect.top;

    this.setInsetInline(mouseX, calendarEventsRect.width);

    this.setTop(mouseY,calendarEventsRect.height);

    // this.calendarEventsDivs.push({
    //   eventElement: eventDiv,
    //   eventElementButton: eventButton,
    //   mouseListener: this.renderer.listen(eventDiv, 'mousedown', (e: MouseEvent) => {
    //   e.stopPropagation();
    //   })
    // });

    //this.setBottom();
  }

  private setInsetInline(
    mouseX: number,
    calendarEventsWidth: number
  ): void {
    var eventDivWidth = calendarEventsWidth / 7;
    var eventDivWidthAsPercentage = 100 / 7;

    this.insetInlineStart =
      Math.floor(mouseX / eventDivWidth) * eventDivWidthAsPercentage;

    this.insetInlineEnd =
      Math.floor(7 - mouseX / eventDivWidth) * eventDivWidthAsPercentage;
  }

  private setTop(
    mouseY: number,
    calendarEventsHeight: number
  ): void {
    const fiveMinuesSegments = 24 * 12;
    const oneFiveMinuteSegmentPercentage = 100 / fiveMinuesSegments;
    const maxTopPercentage =
      fiveMinuesSegments * oneFiveMinuteSegmentPercentage;

    const topPercentage = (mouseY / calendarEventsHeight) * 100;
    const topSegment = (topPercentage * fiveMinuesSegments) / maxTopPercentage;
    this.top = Math.floor(topSegment) * oneFiveMinuteSegmentPercentage;

    if (this.top < 0) {
      this.top = 0;
    }
  }

  // private createCalendarEventButton(): HTMLElement {
  //   this.renderer.listen(button, 'dblclick', (event: MouseEvent) =>
  //     this.onCalendarEventDoubleClick(event, event.target as HTMLElement)
  //   );
  // }

  private setBottom(moveEvent: MouseEvent): void {
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

        this.bottom =
          Math.floor(bottomSegment) * oneFiveMinuteSegmentPercentage;
  }

  // private setListener(): void {
  //   const mouseMoveListener = this.renderer.listen(
  //     this.calendarEvents.nativeElement,
  //     'mousemove',
  //     (moveEvent: MouseEvent) => this.setBottom(moveEvent)
  //   );

  //   const mouseUpListener = this.renderer.listen(
  //     this.calendarEvents.nativeElement,
  //     'mouseup',
  //     () => {
  //       mouseMoveListener();
  //       mouseUpListener();
  //     }
  //   );
  // }
}
