import { TestBed } from '@angular/core/testing';

import { NpxControlWrapService } from './npx-control-wrap.service';

describe('NpxControlWrapService', () => {
  let service: NpxControlWrapService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NpxControlWrapService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
