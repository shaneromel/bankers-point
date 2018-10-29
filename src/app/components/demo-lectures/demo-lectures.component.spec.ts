import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DemoLecturesComponent } from './demo-lectures.component';

describe('DemoLecturesComponent', () => {
  let component: DemoLecturesComponent;
  let fixture: ComponentFixture<DemoLecturesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DemoLecturesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DemoLecturesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
