import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LectureVideoComponent } from './lecture-video.component';

describe('LectureVideoComponent', () => {
  let component: LectureVideoComponent;
  let fixture: ComponentFixture<LectureVideoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LectureVideoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LectureVideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
