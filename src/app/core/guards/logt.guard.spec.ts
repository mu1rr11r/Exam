import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { logtGuard } from './logt.guard';

describe('logtGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => logtGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
