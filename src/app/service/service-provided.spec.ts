import { TestBed } from '@angular/core/testing';

import { ServiceProvided } from './service-provided';

describe('ServiceProvided', () => {
  let service: ServiceProvided;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceProvided);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
