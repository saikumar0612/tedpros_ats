// SuperService
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })

export class SuperService {
    url: any;
    url1: any;
    // this.url +
    url2: any;
    url3: any;
    url4: any;
    url5: any;
    constructor(private http: HttpClient, private router: Router) {
        this.url = environment.superUrl + '/getCutosmerToken';
        this.url1 = environment.apiUrl + '/Activation/addEncdata';
        // this.url +
        this.url2 = environment.apiUrl + '/activation/addCompanyInfo';
        this.url3 = environment.apiUrl + '/activation/addOwnerInfo';
        this.url4 = environment.apiUrl + '/activation/installatiion';
        // added code to add company info on jobportal during activation - sharmistha - 11-22-2019 - start
        this.url5 = environment.jobPortalUrl + '/company/addCompanyInfo';
        // added code to add company info on jobportal during activation - sharmistha - 11-22-2019 - end
    }

    custActivate(email) {
        return this.http.post<any>(this.url, { 'email': email })
            .pipe(map(user => {
                // login successful if there's a jwt token in the response
                if (user.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('superUser', JSON.stringify(user));
                    localStorage.setItem('superUserEmail', JSON.stringify(email));
                }
                return user;
            }));
    }

    // POsting enc data from super admin to account admin

    postencdata(encName: string, encryptData: string) {
        return this.http.post<any>(this.url1, { 'encName': encName, 'encData': encryptData })
            .pipe(map(user => user));
    }
    getCompanyInfo() {
        const baseUrl = window.location.origin;
        const apiUrl = environment.apiUrl;
        console.log('comapanyInfo');
        return this.http.post<any>(this.url2, { 'url': baseUrl, 'apiurl': apiUrl })
            .pipe(map(user => user));

    }
    createUser(userId: string, password: string) {
        return this.http.post<any>(this.url3, { 'userName': userId, 'password': password })
            .pipe(map(user => user));
    }

    ckeckInstallation() {
        return this.http.get<any>(this.url4, {})
            .pipe(map(user => user));
    }

    // added code to add company info on jobportal during activation - sharmistha - 11-22-2019 - start
    addCompanyInfoToJobportal(data){
        return this.http.post<any>(this.url5, data)
            .pipe(map(user => user));
    }
    // added code to add company info on jobportal during activation - sharmistha - 11-22-2019 - end








}
