import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': sessionStorage.getItem('token')
    })
};

@Injectable({
    providedIn: 'root'
})
export class BaseApiService {

    constructor(private http: HttpClient) { }

    _post(url: string, params: any = {}, isReqHeader = true): Observable<any> {
        const headers = isReqHeader ? httpOptions : {};
        return this.http.post(`${environment.api}${url}`, params, headers);
    }

    _get(url: string): Observable<any> {
        return this.http.get(`${environment.api}${url}`, httpOptions);
    }

    _put(url: string, params: any = {}, isReqHeader = true): Observable<any> {
        const headers = isReqHeader ? httpOptions : {};
        return this.http.put(`${environment.api}${url}`, params, headers);
    }
}
