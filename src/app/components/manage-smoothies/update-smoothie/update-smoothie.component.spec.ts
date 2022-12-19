import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateSmoothieComponent } from './update-smoothie.component';

describe('UpdateSmoothieComponent', () => {
  let component: UpdateSmoothieComponent;
  let fixture: ComponentFixture<UpdateSmoothieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateSmoothieComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateSmoothieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
