import { Injectable } from '@angular/core';
import { BaseApiService } from '../base-api.service';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class LoginService {

    constructor(
        private baseService: BaseApiService
    ) { }

    getToken(): Observable<any> {
        return this.baseService._post('login', {'id': '5bd72d2a64b21800011be01f'}, false);
    }
}
