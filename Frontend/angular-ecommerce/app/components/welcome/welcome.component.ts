import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ProductListDisplay } from 'src/app/common/product-list-display';
import { ImageModelService } from 'src/app/services/image-model.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})

export class WelcomeComponent implements OnInit {
  images: string[] = ['assets/images/products/books/test.jpg', 'assets/images/products/books/aa_haupttribuene.jpg', 'assets/images/products/books/kane.jpg']; // Replace with your image URLs
  currentIndex = 0;
  currentImage!: string;

  categories: any[] = [];


  selectedFile!: File;
  imgURL: any;
  retrievedImage: any;
  base64Data: any;
  retrieveResponse: any;
  message!: string;
  imageName: any;


  constructor(
    private productService: ProductService,
    public imageModelService: ImageModelService,
    private httpClient: HttpClient
  ) {
  }

  ngOnInit() {
    this.loadImage(this.currentIndex);
    setInterval(() => this.nextImage(), 3000); // Change image every 3 seconds

    this.productService.getProductListDisplay().subscribe((data) => {
      this.categories = data;
    });
  }

  nextImage() {
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
    this.loadImage(this.currentIndex);
  }

  loadImage(index: number) {
    this.currentImage = this.images[index];
  }



  getImage() {

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    //Make a call to Sprinf Boot to get the Image Bytes.
    this.httpClient.get(`http://localhost:8080/image/get/${this.imageName}`, { headers: headers })
      .subscribe(
        res => {
          this.retrieveResponse = res;
          this.base64Data = this.retrieveResponse.picByte;
          this.retrievedImage = 'data:image/png;base64,' + this.base64Data;
        }
      );
  }

}
