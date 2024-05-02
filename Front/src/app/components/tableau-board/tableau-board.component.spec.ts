import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableauBoardComponent } from './tableau-board.component';

describe('TableuBoardComponent', () => {
  let component: TableauBoardComponent;
  let fixture: ComponentFixture<TableauBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableauBoardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TableauBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
