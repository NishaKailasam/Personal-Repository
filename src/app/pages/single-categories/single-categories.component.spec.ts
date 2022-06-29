import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleCategoriesComponent } from './single-categories.component';

describe('SingleCategoriesComponent', () => {
  let component: SingleCategoriesComponent;
  let fixture: ComponentFixture<SingleCategoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingleCategoriesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
