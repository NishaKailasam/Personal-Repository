import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductSingleGridComponent } from './product-single-grid.component';

describe('ProductSingleGridComponent', () => {
  let component: ProductSingleGridComponent;
  let fixture: ComponentFixture<ProductSingleGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductSingleGridComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductSingleGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
