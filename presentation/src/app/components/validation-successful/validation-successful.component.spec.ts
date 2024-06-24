import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidationSuccessfulComponent } from './validation-successful.component';

describe('ValidationSuccessfulComponent', () => {
  let component: ValidationSuccessfulComponent;
  let fixture: ComponentFixture<ValidationSuccessfulComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ValidationSuccessfulComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ValidationSuccessfulComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
