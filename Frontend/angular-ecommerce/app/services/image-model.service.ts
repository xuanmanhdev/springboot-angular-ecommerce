import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageModelService {

  private baseUrl = 'http://localhost:8080/image/get';

  private baseUrl2 = 'http://localhost:8080/image/gets';

  constructor(private httpClient: HttpClient) { }

  getImageById(id: number): Observable<any[]>{

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });

    return this.httpClient.get<any[]>(`${this.baseUrl}/${id}`, { headers: headers });
  }

  getListImageById(id: number): Observable<any>{

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });

    return this.httpClient.get<any>(`${this.baseUrl2}/${id}`, { headers: headers });
  }
}
