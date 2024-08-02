/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { BaseResponseDtoTenantResponseDto } from '../../models/base-response-dto-tenant-response-dto';

export interface GetTenant$Params {
  id: number;
}

export function getTenant(http: HttpClient, rootUrl: string, params: GetTenant$Params, context?: HttpContext): Observable<StrictHttpResponse<BaseResponseDtoTenantResponseDto>> {
  const rb = new RequestBuilder(rootUrl, getTenant.PATH, 'get');
  if (params) {
    rb.path('id', params.id, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: '*/*', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<BaseResponseDtoTenantResponseDto>;
    })
  );
}

getTenant.PATH = '/tenant/getTenant/id';
