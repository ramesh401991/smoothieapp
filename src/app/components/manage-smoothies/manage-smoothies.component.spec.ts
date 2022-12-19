import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageSmoothiesComponent } from './manage-smoothies.component';

describe('ManageSmoothiesComponent', () => {
  let component: ManageSmoothiesComponent;
  let fixture: ComponentFixture<ManageSmoothiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageSmoothiesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageSmoothiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
