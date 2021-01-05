import { TestBed } from '@angular/core/testing';

import { NetStatusService } from './net-status.service';

describe('NetStatusService', () => {
  let service: NetStatusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NetStatusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
