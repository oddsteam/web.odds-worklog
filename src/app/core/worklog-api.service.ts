import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";
import { AddIncomeResponse } from "../shared/model/add-income-model-response";
import { IncomeFlag } from "../shared/model/income-flag";
import { ListIncomeResponse } from "../shared/model/list-income-model-response";
import { StatusTavi } from "../shared/model/status-tavi";
import { User } from "../shared/model/user";
import { Login } from "./../shared/model/login";
import { Site } from "./../shared/model/site";
import {RequestExportIncome, RequestExportSAPIncome} from "../shared/model/request-export-income";
import { SapExportFailureLog } from "../shared/model/sap-export-failure-log";

@Injectable({
  providedIn: "root",
})
export class WorklogApiService {
  listData: User[] = [];
  siteName: string;
  dailyIncome = "";
  id = sessionStorage.getItem("idUser");
  private userId = this.id;
  readonly apiPath = environment.api;
  individualListed: ListIncomeResponse;

  constructor(private http: HttpClient) {
    // this.initDataService();
  }

  getIndividualListed = () => this.individualListed;

  forCheckTokenPleaseRemoveMeIfFlowLoginFinnished(): Observable<any> {
    return Observable.create((observer) => {
      const checkTokenInterval = setInterval(() => {
        if (sessionStorage.getItem("token")) {
          observer.next();
          clearInterval(checkTokenInterval);
        }
      }, 200);
    });
  }

  initDataService() {
    this.forCheckTokenPleaseRemoveMeIfFlowLoginFinnished().subscribe(
      (checkTokenInterval) => {
        if (checkTokenInterval) {
          this.getListIncomeIndividual().subscribe((individual) => {
            this.individualListed = individual;
          });
        }
      }
    );
  }

  getHttpHeaderOption(): { headers: HttpHeaders } {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: sessionStorage.getItem("token"),
      }),
    };
    return httpOptions;
  }

  updateUser(id: string, user: User): Observable<User> {
    return this.http.put<User>(
      `${this.apiPath}v1/users/${id}`,
      user,
      this.getHttpHeaderOption()
    );
  }

  updateStatusTaviUser(statususer: Array<StatusTavi>): Observable<User> {
    return this.http.put<User>(
      `${this.apiPath}v1/users/tavi`,
      statususer,
      this.getHttpHeaderOption()
    );
  }

  getLogin(): Observable<any> {
    return this.http.post<any>(`${this.apiPath}v1/login`, {
      token: this.userId,
    });
  }

  loginWithKeycloak(idToken: string) {
    return this.http.post<any>(`${this.apiPath}v1/login-keycloak`, {
      token: idToken,
    });
  }

  getUserByID(id: string = this.userId) {
    return this.http.get<User>(
      `${this.apiPath}v1/users/${id}`,
      this.getHttpHeaderOption()
    );
  }

  getListIncomeIndividual(): Observable<ListIncomeResponse> {
    return this.http.get<ListIncomeResponse>(
      `${this.apiPath}v1/incomes/status/individual`,
      this.getHttpHeaderOption()
    );
  }

  getIncomeByUserID(id: string): Observable<AddIncomeResponse> {
    return this.http.get<AddIncomeResponse>(
      `${this.apiPath}v1/incomes/current-month/${id}`,
      this.getHttpHeaderOption()
    );
  }

  getIncomeAllMonthByUserID(id: string): Observable<AddIncomeResponse[]> {
    return this.http.get<AddIncomeResponse[]>(
      `${this.apiPath}v1/incomes/all-month/${id}`,
      this.getHttpHeaderOption()
    );
  }

  addIncomeConfirm(data): Observable<AddIncomeResponse> {
    return this.http.post<AddIncomeResponse>(
      `${this.apiPath}v1/incomes`,
      data,
      this.getHttpHeaderOption()
    );
  }

  updateIncomeService(data): Observable<AddIncomeResponse> {
    return this.http.put<AddIncomeResponse>(
      `${this.apiPath}v1/incomes/${IncomeFlag.id}`,
      data,
      this.getHttpHeaderOption()
    );
  }

  exportDataIndividual(beforeMonth: string): Observable<Blob> {
    return this.http.get(
      `${this.apiPath}v1/incomes/export/individual/${beforeMonth}`,
      {
        headers: new HttpHeaders({
          Authorization: sessionStorage.getItem("token"),
        }),
        responseType: "blob",
      }
    );
  }

  exportDataIncomeFromTimesheetIndividual(monthIndex: string): Observable<Blob> {
    return this.http.get(
      `${this.apiPath}v1/income-from-timesheet/export/individual/${monthIndex}`,
      {
        headers: new HttpHeaders({
          Authorization: sessionStorage.getItem("token"),
        }),
        responseType: "blob",
      }
    );
  }

  exportIncomeByMonth(requestExportIncome: RequestExportIncome) {
    return this.http.post(
      `${this.apiPath}v1/incomes/export`,
      requestExportIncome,
      {
        headers: new HttpHeaders({
          Authorization: sessionStorage.getItem("token"),
        }),
        responseType: "blob",
      }
    );
  }

    exportSAPIncomeByPeriod(req: RequestExportSAPIncome) {
        return this.http.post(
            `${this.apiPath}v1/incomes/export/format/SAP`,
            req,
            {
                headers: new HttpHeaders({
                    Authorization: sessionStorage.getItem("token"),
                }),
                responseType: "blob",
            }
        );
    }

  getUsersData(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiPath}v1/users`, {
      headers: new HttpHeaders({
        Authorization: sessionStorage.getItem("token"),
      }),
    });
  }

  getSapExportFailures(limit?: number): Observable<SapExportFailureLog[]> {
    let url = `${this.apiPath}v1/sap-export-failures`;
    if (limit != null && limit > 0) {
      url += `?limit=${encodeURIComponent(String(limit))}`;
    }
    return this.http.get<SapExportFailureLog[]>(url, this.getHttpHeaderOption());
  }

  getSitesData(): Observable<Site[]> {
    return this.http.get<Site[]>(`${this.apiPath}v1/sites`, {
      headers: new HttpHeaders({
        Authorization: sessionStorage.getItem("token"),
      }),
    });
  }

  createSite(site: { name: string; color?: string }): Observable<Site> {
    return this.http.post<Site>(
      `${this.apiPath}v1/sites`,
      site,
      this.getHttpHeaderOption()
    );
  }

  updateSite(id: string, site: { name: string; color?: string }): Observable<Site> {
    return this.http.put<Site>(
      `${this.apiPath}v1/sites/${id}`,
      site,
      this.getHttpHeaderOption()
    );
  }

  deleteSite(id: string) {
    return this.http.delete(`${this.apiPath}v1/sites/${id}`, {
      headers: new HttpHeaders({
        Authorization: sessionStorage.getItem("token"),
      }),
    });
  }

  getUserBySiteId(id: string): Observable<any> {
    return this.http.get(`${this.apiPath}v1/users/site/${id}`, {
      headers: new HttpHeaders({
        Authorization: sessionStorage.getItem("token"),
      }),
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

  deleteUser(id: string) {
    return this.http.delete(`${this.apiPath}v1/users/${id}`, {
      headers: new HttpHeaders({
        Authorization: sessionStorage.getItem("token"),
      }),
    });
  }

  getDailyIncome() {
    return this.dailyIncome;
  }

  setDailyIncoem(dailyIncome: string): string {
    return (this.dailyIncome = dailyIncome);
  }
}
