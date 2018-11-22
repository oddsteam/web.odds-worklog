import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { AddIncomeResponse } from '../shared/model/add-income-model-response';
import { IncomeFlag } from '../shared/model/income-flag';
import { ListIncomeResponse } from '../shared/model/list-income-model-response';
import { Users } from '../shared/model/user-model';

// const httpOptions = {
//     headers: new HttpHeaders({
//         'Content-Type': 'application/json',
//         'Authorization': sessionStorage.getItem('token')
//     })
// };

@Injectable({
    providedIn: 'root'
})
export class WorklogApiService {

    // user test
    private corporateId = '5bde550643b39700012727f2';
    private individualId = '5bde4e2e1a044b8c9ce44fe4';
    private testMongo = '5bf6be9d4d844cb8f8465475';
    private userId = this.individualId;

    constructor(
        private http: HttpClient
    ) { }

    /*
    user test
        corporate  id = 5bde550643b39700012727f2
        individual id = 5bde4e2e1a044b8c9ce44fe4
    */

    forCheckTokenPleaseRemoveMeIfFlowLoginFinnished(): Observable<any> {
        return Observable.create(observer => {
            const checkTokenInterval = setInterval(() => {
                if (sessionStorage.getItem('token')) {
                    observer.next();
                    clearInterval(checkTokenInterval);
                }
            }, 200);
        });
    }

    getHttpHeaderOption(): { headers: HttpHeaders } {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': sessionStorage.getItem('token')
            })
        };
        return httpOptions;
    }

    // testLocal(): Observable<any> {
    //     return this.http.post<any>(`${environment.api}login`, { 'token': this.userId });
    // }

    getLogin(): Observable<any> {
        return this.http.post<any>(`${environment.api}login`, { 'token': this.userId });
    }

    getUserByID(id: string = this.userId) {
        return this.http.get<Users>(`${environment.api}users/${id}`, this.getHttpHeaderOption());
    }

    getListIncomeCorporate(): Observable<ListIncomeResponse> {
        return this.http.get<ListIncomeResponse>(`${environment.api}incomes/status/corporate`, this.getHttpHeaderOption());
    }

    getListIncomeIndividual(): Observable<ListIncomeResponse> {
        return this.http.get<ListIncomeResponse>(`${environment.api}incomes/status/individual`, this.getHttpHeaderOption());
    }

    // เช็คว่า add-income ไปรึยัง
    getIncomeByUserID(id: string = this.userId): Observable<AddIncomeResponse> {
        return this.http.get<AddIncomeResponse>(`${environment.api}incomes/month/${id}`, this.getHttpHeaderOption());
    }

    addIncomeConfirm(data): Observable<AddIncomeResponse> {
        return this.http.post<AddIncomeResponse>(`${environment.api}incomes`, data, this.getHttpHeaderOption());
    }

    updateIncomeService(data): Observable<AddIncomeResponse> {
        return this.http.put<AddIncomeResponse>(`${environment.api}incomes/${IncomeFlag.id}`, data, this.getHttpHeaderOption());
    }

    exportDataCorporate(): Observable<Blob> {
        return this.http.get(`${environment.api}incomes/export/corporate`, {
            headers: new HttpHeaders({
                'Authorization': sessionStorage.getItem('token')
            }),
            responseType: 'blob'
        });
    }

    exportDataIndividual(): Observable<Blob> {
        return this.http.get(`${environment.api}incomes/export/individual`, {
            headers: new HttpHeaders({
                'Authorization': sessionStorage.getItem('token')
            }),
            responseType: 'blob'
        });
    }

    exportDataPdf(): Observable<Blob> {
        return this.http.get(`${environment.api}incomes/export/pdf`, {
            headers: new HttpHeaders({
                'Authorization': sessionStorage.getItem('token')
            }),
            responseType: 'blob'
        });
    }
}
