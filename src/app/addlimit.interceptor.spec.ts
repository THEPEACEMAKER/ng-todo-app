import { TestBed } from '@angular/core/testing';

import { AddlimitInterceptor } from './addlimit.interceptor';

describe('AddlimitInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      AddlimitInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: AddlimitInterceptor = TestBed.inject(AddlimitInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
