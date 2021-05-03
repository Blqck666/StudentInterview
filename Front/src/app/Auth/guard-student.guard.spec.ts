import { TestBed, async, inject } from '@angular/core/testing';

import { GuardStudentGuard } from './guard-student.guard';

describe('GuardStudentGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GuardStudentGuard]
    });
  });

  it('should ...', inject([GuardStudentGuard], (guard: GuardStudentGuard) => {
    expect(guard).toBeTruthy();
  }));
});
