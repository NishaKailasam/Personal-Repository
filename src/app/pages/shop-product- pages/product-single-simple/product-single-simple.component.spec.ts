import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductSingleSimpleComponent } from './product-single-simple.component';

describe('ProductSingleSimpleComponent', () => {
  let component: ProductSingleSimpleComponent;
  let fixture: ComponentFixture<ProductSingleSimpleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductSingleSimpleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductSingleSimpleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
