/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';
import { BaseResponseDtoAuthenticationResponse } from '../models/base-response-dto-authentication-response';
import { BaseResponseDtoString } from '../models/base-response-dto-string';
import {loginUser, LoginUser$Params} from '../fn/authentication-controller/login-user';
import {registerUser, RegisterUser$Params} from '../fn/authentication-controller/register-user';


@Injectable({ providedIn: 'root' })
export class AuthenticationService extends BaseService {
  isAuthenticate:boolean= false;
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  loginUser$Response(params: LoginUser$Params, context?: HttpContext): Observable<StrictHttpResponse<BaseResponseDtoAuthenticationResponse>> {
    return loginUser(this.http, this.rootUrl, params, context);
  }
  loginUser(params: LoginUser$Params, context?: HttpContext): Observable<BaseResponseDtoAuthenticationResponse> {
    this.isAuthenticate=true;
    return this.loginUser$Response(params, context).pipe(
      map((r: StrictHttpResponse<BaseResponseDtoAuthenticationResponse>): BaseResponseDtoAuthenticationResponse => r.body)
    );
  }

  registerUser$Response(params: RegisterUser$Params, context?: HttpContext): Observable<StrictHttpResponse<BaseResponseDtoString>> {
    return registerUser(this.http, this.rootUrl, params, context);
  }

  registerUser(params: RegisterUser$Params, context?: HttpContext): Observable<BaseResponseDtoString> {
    return this.registerUser$Response(params, context).pipe(
      map((r: StrictHttpResponse<BaseResponseDtoString>): BaseResponseDtoString => r.body)
    );
  }
  isAuthenticated(): boolean {
    return this.isAuthenticate;
  }
  logout() {
    this.isAuthenticate=false;
    localStorage.clear();
  }


}
