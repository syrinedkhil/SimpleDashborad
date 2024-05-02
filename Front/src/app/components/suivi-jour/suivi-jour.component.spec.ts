import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuiviJourComponent } from './suivi-jour.component';

describe('SuiviJourComponent', () => {
  let component: SuiviJourComponent;
  let fixture: ComponentFixture<SuiviJourComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SuiviJourComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SuiviJourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
