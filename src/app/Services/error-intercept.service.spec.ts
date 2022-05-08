import { TestBed } from '@angular/core/testing';

import { ErrorInterceptService } from './error-intercept.service';

describe('ErrorInterceptService', () => {
  let service: ErrorInterceptService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ErrorInterceptService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
