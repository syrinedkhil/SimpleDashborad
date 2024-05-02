import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ordreFabricationComponent } from './ordre-fabrication.component';

describe('OrdreFabricationComponent', () => {
  let component: ordreFabricationComponent;
  let fixture: ComponentFixture<ordreFabricationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ordreFabricationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ordreFabricationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
