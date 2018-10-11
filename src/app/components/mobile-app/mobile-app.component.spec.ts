import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileAppComponent } from './mobile-app.component';

describe('MobileAppComponent', () => {
  let component: MobileAppComponent;
  let fixture: ComponentFixture<MobileAppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MobileAppComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MobileAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
