import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { TokenModel } from '../models/token.model';

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

    callApi(url: string, method: string, params: any = {}): Promise<any> {
        if (method === 'post') {
            return this._post(url, params);
        } else {
            return this._get(url);
        }
    }

    login(params: any = {}): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http.post(`${environment.api}login`, params).toPromise().then(res => {
                resolve(res);
            }, msg => {
                reject(msg);
            });
        });
    }

    private _post(url: string, params: any = {}): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http.post(`${environment.api}${url}`, params, httpOptions).toPromise()
                .then(res => {
                    resolve(res);
                }, msg => {
                    reject(msg);
                });
        });
    }

    private _get(url: string): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http.get(`${environment.api}${url}`, httpOptions).toPromise()
                .then(res => {
                    resolve(res);
                }, msg => {
                    reject(msg);
                });
        });
    }
}
