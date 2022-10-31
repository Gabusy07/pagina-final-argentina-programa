import { TestBed } from '@angular/core/testing';

import { CommonRolGuard } from './common-rol.guard';

describe('CommonRolGuard', () => {
  let guard: CommonRolGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CommonRolGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
