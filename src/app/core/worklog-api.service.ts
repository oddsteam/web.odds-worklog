import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { AddIncomeResponse } from '../shared/model/add-income-model-response';
import { IncomeFlag } from '../shared/model/income-flag';
import { ListIncomeResponse } from '../shared/model/list-income-model-response';
import { Users } from '../shared/model/user-model';
import { SettingReminder } from '../shared/model/setting-reminder-model';

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
    readonly apiPath = environment.api;
    readonly token = sessionStorage.getItem('token');

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
                'Authorization': this.token
            })
        };
        return httpOptions;
    }

    // testLocal(): Observable<any> {
    //     return this.http.post<any>(`${environment.local}login`, { 'token': this.userId });
    // }

    getLogin(): Observable<any> {
        return this.http.post<any>(`${this.apiPath}login`, { 'token': this.userId });
    }

    getUserByID(id: string = this.userId) {
        return this.http.get<Users>(`${this.apiPath}users/${id}`, this.getHttpHeaderOption());
    }

    getListIncomeCorporate(): Observable<ListIncomeResponse> {
        return this.http.get<ListIncomeResponse>(`${this.apiPath}incomes/status/corporate`, this.getHttpHeaderOption());
    }

    getListIncomeIndividual(): Observable<ListIncomeResponse> {
        return this.http.get<ListIncomeResponse>(`${this.apiPath}incomes/status/individual`, this.getHttpHeaderOption());
    }

    // เช็คว่า add-income ไปรึยัง
    getIncomeByUserID(id: string = this.userId): Observable<AddIncomeResponse> {
        return this.http.get<AddIncomeResponse>(`${this.apiPath}incomes/month/${id}`, this.getHttpHeaderOption());
    }

    addIncomeConfirm(data): Observable<AddIncomeResponse> {
        return this.http.post<AddIncomeResponse>(`${this.apiPath}incomes`, data, this.getHttpHeaderOption());
    }

    updateIncomeService(data): Observable<AddIncomeResponse> {
        return this.http.put<AddIncomeResponse>(`${this.apiPath}incomes/${IncomeFlag.id}`, data, this.getHttpHeaderOption());
    }
    exportDataCorporate(): Observable<Blob> {
        return this.http.get(`${this.apiPath}incomes/export/corporate`, {
            headers: new HttpHeaders({
                'Authorization': this.token
            }),
            responseType: 'blob'
        });
    }

    exportDataIndividual(): Observable<Blob> {
        return this.http.get(`${this.apiPath}incomes/export/individual`, {
            headers: new HttpHeaders({
                'Authorization': this.token
            }),
            responseType: 'blob'
        });
    }

    exportDataPdf(): Observable<Blob> {
        return this.http.get(`${this.apiPath}incomes/export/pdf`, {
            headers: new HttpHeaders({
                'Authorization': this.token
            }),
            responseType: 'blob'
        });
    }

    sendMessage(body): Observable<any> {
        return this.http.post(`${this.apiPath}setting/reminder`, body, {
            headers: new HttpHeaders({
                'Authorization': this.token
            })
        });
    }

    getSettingData(): Observable<SettingReminder> {
        return this.http.get<SettingReminder>(`${this.apiPath}setting/reminder`, {
            headers: new HttpHeaders({
                'Authorization': this.token
            })
        });
    }
}
