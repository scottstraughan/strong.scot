import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewRantComponent } from './view-rant.component';

describe('ViewRantComponent', () => {
  let component: ViewRantComponent;
  let fixture: ComponentFixture<ViewRantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewRantComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewRantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
