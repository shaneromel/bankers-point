import { TestBed, inject } from '@angular/core/testing';

import { CourseBundleService } from './course-bundle.service';

describe('CourseBundleService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CourseBundleService]
    });
  });

  it('should be created', inject([CourseBundleService], (service: CourseBundleService) => {
    expect(service).toBeTruthy();
  }));
});
