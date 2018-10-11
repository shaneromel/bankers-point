import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorPaymentComponent } from './error-payment.component';

describe('ErrorPaymentComponent', () => {
  let component: ErrorPaymentComponent;
  let fixture: ComponentFixture<ErrorPaymentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ErrorPaymentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrorPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
