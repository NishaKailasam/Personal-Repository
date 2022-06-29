import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Shop1ColummComponent } from './shop1-columm.component';

describe('Shop1ColummComponent', () => {
  let component: Shop1ColummComponent;
  let fixture: ComponentFixture<Shop1ColummComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Shop1ColummComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Shop1ColummComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
