import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseBundleDetailsComponent } from './course-bundle-details.component';

describe('CourseBundleDetailsComponent', () => {
  let component: CourseBundleDetailsComponent;
  let fixture: ComponentFixture<CourseBundleDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseBundleDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseBundleDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
