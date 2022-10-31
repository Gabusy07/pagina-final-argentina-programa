import { TestBed } from '@angular/core/testing';

import { AdminRolGuard } from './admin-rol.guard';

describe('AdminRolGuard', () => {
  let guard: AdminRolGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AdminRolGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
