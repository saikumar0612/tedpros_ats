import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AuthenticationService } from './app/core/services';
import { Router } from '@angular/router';

@Injectable()
export class ErrorIntercecptor implements HttpInterceptor {
    constructor(private authService: AuthenticationService, private router: Router) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // if(!localStorage.getItem('token') && !localStorage.getItem('currentUser')) {
        //     this.router.navigate(['/authorization'])
        // }
        return next.handle(request);
    }
}
