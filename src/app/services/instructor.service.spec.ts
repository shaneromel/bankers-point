import { TestBed, inject } from '@angular/core/testing';

import { InstructorService } from './instructor.service';

describe('InstructorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InstructorService]
    });
  });

  it('should be created', inject([InstructorService], (service: InstructorService) => {
    expect(service).toBeTruthy();
  }));
});
