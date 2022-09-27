import { TestBed } from '@angular/core/testing';

import { BEndService } from './b-end.service';

describe('BEndvice', () => {
  let service: BEndService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BEndService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
