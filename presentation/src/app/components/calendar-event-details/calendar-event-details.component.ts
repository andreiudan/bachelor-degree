import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormField, MatInput } from '@angular/material/input';

export interface IHoursInterval {
  hourFrom: string;
  hourTo: string;
}

@Component({
  selector: 'app-calendar-event-details',
  standalone: true,
  imports: [MatInput, MatFormField, FormsModule, ReactiveFormsModule],
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
  public eventElement: HTMLElement;

  public hourFrom: string;
  public hourTo: string;

  @ViewChild('detailsRoot', { static: true }) detailsRoot: ElementRef;

  @Output('onEventDetailsClose')
  onClose: EventEmitter<boolean> = new EventEmitter();

  @Output('onEventDetailsDelete')
  onDelete: EventEmitter<boolean> = new EventEmitter();

  @Output('onEventDetailsModified')
  onSave: EventEmitter<{hourFrom: string, hourTo: string}> = new EventEmitter();

  public hoursInterval: IHoursInterval;

  public timesForm: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  public get hourFromInput() {
    return this.timesForm.get('hourFromInput')?.value;
  }

  public get hourToInput() {
    return this.timesForm.get('hourToInput')?.value;
  }

  public initialize(eventElement: HTMLElement, calendar: ElementRef, calendarEvents: ElementRef): void {
    this.timesForm = this.formBuilder.group({
      hourFromInput: [
        ''
      ],
      hourToInput: [
        ''
      ]
    });
    
    this.calendar = calendar;
    this.eventElement = eventElement;
    this.calendarEvents = calendarEvents;

    this.setAlignmentAttributes(eventElement);

    const eventElementRect = eventElement.getBoundingClientRect();

    this.hourFrom = this.calculateTimeFromPositions(eventElementRect.top + 0.0118);
    this.hourTo = this.calculateTimeFromPositions(eventElementRect.bottom);

    this.timesForm.patchValue({
      hourFromInput: this.hourFrom,
      hourToInput: this.hourTo
    });
  }

  private setAlignmentAttributes(eventElement: HTMLElement): void{
    const eventElementRect = eventElement.getBoundingClientRect();
    const calendarEventsRect = this.calendarEvents.nativeElement.getBoundingClientRect();
    const calendarRect = this.calendar.nativeElement.getBoundingClientRect();

    const topOffset = (this.height + 2 * this.margin + 2 * this.padding  - eventElementRect.height) / 2;
    this.top = eventElementRect.top - topOffset;

    if(this.top + this.height + 2 * this.margin + 2 * this.padding >= calendarRect.bottom){
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

  private calculateTimeFromPositions(position: number) {
    const calendarEventsRect = this.calendarEvents.nativeElement.getBoundingClientRect();

    const time = ((position - calendarEventsRect.top) * 24) / calendarEventsRect.height;
    const hour = Math.floor(time);
    const minutes = Math.floor((time - hour) * 60);

    const finalTime = `${hour < 10 ? '0' : ''}${hour}:${minutes < 10 ? '0' : ''}${minutes}`;

    if(finalTime === '24:00'){
      return '23:59';
    }

    return finalTime;
  }

  public closeComponent(): void {
    this.onClose.emit(true);
  }

  public save(): void {
    const fromInput = this.timesForm.value.hourFromInput;
    const toInput = this.timesForm.value.hourToInput;

    if(fromInput === this.hourFrom && toInput === this.hourTo){
      return;
    }

    this.onSave.emit({ hourFrom: this.hourFrom, hourTo: this.hourTo });
  }

  public deleteEvent(): void {
    this.onDelete.emit();
  }
}
