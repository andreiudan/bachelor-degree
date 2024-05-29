import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';

@Component({
  selector: 'app-calendar-event-details',
  standalone: true,
  templateUrl: './calendar-event-details.component.html',
  styleUrl: './calendar-event-details.component.scss'
})
export class CalendarEventDetailsComponent {
  public readonly width = 247;
  public readonly height = 247;
  public readonly margin = 6;
  public readonly padding = 12;
  public readonly buttonPadding = 4;
  private readonly scrollBarSize = 17;
  public top = 200;
  public left: number | null = null;
  public right: number | null = null;

  public calendar: ElementRef;
  public calendarEvents: ElementRef;

  @ViewChild('detailsRoot', { static: true }) detailsRoot: ElementRef;

  constructor() { }

  public initialize(eventElement: HTMLElement, calendar: ElementRef, calendarEvents: ElementRef): void {
    this.calendar = calendar;
    this.calendarEvents = calendarEvents;

    this.setAlignmentAttributes(eventElement);
  }

  private setAlignmentAttributes(eventElement: HTMLElement): void{
    const eventElementRect = eventElement.getBoundingClientRect();
    const calendarEventsRect = this.calendarEvents.nativeElement.getBoundingClientRect();
    const calendarRect = this.calendar.nativeElement.getBoundingClientRect();

    const topOffset = (this.height + 2 * this.margin + 2 * this.padding  - eventElementRect.height) / 2;
    this.top = eventElementRect.top - topOffset;

    if(this.top + this.height + this.margin >= calendarRect.bottom){
      this.top = calendarRect.bottom - this.height - 2 * this.margin - 2 * this.padding;
    }

    const sidenavOffset = calendarRect.left;
    this.left = eventElementRect.right - sidenavOffset + this.buttonPadding;

    if(this.left + this.width > calendarEventsRect.width){
      const distanceToRight = calendarEventsRect.right - eventElementRect.right;
      const elementWidth = eventElementRect.right - eventElementRect.left;

      this.right = distanceToRight + elementWidth + this.scrollBarSize + this.buttonPadding;
      this.left = null;
    }
  }
}
