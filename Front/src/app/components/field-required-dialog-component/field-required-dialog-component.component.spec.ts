import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FieldRequiredDialogComponent } from './field-required-dialog-component.component';

describe('FieldRequiredDialogComponentComponent', () => {
  let component: FieldRequiredDialogComponent;
  let fixture: ComponentFixture<FieldRequiredDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FieldRequiredDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FieldRequiredDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
