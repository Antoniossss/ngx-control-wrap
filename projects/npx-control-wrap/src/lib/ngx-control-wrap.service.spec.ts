import { TestBed } from '@angular/core/testing';

import { NgxControlWrapService } from './ngx-control-wrap.service';

describe('NgxControlWrapService', () => {
  let service: NgxControlWrapService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgxControlWrapService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
