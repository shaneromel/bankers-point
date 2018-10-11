import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseBundleOverviewComponent } from './course-bundle-overview.component';

describe('CourseBundleOverviewComponent', () => {
  let component: CourseBundleOverviewComponent;
  let fixture: ComponentFixture<CourseBundleOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseBundleOverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseBundleOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
