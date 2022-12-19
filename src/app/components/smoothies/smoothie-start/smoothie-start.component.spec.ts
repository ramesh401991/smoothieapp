import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmoothieStartComponent } from './smoothie-start.component';

describe('SmoothieStartComponent', () => {
  let component: SmoothieStartComponent;
  let fixture: ComponentFixture<SmoothieStartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SmoothieStartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SmoothieStartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
