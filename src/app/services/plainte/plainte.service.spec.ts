import { TestBed } from '@angular/core/testing';

import { PlainteService } from './plainte.service';

describe('PlainteService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PlainteService = TestBed.get(PlainteService);
    expect(service).toBeTruthy();
  });
});
