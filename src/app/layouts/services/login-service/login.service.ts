import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseApiService } from '../base-api.service';
import { Users } from '../../models/user-model';

@Injectable({
    providedIn: 'root'
})
export class LoginService {

    constructor(
        private baseService: BaseApiService
    ) { }

    getToken(): Promise<any> {
        return this.baseService.login({'id': '5bd72d2a64b21800011be01f'});
    }

    getDataUser(): Promise<Users> {
        return this.baseService.callApi('users/5bd72d2a64b21800011be01f', 'get');
    }
}
