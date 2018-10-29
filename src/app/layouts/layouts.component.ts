import { Component, OnInit } from '@angular/core';
import { LoginService } from './services/login-service/login.service';
import { TokenModel } from './models/token.model';

@Component({
    selector: 'app-layouts',
    templateUrl: './layouts.component.html',
    styleUrls: ['./layouts.component.scss']
})
export class LayoutsComponent implements OnInit {

    constructor(
        private login: LoginService
    ) {
        this.login.getToken().then(res => {
            TokenModel.token = res.token;
            console.log(TokenModel.token);
        });
    }

    ngOnInit() {
    }
}
