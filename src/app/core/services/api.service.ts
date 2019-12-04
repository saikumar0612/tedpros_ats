import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Headers, Http, Response, URLSearchParams } from '@angular/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

import { map } from 'rxjs/operators';

// import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/catch';

import { JwtService } from './jwt.service';

@Injectable({ providedIn: 'root' })
export class APIService {
  errors = false;
  constructor(
    private http: Http,
    private jwtService: JwtService
  ) { }

  private setHeaders(): Headers {
    const headersConfig = {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    };

    if (this.jwtService.getToken()) {
      console.log(`Token: ${this.jwtService.getToken()}`);
      headersConfig['Authorization'] = `Token: ${this.jwtService.getToken()}`;
    }
    return new Headers(headersConfig);
  }

  private formatErrors(error: any) {
    return throwError(error.json());
  }

  get(path: string, params: URLSearchParams = new URLSearchParams()): Observable<any> {
    console.log({ headers: this.setHeaders(), search: params });
    return this.http.get(`${environment.apiUrl}${path}`, { headers: this.setHeaders(), search: params })
      .pipe(map((res: Response) => res.json()),
        catchError((error: Response) => {
          console.log(error);

          return throwError(error.json());
        }));
  }

  put(path: string, body: Object = {}): Observable<any> {
    return this.http.put(
      `${environment.apiUrl}${path}`,
      JSON.stringify(body),
      { headers: this.setHeaders() }
    )
      .pipe(map((res: Response) => res.json()),
        catchError((error: Response) => {
          return throwError(error.json());
        }));
  }

  post(path: string, body: Object = {}): Observable<any> {
    return this.http.post(
      `${environment.apiUrl}${path}`,
      JSON.stringify(body),
      { headers: this.setHeaders() }
    )
      .pipe(map((res: Response) => res.json()),
        // catchError((error: Response) => {
        //   console.log(error.json());
        //   return throwError(error.json());
        // })
        );
    // .catch(this.formatErrors)
  }

  delete(path): Observable<any> {
    return this.http.delete(
      `${environment.apiUrl}${path}`,
      { headers: this.setHeaders() }
    )
      .pipe(map((res: Response) => res.json()),
        catchError((error: Response) => {
          return throwError(error.json());
        }));
  }
}















