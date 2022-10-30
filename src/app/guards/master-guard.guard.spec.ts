import { TestBed } from '@angular/core/testing';

import { MasterGuardGuard } from './master-guard.guard';

describe('MasterGuardGuard', () => {
  let guard: MasterGuardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(MasterGuardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
