import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdreFormComponent } from './ordre-form.component';

describe('OrdreFormComponent', () => {
  let component: OrdreFormComponent;
  let fixture: ComponentFixture<OrdreFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrdreFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OrdreFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
