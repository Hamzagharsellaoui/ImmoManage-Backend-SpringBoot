/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { BaseResponseDtoTenantDto } from '../../models/base-response-dto-tenant-dto';
import { TenantDto } from '../../models/tenant-dto';

export interface UpdateTenant$Params {
  id: number;
      body: TenantDto
}

export function updateTenant(http: HttpClient, rootUrl: string, params: UpdateTenant$Params, context?: HttpContext): Observable<StrictHttpResponse<BaseResponseDtoTenantDto>> {
  const rb = new RequestBuilder(rootUrl, updateTenant.PATH, 'put');
  if (params) {
    rb.path('id', params.id, {});
    rb.body(params.body, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: '*/*', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<BaseResponseDtoTenantDto>;
    })
  );
}

updateTenant.PATH = '/tenant/{id}';
