import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RantsComponent } from './rants.component';

describe('RantsComponent', () => {
  let component: RantsComponent;
  let fixture: ComponentFixture<RantsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RantsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
