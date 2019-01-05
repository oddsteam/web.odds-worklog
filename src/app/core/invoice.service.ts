import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { InvoiceModel } from '../shared/model/invoice-model';
import { InvoiceNextNumberModel } from '../shared/model/invoice-next-number-model';

@Injectable({
    providedIn: 'root'
})
export class InvoiceService {

    constructor(
        private http: HttpClient
    ) { }

    getInvoiceList(): Observable<InvoiceModel> {
        return this.http.get<InvoiceModel>(`${environment.api}invoices`, {
            headers: new HttpHeaders({
                Authorization: sessionStorage.getItem('token')
            })
        });
    }

    getInvoiceListPoById(poId): Observable<InvoiceModel[]> {
        return this.http.get<InvoiceModel[]>(`${environment.api}invoices/po/${poId}`, {
            headers: new HttpHeaders({
                Authorization: sessionStorage.getItem('token')
            })
        });
    }

    getNextInvoiceNumber(poId): Observable<InvoiceNextNumberModel> {
        return this.http.get<InvoiceNextNumberModel>(`${environment.api}invoices/po/${poId}/next-no`, {
            headers: new HttpHeaders({
                Authorization: sessionStorage.getItem('token')
            })
        });
    }

    getInvoiceById(invoiceId): Observable<InvoiceModel> {
        return this.http.get<InvoiceModel>(`${environment.api}invoices/${invoiceId}`, {
            headers: new HttpHeaders({
                Authorization: sessionStorage.getItem('token')
            })
        });
    }

    createNewInvoice(body): Observable<InvoiceModel> {
        return this.http.post<InvoiceModel>(`${environment.api}invoices`, body, {
            headers: new HttpHeaders({
                Authorization: sessionStorage.getItem('token')
            })
        });
    }

    updateInvoice(invoiceId, body): Observable<InvoiceModel> {
        return this.http.put<InvoiceModel>(`${environment.api}invoices/${invoiceId}`, body, {
            headers: new HttpHeaders({
                Authorization: sessionStorage.getItem('token')
            })
        });
    }

    deleteInvoice(invoiceId): Observable<any> {
        return this.http.delete<any>(`${environment.api}invoices/${invoiceId}`, {
            headers: new HttpHeaders({
                Authorization: sessionStorage.getItem('token')
            })
        });
    }

}
