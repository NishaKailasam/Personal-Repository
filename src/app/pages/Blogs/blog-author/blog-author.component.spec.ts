import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogAuthorComponent } from './blog-author.component';

describe('BlogAuthorComponent', () => {
  let component: BlogAuthorComponent;
  let fixture: ComponentFixture<BlogAuthorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlogAuthorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogAuthorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
