import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Shop2ColummComponent } from './shop2-columm.component';

describe('Shop2ColummComponent', () => {
  let component: Shop2ColummComponent;
  let fixture: ComponentFixture<Shop2ColummComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Shop2ColummComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Shop2ColummComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
