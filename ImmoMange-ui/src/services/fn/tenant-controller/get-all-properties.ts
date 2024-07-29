/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { BaseResponseDtoListTenant } from '../../models/base-response-dto-list-tenant';

export interface GetAllTenants$Params {
}

export function getAllProperties(http: HttpClient, rootUrl: string, params?: GetAllTenants$Params, context?: HttpContext): Observable<StrictHttpResponse<BaseResponseDtoListTenant>> {
  const rb = new RequestBuilder(rootUrl, getAllProperties.PATH, 'get');
  if (params) {
  }

  return http.request(
    rb.build({ responseType: 'json', accept: '*/*', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<BaseResponseDtoListTenant>;
    })
  );
}

getAllProperties.PATH = 'User/tenant';
