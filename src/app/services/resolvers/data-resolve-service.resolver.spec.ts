import { TestBed } from '@angular/core/testing';

import { DataResolveServiceResolver } from './data-resolve-service.resolver';

describe('DataResolveServiceResolver', () => {
  let resolver: DataResolveServiceResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(DataResolveServiceResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
