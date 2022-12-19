import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSmoothieComponent } from './add-smoothie.component';

describe('AddSmoothieComponent', () => {
  let component: AddSmoothieComponent;
  let fixture: ComponentFixture<AddSmoothieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddSmoothieComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddSmoothieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
