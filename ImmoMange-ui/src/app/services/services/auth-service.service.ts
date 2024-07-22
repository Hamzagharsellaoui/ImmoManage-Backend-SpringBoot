import { Injectable } from '@angular/core';
import {LoginRequestDto} from "../models/login-request-dto";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {AuthenticationResponse} from "../models/authentication-response";
import {jwtDecode} from "jwt-decode";
import {RegisterRequestDto} from "../models/register-request-dto";
import {Router} from "@angular/router";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isAuthenticated:boolean = false;
  username:any;
  accessToken: any;
  constructor(private http: HttpClient,private router: Router) { }


  public login(loginRequest : LoginRequestDto)  {
    let options={
      headers: new HttpHeaders().set("content-type", "application/json")
    }
    return this.http.post("http://localhost:8080/user/login",loginRequest,options)
  }

  loadProfile(data: any) {
    this.isAuthenticated = true;
    this.accessToken=data['access_token'];
    let decodedJwt:any =jwtDecode(this.accessToken);
    this.username=decodedJwt.sub;
    window.localStorage.setItem('token',this.accessToken);
  }
  public register(registerRequest : RegisterRequestDto):Observable<RegisterRequestDto> {
      return this.http.post<any>("http://localhost:8080/user/register",registerRequest);
  }

  logout(): void {
    window.localStorage.removeItem('token');
    this.isAuthenticated=false;
    this.username=undefined;
    this.accessToken=undefined;
    this.router.navigateByUrl("/user/login");
  }

  loadJwtTokenFromLocalStorage() {
    let token= window.localStorage.getItem('token');
    if(token){
      this.loadProfile({"access-token":token});
      this.router.navigateByUrl("/Home");
    }
  }
}
