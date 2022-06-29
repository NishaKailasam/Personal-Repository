import { TestBed } from '@angular/core/testing';

import { TopRatedProductsService } from './top-rated-products.service';

describe('TopRatedProductsService', () => {
  let service: TopRatedProductsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TopRatedProductsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
