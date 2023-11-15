import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Product } from '../common/product';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ProductCategory } from '../common/product-category';
import { ProductListDisplay } from '../common/product-list-display';
import { ImageModelService } from './image-model.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl = 'http://localhost:8080/api/products';

  private categoryUrl = 'http://localhost:8080/api/product-category';

  private baseUrlList = 'http://localhost:8080/api/admin/productsList';

  private baseUrl2 = 'http://localhost:8080/api/admin/products';

  private baseUrlListDisplay = 'http://localhost:8080/api/productList';

  constructor(private httpClient: HttpClient
    ) { }

  getProduct(theProductId: number): Observable<Product> {

    // need to build URL based on product id
    const productUrl = `${this.baseUrl}/${theProductId}`;

    return this.httpClient.get<Product>(productUrl);
    // return this.httpClient.get<Product>(productUrl, {headers: {'Authorization': `Bearer  ${localStorage.getItem('token')}`}});
  }

  getProductListPaginate(thePage: number,
                         thePageSize: number,
                         theCategoryId: number): Observable<GetResponseProducts> {

    // need to build URL based on category id, page and size
    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}`
                    + `&page=${thePage}&size=${thePageSize}`;

                    return this.httpClient.get<GetResponseProducts>(searchUrl);

    // return this.httpClient.get<GetResponseProducts>(searchUrl, {headers: {'Authorization': `Bearer  ${localStorage.getItem('token')}`}});
  }


  getProductList(theCategoryId: number): Observable<Product[]> {

    // need to build URL based on category id
    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}`;

    return this.getProducts(searchUrl);
  }

  searchProducts(theKeyword: string): Observable<Product[]> {

    // need to build URL based on the keyword
    const searchUrl = `${this.baseUrl}/search/findByNameContaining?name=${theKeyword}`;

    return this.getProducts(searchUrl);
  }

  searchProductsPaginate(thePage: number,
                        thePageSize: number,
                        theKeyword: string): Observable<GetResponseProducts> {

    // need to build URL based on keyword, page and size
    const searchUrl = `${this.baseUrl}/search/findByNameContaining?name=${theKeyword}`
                    + `&page=${thePage}&size=${thePageSize}`;

    return this.httpClient.get<GetResponseProducts>(searchUrl, {headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`}});

    // return this.httpClient.get<GetResponseProducts>(searchUrl, {headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`}});
  }

  getProductCustom(theProductId: number): Observable<any> {

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });

    const productUrl = `${this.baseUrl2}/${theProductId}`;

    return this.httpClient.get<any>(productUrl, { headers: headers });
  }

  private getProducts(searchUrl: string): Observable<Product[]> {
    return this.httpClient.get<GetResponseProducts>(searchUrl, {headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`}}).pipe(map(response => response._embedded.products));
  }

  getProductCategories(): Observable<ProductCategory[]> {

    return this.httpClient.get<GetResponseProductCategory>(this.categoryUrl).pipe(
      map(response => response._embedded.productCategory)
    );

    // return this.httpClient.get<GetResponseProductCategory>(this.categoryUrl, {headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`}}).pipe(
    //   map(response => response._embedded.productCategory)
    // );
  }

  getProductss(queryParams: any): Observable<any> {
    Object.keys(queryParams).forEach((key: string) => queryParams[key] === undefined && delete queryParams[key]);

      const headers = new HttpHeaders({
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      });

    return this.httpClient.get(`${this.baseUrlList}` , { params: queryParams, headers});
  }

  getProductListDisplay(): Observable<any[]>{
    return this.httpClient.get<any[]>(this.baseUrlListDisplay);
  }


  createProduct(product: any): Observable<any> {

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });

    return this.httpClient.post(this.baseUrl2, product, { headers: headers });
    }

    updateProduct(id: number, product: any): Observable<any>{

      const headers = new HttpHeaders({
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      });

      return this.httpClient.put(`${this.baseUrl2}/${id}`, product, { headers: headers });
    }

    deleteProduct(id: number): Observable<Object>{

      const headers = new HttpHeaders({
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      });

      return this.httpClient.delete(`${this.baseUrl2}/${id}`, { headers: headers });
    }

    getProductById(theProductId: number): Observable<Product> {

      // need to build URL based on product id
      const productUrl = `${this.baseUrl2}/${theProductId}`;

      return this.httpClient.get<any>(productUrl, {headers: {'Authorization': `Bearer  ${localStorage.getItem('token')}`}});
    }





}

interface GetResponseProducts {
  _embedded: {
    products: Product[];
  },
  page: {
    size: number,
    totalElements: number,
    totalPages: number,
    number: number
  }
}

interface GetResponseProductCategory {
  _embedded: {
    productCategory: ProductCategory[];
  }
}
