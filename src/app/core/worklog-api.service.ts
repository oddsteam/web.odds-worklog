import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { AddIncomeResponse } from '../shared/model/add-income-model-response';
import { Customers } from '../shared/model/customers';
import { IncomeFlag } from '../shared/model/income-flag';
import { ListIncomeResponse } from '../shared/model/list-income-model-response';
import { ProductOwner } from '../shared/model/product-owner';
import { SettingReminder } from '../shared/model/setting-reminder-model';
import { StatusTavi } from '../shared/model/status-tavi';
import { User } from '../shared/model/user';
import { Login } from './../shared/model/login';
import { Site } from './../shared/model/site';

@Injectable({
    providedIn: 'root'
})
export class WorklogApiService {
    listData: User[] = [];
    siteName: string;
    getCustomerId = new BehaviorSubject<string>(null);
    getProductOwnerId = new BehaviorSubject<string>(null);
    dailyIncome = '';
    id = sessionStorage.getItem('idUser');
    private userId = this.id;
    readonly apiPath = environment.api;
    individualListed: ListIncomeResponse;
    corporateListed: ListIncomeResponse;

    constructor(private http: HttpClient) {
        // this.initDataService();
    }

    getIndividualListed = () => this.individualListed;

    getCorporateListed = () => this.corporateListed;

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

    initDataService() {
        console.log('for check = ', this.forCheckTokenPleaseRemoveMeIfFlowLoginFinnished())
        this.forCheckTokenPleaseRemoveMeIfFlowLoginFinnished().subscribe( (checkTokenInterval) => {
            if (checkTokenInterval) {
                this.getListIncomeIndividual().subscribe(individual => {
                    this.individualListed = individual;
                });

                this.getListIncomeCorporate().subscribe(corporate => {
                    this.corporateListed = corporate;
                });
            }
        })
    }

