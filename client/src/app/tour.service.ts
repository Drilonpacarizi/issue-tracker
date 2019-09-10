import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Tour } from './tour';
import { catchError, tap } from 'rxjs/operators';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class TourService {

  // URL to the web api.
  private tourUrl = 'https://localhost:3000';

  constructor(
    private http: HttpClient
  ) { }

  /**
   * 
   * @param id: string GET tour report by id. Will 404 if id not found.
   */
  getTour(id: string): Observable<Tour> {
    httpOptions.headers.append('Access-Control-Allow-Origin', 'http://localhost:8080');
    httpOptions.headers.append('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    httpOptions.headers.append('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    httpOptions.headers.append('Access-Control-Allow-Credentials', 'true');

    const url = `${this.tourUrl}/single/${id}`;
    console.log("XXX URL GET " + url)
    return this.http.get<Tour>(url, httpOptions).pipe(
      tap(_ => this.log(`fetched tour id=${id}`)),
      catchError(this.handleError<Tour>(`getHero id=${id}`))
    );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error, any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  private log(message: string) {
    console.log("Log message: " + message);
  }
}