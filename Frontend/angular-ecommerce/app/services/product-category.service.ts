import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { ProductCategory } from '../common/product-category';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductCategoryService {

  private baseURL = 'http://localhost:8080/api/admin/product-categories';

  private baseURL2 = 'http://localhost:8080/api/admin/productCategoriesList';

  constructor(private httpClient: HttpClient) { }

  // getProductCategories(): Observable<ProductCategory[]> {
  //   return this.httpClient.get<ProductCategory[]>(this.baseURL, {headers: {'Authorization': `Bearer  ${localStorage.getItem('token')}`}});
  //

  getProductCategories(queryParams: any): Observable<any> {
    Object.keys(queryParams).forEach((key: string) => queryParams[key] === undefined && delete queryParams[key]);

      const headers = new HttpHeaders({
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      });

    return this.httpClient.get(`${this.baseURL2}` , { params: queryParams, headers});
  }

  getProductCategoryList(): Observable<ProductCategory[]> {
    return this.httpClient.get<ProductCategory[]>(`${this.baseURL}`, {headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`}});
  }


  getProductCategoryById(id: number): Observable<ProductCategory>{
    return this.httpClient.get<ProductCategory>(`${this.baseURL}/${id}`, {headers: {'Authorization': `Bearer  ${localStorage.getItem('token')}`}});
  }

  createProductCategory(productCategory: any): Observable<any> {

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });

  return this.httpClient.post(this.baseURL, productCategory, { headers: headers });
}


  updateProductCategory(id: number, productCategory: any): Observable<any>{

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });

    return this.httpClient.put(`${this.baseURL}/${id}`, productCategory, { headers: headers });
  }

  deleteProductCategory(id: number): Observable<Object>{

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });

    return this.httpClient.delete(`${this.baseURL}/${id}`, { headers: headers });
  }
}
