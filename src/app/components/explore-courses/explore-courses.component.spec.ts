import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExploreCoursesComponent } from './explore-courses.component';

describe('ExploreCoursesComponent', () => {
  let component: ExploreCoursesComponent;
  let fixture: ComponentFixture<ExploreCoursesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExploreCoursesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExploreCoursesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
