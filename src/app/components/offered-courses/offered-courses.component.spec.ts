import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OfferedCoursesComponent } from './offered-courses.component';

describe('OfferedCoursesComponent', () => {
  let component: OfferedCoursesComponent;
  let fixture: ComponentFixture<OfferedCoursesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OfferedCoursesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OfferedCoursesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
