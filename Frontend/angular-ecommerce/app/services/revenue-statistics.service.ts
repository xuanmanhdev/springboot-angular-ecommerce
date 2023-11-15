import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RevenueStatisticsService {

  private baseUrl = 'http://localhost:8080/api/admin/orders/revenue';

  constructor(private httpClient: HttpClient) {
   }

   getRevenueByTimes(startDate: string, endDate: string): Observable<any>{
    const queryParams= `?startDate=${startDate}&endDate=${endDate}`;

    return this.httpClient.get<any>(`${this.baseUrl}${queryParams}`, {headers: {'Authorization': `Bearer  ${localStorage.getItem('token')}`}});
  }
}
