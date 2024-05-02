import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuiviProductionComponent } from './suivi-production.component';

describe('SuiviProductionComponent', () => {
  let component: SuiviProductionComponent;
  let fixture: ComponentFixture<SuiviProductionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SuiviProductionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SuiviProductionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
