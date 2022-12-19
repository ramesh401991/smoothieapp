import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmoothiesComponent } from './smoothies.component';

describe('SmoothiesComponent', () => {
  let component: SmoothiesComponent;
  let fixture: ComponentFixture<SmoothiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SmoothiesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SmoothiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
