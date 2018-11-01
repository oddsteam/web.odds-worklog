import { Component, OnInit } from '@angular/core';
import { LoginService } from './services/login-service/login.service';

@Component({
    selector: 'app-layouts',
    templateUrl: './layouts.component.html',
    styleUrls: ['./layouts.component.scss']
})
export class LayoutsComponent implements OnInit {

    constructor(
        private login: LoginService,
    ) {
        this.login.getToken().subscribe(res => {
            console.log(res);
            sessionStorage.setItem('token', 'Bearer ' + res.token);
            console.log(sessionStorage.getItem('token'));
        });
    }

    ngOnInit() {
    }
}
