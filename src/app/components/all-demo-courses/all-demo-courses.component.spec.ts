import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllDemoCoursesComponent } from './all-demo-courses.component';

describe('AllDemoCoursesComponent', () => {
  let component: AllDemoCoursesComponent;
  let fixture: ComponentFixture<AllDemoCoursesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllDemoCoursesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllDemoCoursesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
