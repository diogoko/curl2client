import { TestBed, inject } from '@angular/core/testing';

import { ClientGeneratorService } from './client-generator.service';

describe('ClientGeneratorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ClientGeneratorService]
    });
  });

  it('should be created', inject([ClientGeneratorService], (service: ClientGeneratorService) => {
    expect(service).toBeTruthy();
  }));
});
