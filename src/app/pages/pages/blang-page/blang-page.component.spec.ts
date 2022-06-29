import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlangPageComponent } from './blang-page.component';

describe('BlangPageComponent', () => {
  let component: BlangPageComponent;
  let fixture: ComponentFixture<BlangPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlangPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BlangPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
