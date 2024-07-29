/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';


export interface Authentication$Params {
  authentication: 'RSA' | 'DSS' | 'aNULL' | 'DH' | 'ECDH' | 'KRB5' | 'ECDSA' | 'PSK' | 'GOST94' | 'GOST01' | 'FZA' | 'SRP' | 'ANY';
}

export function authentication(http: HttpClient, rootUrl: string, params: Authentication$Params, context?: HttpContext): Observable<StrictHttpResponse<'RSA' | 'DSS' | 'aNULL' | 'DH' | 'ECDH' | 'KRB5' | 'ECDSA' | 'PSK' | 'GOST94' | 'GOST01' | 'FZA' | 'SRP' | 'ANY'>> {
  const rb = new RequestBuilder(rootUrl, authentication.PATH, 'get');
  if (params) {
    rb.query('authentication', params.authentication, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: '*/*', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<'RSA' | 'DSS' | 'aNULL' | 'DH' | 'ECDH' | 'KRB5' | 'ECDSA' | 'PSK' | 'GOST94' | 'GOST01' | 'FZA' | 'SRP' | 'ANY'>;
    })
  );
}

authentication.PATH = '/auth/profile';
