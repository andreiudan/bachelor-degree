import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarEventDetailsComponent } from './calendar-event-details.component';

describe('CalendarEventDetailsComponent', () => {
  let component: CalendarEventDetailsComponent;
  let fixture: ComponentFixture<CalendarEventDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CalendarEventDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CalendarEventDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
