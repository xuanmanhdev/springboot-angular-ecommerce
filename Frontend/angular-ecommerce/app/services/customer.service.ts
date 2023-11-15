import { Injectable } from '@angular/core';
import { Customer } from '../common/customer';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private baseURL = 'http://localhost:8080/api/admin/customers';

  private baseURL2 = 'http://localhost:8080/api/admin/customersList';


  constructor(private httpClient: HttpClient
    ){}

  getCustomerById(id: number): Observable<any>{
    return this.httpClient.get<any>(`${this.baseURL}/${id}`, {headers: {'Authorization': `Bearer  ${localStorage.getItem('token')}`}});
  }

  getCustomerListPaginate(thePage: number,
    thePageSize: number): Observable<any> {

// need to build URL based on category id, page and size
const searchUrl = `${this.baseURL}/search/page=${thePage}&size=${thePageSize}`;

return this.httpClient.get<any>(searchUrl, {headers: {'Authorization': `Bearer  ${localStorage.getItem('token')}`}});
}

searchCustomersPaginate(thePage: number,
  thePageSize: number,
  theKeyword: string): Observable<any> {

// need to build URL based on keyword, page and size
const searchUrl = `${this.baseURL}/search/findByNameContaining?name=${theKeyword}`
+ `&page=${thePage}&size=${thePageSize}`;

return this.httpClient.get<any>(searchUrl, {headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`}});
}

  createCustomer(customer: any): Observable<any> {

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });

  return this.httpClient.post(this.baseURL, customer, { headers: headers });
  }


  updateCustomer(id: number, customer: any): Observable<any>{

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });

    return this.httpClient.put(`${this.baseURL}/${id}`, customer, { headers: headers });
  }

  deleteCustomer(id: number): Observable<Object>{

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });

    return this.httpClient.delete(`${this.baseURL}/${id}`, { headers: headers });
  }

  getCustomers(queryParams: any): Observable<any> {
    Object.keys(queryParams).forEach((key: string) => queryParams[key] === undefined && delete queryParams[key]);

      const headers = new HttpHeaders({
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      });

    return this.httpClient.get(`${this.baseURL2}` , { params: queryParams, headers});
  }
}
