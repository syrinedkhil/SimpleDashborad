import { TestBed } from '@angular/core/testing';

import { SuiviProdService } from './suivi-prod.service';

describe('SuiviProdService', () => {
  let service: SuiviProdService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SuiviProdService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
