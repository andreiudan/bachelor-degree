import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSprintDialogComponent } from './create-sprint-dialog.component';

describe('CreateSprintDialogComponent', () => {
  let component: CreateSprintDialogComponent;
  let fixture: ComponentFixture<CreateSprintDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateSprintDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateSprintDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
