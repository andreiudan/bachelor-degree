import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivateSprintAlertDialogComponent } from './activate-sprint-alert-dialog.component';

describe('ActivateSprintAlertDialogComponent', () => {
  let component: ActivateSprintAlertDialogComponent;
  let fixture: ComponentFixture<ActivateSprintAlertDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ActivateSprintAlertDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ActivateSprintAlertDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
