import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseBundleCoursesComponent } from './course-bundle-courses.component';

describe('CourseBundleCoursesComponent', () => {
  let component: CourseBundleCoursesComponent;
  let fixture: ComponentFixture<CourseBundleCoursesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseBundleCoursesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseBundleCoursesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
