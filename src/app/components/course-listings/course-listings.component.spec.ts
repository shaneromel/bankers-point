import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseListingsComponent } from './course-listings.component';

describe('CourseListingsComponent', () => {
  let component: CourseListingsComponent;
  let fixture: ComponentFixture<CourseListingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseListingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseListingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
