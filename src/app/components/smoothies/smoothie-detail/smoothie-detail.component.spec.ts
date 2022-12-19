import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmoothieDetailComponent } from './smoothie-detail.component';

describe('SmoothieDetailComponent', () => {
  let component: SmoothieDetailComponent;
  let fixture: ComponentFixture<SmoothieDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SmoothieDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SmoothieDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
