import { TestBed } from '@angular/core/testing';

import { GuessRolGuard } from './guess-rol.guard';

describe('GuessRolGuard', () => {
  let guard: GuessRolGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(GuessRolGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
