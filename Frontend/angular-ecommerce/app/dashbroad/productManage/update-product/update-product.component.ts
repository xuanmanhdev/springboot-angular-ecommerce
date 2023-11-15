import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductCategory } from 'src/app/common/product-category';
import { FileHandle } from 'src/app/model/file-handle.model';
import { ProductCategoryService } from 'src/app/services/product-category.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.scss']
})

export class UpdateProductComponent implements OnInit{

  id!: number | undefined;
  product!: any;
  productForm!: FormGroup;
  formData!: any;
  productCateoryList: ProductCategory[] = [];
  isUpdate: boolean = false;

  // selectedFile!: File;
  // imgURL: any;
  // retrievedImage: any;
  // base64Data: any;
  // retrieveResponse: any;
  // message!: string;
  // imageName: any;

  selectedFiles!: FileList | null;
  imgURLs: any[] = [];
  message: string = '';


  constructor(private productService: ProductService,
            private productCategoryService: ProductCategoryService,
            private route: ActivatedRoute,
            private router: Router,
            private formBuilder: FormBuilder,
            private httpClient: HttpClient
    ) {
     }

  ngOnInit(): void {

    this.getProductCategoryList();

    this.productForm = this.formBuilder.group({
      description: ['', Validators.required],
      name: ['', Validators.required],
      sku: ['', [Validators.required]],
      unitPrice: ['', Validators.required],
      unitsInStock:['', Validators.required],
      categoryId:['', Validators.required]
    });

    this.route.paramMap.subscribe(paramMap => {
      this.id = paramMap.get('id') ? Number(paramMap.get('id')) : undefined;
    });

    if(this.id){
      this.isUpdate = true;
       this.productService.getProductCustom(this.id).subscribe(data => {
        this.product = data;
        this.populateFormWithData();
        console.log(this.productForm.value);
    }, error => console.log(error));
    }
  }

  onFilesChanged(event: any) {
    this.selectedFiles = event.target.files;
    this.imgURLs = [];

    console.log(this.selectedFiles);

    if (this.selectedFiles) {
      for (let i = 0; i < this.selectedFiles.length; i++) {
        const file = this.selectedFiles[i];
        this.readImage(file);
      }
    }
  }

  readImage(file: File) {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.imgURLs.push(e.target.result);
    };
    reader.readAsDataURL(file);
  }

  onUpload() {
    if (!this.selectedFiles) {
      this.message = 'Please select one or more images to upload.';
      return;
    }

    const uploadImageData = new FormData();


    for (let i = 0; i < this.selectedFiles.length; i++) {
      const file = this.selectedFiles[i];
      uploadImageData.append('imageFiles', file, file.name);
    }



    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });

    this.httpClient.post('http://localhost:8080/image/upload', uploadImageData, { headers: headers, observe: 'response' })
      .subscribe((response) => {
        if (response.status === 200) {
          this.message = 'Images uploaded successfully';
          this.selectedFiles = null;
          this.imgURLs = [];
        } else {
          this.message = 'Images not uploaded successfully';
        }
      });
  }

  //Gets called when the user selects an image
  // public onFileChanged(event: any) {
  //   //Select File
  //   this.selectedFile = event.target.files[0];
  // }

  //Gets called when the user clicks on submit to upload the image
  // onUpload() {
  //   console.log(this.selectedFile);

  //   //FormData API provides methods and properties to allow us easily prepare form data to be sent with POST HTTP requests.
  //   const uploadImageData = new FormData();
  //   uploadImageData.append('imageFile', this.selectedFile, this.selectedFile.name);

  //   const headers = new HttpHeaders({
  //     'Authorization': `Bearer ${localStorage.getItem('token')}`
  //   });

  //   //Make a call to the Spring Boot Application to save the image
  //   this.httpClient.post('http://localhost:8080/image/upload', uploadImageData, { headers: headers, observe: 'response' })
  //     .subscribe((response) => {
  //         if (response.status === 200) {
  //           this.message = 'Image uploaded successfully';
  //         } else {
  //           this.message = 'Image not uploaded successfully';
  //         }
  //       }
  //     );
  // }

  //Gets called when the user clicks on retieve image button to get the image from back end
  // getImage() {

  //   const headers = new HttpHeaders({
  //     'Authorization': `Bearer ${localStorage.getItem('token')}`
  //   });

  //   //Make a call to Sprinf Boot to get the Image Bytes.
  //   this.httpClient.get('http://localhost:8080/image/get/' + this.imageName, {
  //     headers: headers
  //   })
  //     .subscribe(
  //       res => {
  //         this.retrieveResponse = res;
  //         this.base64Data = this.retrieveResponse.picByte;
  //         this.retrievedImage = 'data:image/jpeg;base64,' + this.base64Data;
  //       }
  //     );
  // }

// end

  private getProductCategoryList(){
    this.productCategoryService.getProductCategoryList().subscribe(data => {
      this.productCateoryList = data;
    });
  }

  private populateFormWithData() {
    this.productForm.patchValue({
      description: this.product.description,
      name: this.product.name,
      sku: this.product.sku,
      unitPrice: this.product.unitPrice,
      unitsInStock: this.product.unitsInStock,
      categoryId: this.product.categoryId
    });
  }

    onSubmit() {

      if(this.productForm.valid){
         this.formData = this.productForm.value;

         if(this.id){
          this.formData.id = this.id;
         }

        console.log('Form data submitted:', this.formData);
      } else {
        this.productForm.markAllAsTouched();
      }

          if(this.id){

            this.productService.updateProduct(this.id, this.formData).subscribe(
              (response) => {
                console.log('Product updated successfully', response);
                // Handle success response from the API
              },
              (error) => {
                console.error('Error updated product', error);
                // Handle error response from the API
              }
            );
          }else{
            this.productService.createProduct(this.formData).subscribe(
              (response) => {
                console.log('Product updated successfully', response);
                // Handle success response from the API
              },
              (error) => {
                console.error('Error updated product', error);
                // Handle error response from the API
              }
            );
          }

        this.goToProductList();
      }


      goToProductList(){
      this.router.navigate(['/product-list']);
    }
  }
