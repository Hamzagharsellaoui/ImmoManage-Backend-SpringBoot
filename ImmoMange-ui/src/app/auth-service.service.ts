// import { Injectable } from '@angular/core';
// import {LoginRequestDto} from "./services/models/login-request-dto";
// import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
//
// import {RegisterRequestDto} from "./services/models/register-request-dto";
// import {Router} from "@angular/router";
// import {Observable} from "rxjs";
// import {BaseResponseDtoAuthenticationResponse} from "./services/models/base-response-dto-authentication-response";
//
// @Injectable({
//   providedIn: 'root'
// })
// export class AuthService {
//   isAuthenticated:boolean = false;
//   username:any;
//   accessToken: any;
//   constructor(private http: HttpClient,private router: Router) { }
//
//   private baseUrl = 'http://localhost:8080';
//   public login(loginRequest : LoginRequestDto):Observable<BaseResponseDtoAuthenticationResponse>  {
//     let options={
//       headers: new HttpHeaders().set("content-type", "application/json")
//     }
//     return this.http.post<any>(`${this.baseUrl}/user/login`,loginRequest,options)
//
//   }
//
//
//   public register(registerRequest : RegisterRequestDto):Observable<RegisterRequestDto> {
//       return this.http.post<any>(`${this.baseUrl}/user/register`,registerRequest);
//   }
//
//   logout(): void {
//     window.localStorage.removeItem('token');
//     this.isAuthenticated=false;
//     this.username=undefined;
//     this.accessToken=undefined;
//     this.router.navigateByUrl("/user/login");
//   }
// }
