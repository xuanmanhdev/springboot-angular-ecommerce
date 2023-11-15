import { Injectable } from '@angular/core';
import { OrderHistory } from '../common/order-history';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OrderInformation } from '../common/order-information';

@Injectable({
  providedIn: 'root'
})
export class OrderHistoryService {

  private orderUrl = 'http://localhost:8080/api/orders';

  private onlyOrderUrl2 = 'http://localhost:8080/api/admin/orders/customer';

  private onlyOrderUrl = 'http://localhost:8080/api/admin/orders';

  constructor(private httpClient: HttpClient) { }

  // getOrders(): Observable<OrderHistory[]> {
  //   return this.httpClient.get<OrderHistory[]>(this.orderUrl, {headers: {'Authorization': `Bearer  ${localStorage.getItem('token')}`}});
  // }

  getOrders(): Observable<any[]> {
    return this.httpClient.get<any[]>(this.onlyOrderUrl, {headers: {'Authorization': `Bearer  ${localStorage.getItem('token')}`}});
  }

  getOrderById(id: number): Observable<any>{
    return this.httpClient.get<any>(`${this.onlyOrderUrl}/${id}`, {headers: {'Authorization': `Bearer  ${localStorage.getItem('token')}`}});
  }



  getOnlyOrders(): Observable<OrderHistory[]> {
    return this.httpClient.get<OrderHistory[]>(this.onlyOrderUrl, {headers: {'Authorization': `Bearer  ${localStorage.getItem('token')}`}});
  }

  getOnlyOrderById(id: number): Observable<OrderHistory>{
      return this.httpClient.get<OrderHistory>(`${this.onlyOrderUrl}/${id}`, {headers: {'Authorization': `Bearer  ${localStorage.getItem('token')}`}});
  }


  setStatusForOrder(id: number, order: any): Observable<any>{

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });

    return this.httpClient.put(`${this.onlyOrderUrl}/${id}`, order, { headers: headers });
  }

  getOrderHistory(theUserId: number): Observable<any> {

    // need to build URL based on the customer email
    const orderHistoryUrl = `${this.onlyOrderUrl2}/${theUserId}`;

    return this.httpClient.get<any>(orderHistoryUrl, {headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`}});
  }

}

// interface GetResponseOrderHistory {
//   _embedded: {
//     orders: OrderHistory[];
//   }
// }
