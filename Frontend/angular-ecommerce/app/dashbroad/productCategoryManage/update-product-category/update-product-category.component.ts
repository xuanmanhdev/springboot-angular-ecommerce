import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductCategory } from 'src/app/common/product-category';
import { ProductCategoryService } from 'src/app/services/product-category.service';

@Component({
  selector: 'app-update-product-category',
  templateUrl: './update-product-category.component.html',
  styleUrls: ['./update-product-category.component.scss']
})
export class UpdateProductCategoryComponent implements OnInit {

  id!: number | undefined;
  productCategory!: ProductCategory;
  productCategoryForm!: FormGroup;
  formData: any;
  isUpdate: boolean = false;

  constructor(private productCategoryService: ProductCategoryService,
            private route: ActivatedRoute,
            private router: Router,
            private formBuilder: FormBuilder
    ) {
     }

  ngOnInit(): void {
    this.productCategoryForm = this.formBuilder.group({
      categoryName: ['', Validators.required]
    });

    this.route.paramMap.subscribe(paramMap => {
      this.id = paramMap.get('id') ? Number(paramMap.get('id')) : undefined;
    });

    if(this.id){
      this.isUpdate = true;
       this.productCategoryService.getProductCategoryById(this.id).subscribe(data => {
        this.productCategory = data;
        this.populateFormWithData();
    }, error => console.log(error));
    }
  }

  private populateFormWithData() {
    this.productCategoryForm.patchValue({
      categoryName: this.productCategory.categoryName
    });
  }

    onSubmit() {

      if(this.productCategoryForm.valid){
         this.formData = this.productCategoryForm.value;

        if(this.id){
          this.formData.id = this.id;
        }

        console.log('Form data submitted:', this.formData);
      } else {
        this.productCategoryForm.markAllAsTouched();
      }

          if(this.id){
            this.productCategoryService.updateProductCategory(this.id, this.formData).subscribe(
              (response) => {
                console.log('Product category updated successfully', response);
                // Handle success response from the API
              },
              (error) => {
                console.error('Error updated product category', error);
                // Handle error response from the API
              }
            );
          }else{
            this.productCategoryService.createProductCategory(this.formData).subscribe(
              (response) => {
                console.log('Product category created successfully', response);
                // Handle success response from the API
              },
              (error) => {
                console.error('Error creating product category', error);
                // Handle error response from the API
              }
            );
          }

        this.goToProductCategoryList();
      }


      goToProductCategoryList(){
      this.router.navigate(['/product-category-list']);
    }
  }
