import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationSuccessfulDialogComponent } from './registration-successful-dialog.component';

describe('RegistrationSuccessfulDialogComponent', () => {
  let component: RegistrationSuccessfulDialogComponent;
  let fixture: ComponentFixture<RegistrationSuccessfulDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistrationSuccessfulDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegistrationSuccessfulDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
