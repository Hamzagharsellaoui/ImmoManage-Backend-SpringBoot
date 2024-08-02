/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { BaseResponseDtoListTenantResponseDto } from '../../models/base-response-dto-list-tenant-response-dto';

export interface GetAllTenants$Params {
}

export function getAllTenants(http: HttpClient, rootUrl: string, params?: GetAllTenants$Params, context?: HttpContext): Observable<StrictHttpResponse<BaseResponseDtoListTenantResponseDto>> {
  const rb = new RequestBuilder(rootUrl, getAllTenants.PATH, 'get');
  if (params) {
  }

  return http.request(
    rb.build({ responseType: 'json', accept: '*/*', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<BaseResponseDtoListTenantResponseDto>;
    })
  );
}

getAllTenants.PATH = '/tenant/getAllTenants';
