import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateProductCategoryComponent } from './update-product-category.component';

describe('UpdateProductCategoryComponent', () => {
  let component: UpdateProductCategoryComponent;
  let fixture: ComponentFixture<UpdateProductCategoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateProductCategoryComponent]
    });
    fixture = TestBed.createComponent(UpdateProductCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
