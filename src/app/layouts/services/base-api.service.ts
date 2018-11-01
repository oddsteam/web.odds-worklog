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

    callApi(url: string, method: string, params: any = {}): Observable<any> {
        if (method === 'get') { return this._get(url); }
        if (method === 'post') { return this._post(url, params); }
        if (method === 'put') { return this._put(url, params); }
    }

    login(params: any = {}): Observable<any> {
        return this.http.post(`${environment.api}login`, params);
    }

    private _post(url: string, params: any = {}): Observable<any> {
        return this.http.post(`${environment.api}${url}`, params, httpOptions);
    }

    private _get(url: string): Observable<any> {
        return this.http.get(`${environment.api}${url}`, httpOptions);
    }

    private _put(url: string, params: any = {}): Observable<any> {
        return this.http.put(`${environment.api}${url}`, params, httpOptions);
    }
}
