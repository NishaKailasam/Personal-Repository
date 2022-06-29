import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Shop5ColumnComponent } from './shop5-column.component';

describe('Shop5ColumnComponent', () => {
  let component: Shop5ColumnComponent;
  let fixture: ComponentFixture<Shop5ColumnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Shop5ColumnComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Shop5ColumnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
