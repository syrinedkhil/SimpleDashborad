import { TestBed } from '@angular/core/testing';

import { FieldRequiredDialogService } from './field-required-dialog.service';

describe('FieldRequiredDialogService', () => {
  let service: FieldRequiredDialogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FieldRequiredDialogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
