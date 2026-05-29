import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GramComponent } from './gram.component';

describe('GramComponent', () => {
  let component: GramComponent;
  let fixture: ComponentFixture<GramComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GramComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
