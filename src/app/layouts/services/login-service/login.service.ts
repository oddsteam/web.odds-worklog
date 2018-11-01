import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseApiService } from '../base-api.service';
import { Users } from '../../models/user-model';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class LoginService {

    constructor(
        private baseService: BaseApiService
    ) { }

    getToken(): Observable<any> {
        return this.baseService.login({'id': '5bd72d2a64b21800011be01f'});
    }
}
