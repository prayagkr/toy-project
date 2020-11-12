import { TestBed, async, inject } from '@angular/core/testing';

import { AthenaToasterService } from './athena-toaster.service';
import { InteranlService } from './interanl.service';

describe('AthenaToasterService', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AthenaToasterService, InteranlService]
    });
  });

  it('should be created', inject([AthenaToasterService], (service: AthenaToasterService) => {
    expect(service).toBeTruthy();
  }));
});
