import { TestBed, inject } from '@angular/core/testing';

import { InteranlService } from './interanl.service';

describe('InteranlService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [InteranlService]
  }));

  it('should be created', inject([InteranlService], (service: InteranlService) => {
    expect(service).toBeTruthy();
  }));

});
