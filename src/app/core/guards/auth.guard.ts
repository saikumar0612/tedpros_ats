import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {

    constructor(private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (localStorage.getItem('currentUser')) {

            const currentUser = JSON.parse(localStorage.getItem('currentUser'));
            const userToken: string = currentUser ? currentUser.token : '';
            const helper = new JwtHelperService();
            const isExpired = helper.isTokenExpired(userToken);
            if (isExpired) {
                localStorage.setItem('currentUser', '');
                localStorage.clear();
                localStorage.setItem('Token', 'expired');
                console.log(isExpired);
            } else {
                // logged in so return true
                return true;
            }
        }

        // not logged in so redirect to login page with the return url
        // this.router.navigate(['/authorization/login'], { queryParams: { returnUrl: state.url } });
        return false;
    }
}