    getHttpHeaderOption(): { headers: HttpHeaders } {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                Authorization: sessionStorage.getItem('token')
            })
        };
        return httpOptions;
    }

    updateUser(id: string, user: User): Observable<User> {
        return this.http.put<User>(`${this.apiPath}users/${id}`, user,
            this.getHttpHeaderOption()
        );
    }

    updateStatusTaviUser(statususer: Array<StatusTavi>): Observable<User> {
        return this.http.put<User>(`${this.apiPath}users/tavi`, statususer,
            this.getHttpHeaderOption()
        );
    }

    getLogin(): Observable<any> {
        return this.http.post<any>(`${this.apiPath}login`, { token: this.userId });
    }

    getLoginGoogle(idtoken: string): Observable<Login> {
        return this.http.post<any>(`${this.apiPath}login-google`, { 'token': idtoken });
    }

    getUserByID(id: string = this.userId) {
        return this.http.get<User>(
            `${this.apiPath}users/${id}`,
            this.getHttpHeaderOption(),
        );
    }

    getListIncomeCorporate(): Observable<ListIncomeResponse> {
        return this.http.get<ListIncomeResponse>(
            `${this.apiPath}incomes/status/corporate`,
            this.getHttpHeaderOption()
        );
    }

    getListIncomeIndividual(): Observable<ListIncomeResponse> {
        return this.http.get<ListIncomeResponse>(
            `${this.apiPath}incomes/status/individual`,
            this.getHttpHeaderOption()
        );
    }

    getIncomeByUserID(id: string): Observable<AddIncomeResponse> {
        return this.http.get<AddIncomeResponse>(
            `${this.apiPath}incomes/current-month/${id}`,
            this.getHttpHeaderOption()
        );
    }

    getIncomeAllMonthByUserID(id: string): Observable<AddIncomeResponse[]> {
        return this.http.get<AddIncomeResponse[]>(
            `${this.apiPath}incomes/all-month/${id}`,
            this.getHttpHeaderOption()
        );
    }

    addIncomeConfirm(data): Observable<AddIncomeResponse> {
        return this.http.post<AddIncomeResponse>(
            `${this.apiPath}incomes`,
            data,
            this.getHttpHeaderOption()
        );
    }

    updateIncomeService(data): Observable<AddIncomeResponse> {
        return this.http.put<AddIncomeResponse>(
            `${this.apiPath}incomes/${IncomeFlag.id}`,
            data,
            this.getHttpHeaderOption()
        );
    }

    exportDataCorporate(beforeMonth: string): Observable<Blob> {
        return this.http.get(`${this.apiPath}incomes/export/corporate/${beforeMonth}`, {
            headers: new HttpHeaders({
                Authorization: sessionStorage.getItem('token')
            }),
            responseType: 'blob'
        });
    }

    exportDataDifferentCorporate(): Observable<Blob> {
        return this.http.get(`${this.apiPath}incomes/export/corporate/different`, {
            headers: new HttpHeaders({
                Authorization: sessionStorage.getItem('token')
            }),
            responseType: 'blob'
        });
    }

    exportDataIndividual(beforeMonth: string): Observable<Blob> {
        return this.http.get(`${this.apiPath}incomes/export/individual/${beforeMonth}`, {
            headers: new HttpHeaders({
                Authorization: sessionStorage.getItem('token')
            }),
            responseType: 'blob'
        });
    }

    exportDataDifferentIndividuals(): Observable<Blob> {
        return this.http.get(`${this.apiPath}incomes/export/individual/different`, {
            headers: new HttpHeaders({
                Authorization: sessionStorage.getItem('token')
            }),
            responseType: 'blob'
        });
    }

    exportDataPdf(id: string): Observable<Blob> {
        return this.http.get(`${this.apiPath}incomes/export/pdf/${id}`, {
            headers: new HttpHeaders({
                Authorization: sessionStorage.getItem('token')
            }),
            responseType: 'blob'
        });
    }

    sendMessage(body): Observable<any> {
        return this.http.post(`${this.apiPath}reminder/setting`, body, {
            headers: new HttpHeaders({
                Authorization: sessionStorage.getItem('token')
            })
        });
    }

    getSettingData(): Observable<SettingReminder> {
        return this.http.get<SettingReminder>(`${this.apiPath}reminder/setting`, {
            headers: new HttpHeaders({
                Authorization: sessionStorage.getItem('token')
            })
        });
    }

    getUsersData(): Observable<User[]> {
        return this.http.get<User[]>(`${this.apiPath}users`, {
            headers: new HttpHeaders({
                Authorization: sessionStorage.getItem('token')
            })
        });
    }

    getSitesData(): Observable<Site[]> {
        return this.http.get<Site[]>(`${this.apiPath}sites`, {
            headers: new HttpHeaders({
                Authorization: sessionStorage.getItem('token')
            })
        });
    }

    getUserBySiteId(id: string): Observable<any> {
        return this.http.get(`${this.apiPath}users/site/${id}`, {
            headers: new HttpHeaders({
                Authorization: sessionStorage.getItem('token')
            })
        });
    }

    getListData() {
        return this.listData;
    }

    setListData(users: User[], siteName: string) {
        this.listData = users;
        this.siteName = siteName;
    }

    getSiteName() {
        return this.siteName;
    }

    getCustomerResponse(): Observable<Customers[]> {
        return this.http.get<Customers[]>(`${this.apiPath}customers`, {
            headers: new HttpHeaders({
                Authorization: sessionStorage.getItem('token')
            })
        });
    }

    getCustomerById(customerId): Observable<Customers[]> {
        return this.http.get<Customers[]>(`${this.apiPath}customers/${customerId}`, {
            headers: new HttpHeaders({
                Authorization: sessionStorage.getItem('token')
            })
        });
    }

    updateCustomerById(customerId, body): Observable<Customers[]> {
        return this.http.put<Customers[]>(`${this.apiPath}customers/${customerId}`, body, {
            headers: new HttpHeaders({
                Authorization: sessionStorage.getItem('token')
            })
        });
    }

    saveCustomerProfile(data): Observable<any> {
        return this.http.post(`${this.apiPath}customers`, data, {
            headers: new HttpHeaders({
                Authorization: sessionStorage.getItem('token')
            })
        });
    }

    deleteCustomer(id: string) {
        return this.http.delete(`${this.apiPath}customers/${id}`,
            this.getHttpHeaderOption(),
        );
    }

    setCustomerId(id: string) {
        this.getCustomerId.next(id);
    }

    getProductOwnerResponse(customerId: string): Observable<ProductOwner[]> {
        return this.http.get<ProductOwner[]>(`${this.apiPath}poes/customer/${customerId}`, {
            headers: new HttpHeaders({
                Authorization: sessionStorage.getItem('token')
            })
        });
    }

    saveProductOwner(data): Observable<any> {
        return this.http.post(`${this.apiPath}poes`, data, {
            headers: new HttpHeaders({
                Authorization: sessionStorage.getItem('token')
            })
        });
    }

    deleteProductOwner(id: string) {
        return this.http.delete(`${this.apiPath}poes/${id}`,
            this.getHttpHeaderOption(),
        );
    }

    setProductOwnerId(id: string) {
        this.getProductOwnerId.next(id);
    }

    getProductOwnerById(id: string) {
        return this.http.get<ProductOwner[]>(`${this.apiPath}poes/${id}`, {
            headers: new HttpHeaders({
                Authorization: sessionStorage.getItem('token')
            })
        });
    }

    updateProductOwner(id: string, body) {
        return this.http.put(`${this.apiPath}poes/${id}`, body, {
            headers: new HttpHeaders({
                Authorization: sessionStorage.getItem('token')
            })
        });
    }

    sendMailNotificationNewUser() {
        return this.http.post(`${this.apiPath}reminder/mail/${sessionStorage.getItem('idUser')}`, null, {
            headers: new HttpHeaders({
                Authorization: sessionStorage.getItem('token')
            })
        });
    }
    
    deleteUser(id: string) {
        return this.http.delete(`${this.apiPath}users/${id}`, {
            headers: new HttpHeaders({
                Authorization: sessionStorage.getItem('token')
            })
        });
    }

    getDailyIncome() {
        return this.dailyIncome;
    }

    setDailyIncoem(dailyIncome: string): string {
        return this.dailyIncome = dailyIncome;
    }
}
