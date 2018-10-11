import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseBundleComponent } from './course-bundle.component';

describe('CourseBundleComponent', () => {
  let component: CourseBundleComponent;
  let fixture: ComponentFixture<CourseBundleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseBundleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseBundleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
