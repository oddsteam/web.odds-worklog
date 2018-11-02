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
        corporate  id = 5bd72d2a64b21800011be01f
        individual id = 5bdc60581eedf60001022559
    */

    getLogin(): Observable<any> {
        return this.http.post<any>(`${environment.api}login`, { 'id': '5bd72d2a64b21800011be01f' });
    }

    getUserByID(id: string = '5bd72d2a64b21800011be01f') {
        return this.http.get<Users>(`${environment.api}users/${id}`, httpOptions);
    }

    getListIncomeCorporate(): Observable<ListIncomeResponse> {
        return this.http.get<ListIncomeResponse>(`${environment.api}incomes/status/corporate`, httpOptions);
    }

    getListIncomeIndividual(): Observable<ListIncomeResponse> {
        return this.http.get<ListIncomeResponse>(`${environment.api}incomes/status/individual`, httpOptions);
    }

    // เช็คว่า add-income ไปรึยัง
    getIncomeByUserID(id: string = '5bd72d2a64b21800011be01f'): Observable<AddIncomeResponse> {
        return this.http.get<AddIncomeResponse>(`${environment.api}incomes/month/${id}`, httpOptions);
    }

    addIncomeConfirm(data: AddIncome): Observable<AddIncomeResponse> {
        return this.http.post<AddIncomeResponse>(`${environment.api}incomes`, data, httpOptions);
    }

    updateIncomeService(data: AddIncome): Observable<AddIncomeResponse> {
        return this.http.put<AddIncomeResponse>(`${environment.api}incomes/${IncomeFlag.id}`, data, httpOptions);
    }
}
