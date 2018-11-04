import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { AddIncome } from '../shared/model/add-income-model';
import { AddIncomeResponse } from '../shared/model/add-income-model-response';
import { IncomeFlag } from '../shared/model/income-flag';
import { ListIncomeResponse } from '../shared/model/list-income-model-response';
import { Users } from '../shared/model/user-model';

const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': sessionStorage.getItem('token')
    })
};


@Injectable({
    providedIn: 'root'
})
export class WorklogApiService {

    constructor(
        private http: HttpClient
    ) { }

    /*
    user test
        corporate  id = 5bde550643b39700012727f2
        individual id = 5bde4e2e1a044b8c9ce44fe4
    */

    getLogin(): Observable<any> {
        return this.http.post<any>(`${environment.api}login`, { 'id': '5bde550643b39700012727f2' });
    }

    getUserByID(id: string = '5bde550643b39700012727f2') {
        return this.http.get<Users>(`${environment.api}users/${id}`, httpOptions);
    }

    getListIncomeCorporate(): Observable<ListIncomeResponse> {
        return this.http.get<ListIncomeResponse>(`${environment.api}incomes/status/corporate`, httpOptions);
    }

    getListIncomeIndividual(): Observable<ListIncomeResponse> {
        return this.http.get<ListIncomeResponse>(`${environment.api}incomes/status/individual`, httpOptions);
    }

    // เช็คว่า add-income ไปรึยัง
    getIncomeByUserID(id: string = '5bde550643b39700012727f2'): Observable<AddIncomeResponse> {
        return this.http.get<AddIncomeResponse>(`${environment.api}incomes/month/${id}`, httpOptions);
    }

    addIncomeConfirm(data: AddIncome): Observable<AddIncomeResponse> {
        return this.http.post<AddIncomeResponse>(`${environment.api}incomes`, data, httpOptions);
    }

    updateIncomeService(data: AddIncome): Observable<AddIncomeResponse> {
        return this.http.put<AddIncomeResponse>(`${environment.api}incomes/${IncomeFlag.id}`, data, httpOptions);
    }

    exportDataCorporate(): Observable<any> {
        return this.http.get<any>(`${environment.api}incomes/export/corporate`);
    }

    exportDataIndividual(): Observable<any> {
        return this.http.get<any>(`${environment.api}incomes/export/individual`);
    }
}
