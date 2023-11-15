import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { State } from '../common/state';

@Injectable({
  providedIn: 'root'
})
export class Luv2ShopFormService {

  private statesUrl = 'http://localhost:8080/api/states';

  constructor(private httpClient: HttpClient) { }

  getStates(): Observable<State[]> {

    return this.httpClient.get<GetResponseStates>(this.statesUrl).pipe(
      map(response => response._embedded.states)
    );

    // return this.httpClient.get<GetResponseStates>(this.statesUrl, {headers: {'Authorization': `Bearer  ${localStorage.getItem('token')}`}}).pipe(
    //   map(response => response._embedded.states)
    // );
  }

  // getStates(theCountryCode: string): Observable<State[]> {

  //   // search url
  //   const searchStatesUrl = `${this.statesUrl}/search/findByCountryCode?code=${theCountryCode}`;

  //   return this.httpClient.get<GetResponseStates>(searchStatesUrl).pipe(
  //     map(response => response._embedded.states)
  //   );
  // }

}

interface GetResponseStates {
  _embedded: {
    states: State[];
  }
}
