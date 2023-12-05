import { TestBed } from '@angular/core/testing';
import { CanDeactivateFn } from '@angular/router';

import { dirtycheck1Guard } from './dirtycheck1.guard';

describe('dirtycheck1Guard', () => {
  const executeGuard: CanDeactivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => dirtycheck1Guard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
