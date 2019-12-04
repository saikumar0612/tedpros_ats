import { TestBed, inject } from '@angular/core/testing';

import { CssselectorService } from './cssselector.service';

describe('CssselectorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CssselectorService]
    });
  });

  it('should be created', inject([CssselectorService], (service: CssselectorService) => {
    expect(service).toBeTruthy();
  }));
});
