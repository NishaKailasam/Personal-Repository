import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Shop3ColummComponent } from './shop3-columm.component';

describe('Shop3ColummComponent', () => {
  let component: Shop3ColummComponent;
  let fixture: ComponentFixture<Shop3ColummComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Shop3ColummComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Shop3ColummComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
