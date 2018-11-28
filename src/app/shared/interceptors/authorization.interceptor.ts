// import { HttpInterceptor } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { Router } from '@angular/router';
// import { AuthService } from 'angular-6-social-login';
// import { WorklogApiService } from 'src/app/core/worklog-api.service';

// @Injectable()
// export class AuthorizationInterceptor implements HttpInterceptor {

//   constructor(private socialAuthService: AuthService,
//     private router: Router,
//     private worklogService: WorklogApiService) { }

//   // intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

//   //     let socialPlatformProvider;
//   //     socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
//   //     this.socialAuthService.signIn(socialPlatformProvider).then(
//   //       (userData) => {
//   //         console.log(' sign in data : ', userData);
//   //         sessionStorage.setItem('name', userData.name);
//   //         this.worklogService.getLoginGoogle(userData.idToken).subscribe(res => {
//   //           if (res.firstLogin === 'N') {
//   //             sessionStorage.setItem('token', 'Bearer ' + res.token);
//   //             this.router.navigate(['corporate']);
//   //           } else {
//   //             this.router.navigate(['firstlogin']);
//   //           }
//   //         });
//   //       }
//   //     );
//   //     return next.handle(request);
//   // }
// }
