/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { authentication } from '../fn/security-controller/authentication';
import { Authentication$Params } from '../fn/security-controller/authentication';

@Injectable({ providedIn: 'root' })
export class SecurityService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  authentication$Response(params: Authentication$Params, context?: HttpContext): Observable<StrictHttpResponse<'RSA' | 'DSS' | 'aNULL' | 'DH' | 'ECDH' | 'KRB5' | 'ECDSA' | 'PSK' | 'GOST94' | 'GOST01' | 'FZA' | 'SRP' | 'ANY'>> {
    return authentication(this.http, this.rootUrl, params, context);
  }

  authentication(params: Authentication$Params, context?: HttpContext): Observable<'RSA' | 'DSS' | 'aNULL' | 'DH' | 'ECDH' | 'KRB5' | 'ECDSA' | 'PSK' | 'GOST94' | 'GOST01' | 'FZA' | 'SRP' | 'ANY'> {
    return this.authentication$Response(params, context).pipe(
      map((r: StrictHttpResponse<'RSA' | 'DSS' | 'aNULL' | 'DH' | 'ECDH' | 'KRB5' | 'ECDSA' | 'PSK' | 'GOST94' | 'GOST01' | 'FZA' | 'SRP' | 'ANY'>): 'RSA' | 'DSS' | 'aNULL' | 'DH' | 'ECDH' | 'KRB5' | 'ECDSA' | 'PSK' | 'GOST94' | 'GOST01' | 'FZA' | 'SRP' | 'ANY' => r.body)
    );
  }
}
