import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseApiService } from '../base-api.service';
import { Users } from '../../models/get-income.model';

@Injectable({
    providedIn: 'root'
})
export class LoginService {

    constructor(
        private baseService: BaseApiService
    ) { }

    getToken(): Promise<any> {
        return this.baseService.login({'id': '5bd6826bb22b9b00010ad95a'});
    }

    getDataUser(): Promise<Users> {
        return this.baseService.callApi('users/5bd6826bb22b9b00010ad95a', 'get');
    }
}
