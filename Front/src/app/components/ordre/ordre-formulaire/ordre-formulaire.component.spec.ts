import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdreFormulaireComponent } from './ordre-formulaire.component';

describe('OrdreFormulaireComponent', () => {
  let component: OrdreFormulaireComponent;
  let fixture: ComponentFixture<OrdreFormulaireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrdreFormulaireComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OrdreFormulaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
