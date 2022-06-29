import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Shop4ColummComponent } from './shop4-columm.component';

describe('Shop4ColummComponent', () => {
  let component: Shop4ColummComponent;
  let fixture: ComponentFixture<Shop4ColummComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Shop4ColummComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Shop4ColummComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
