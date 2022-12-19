import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteSmoothieComponent } from './delete-smoothie.component';

describe('DeleteSmoothieComponent', () => {
  let component: DeleteSmoothieComponent;
  let fixture: ComponentFixture<DeleteSmoothieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteSmoothieComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteSmoothieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
