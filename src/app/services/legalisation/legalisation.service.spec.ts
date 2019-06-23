import { TestBed } from '@angular/core/testing';

import { LegalisationService } from './legalisation.service';

describe('LegalisationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LegalisationService = TestBed.get(LegalisationService);
    expect(service).toBeTruthy();
  });
});
