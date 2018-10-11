import { TestBed, inject } from '@angular/core/testing';

import { MyCoursesService } from './my-courses.service';

describe('MyCoursesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MyCoursesService]
    });
  });

  it('should be created', inject([MyCoursesService], (service: MyCoursesService) => {
    expect(service).toBeTruthy();
  }));
});
