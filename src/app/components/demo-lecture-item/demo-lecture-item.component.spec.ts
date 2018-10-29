import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DemoLectureItemComponent } from './demo-lecture-item.component';

describe('DemoLectureItemComponent', () => {
  let component: DemoLectureItemComponent;
  let fixture: ComponentFixture<DemoLectureItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DemoLectureItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DemoLectureItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
