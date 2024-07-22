/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { BaseResponseDtoString } from '../../models/base-response-dto-string';

export interface DeleteProperty$Params {
  id: number;
}

export function deleteProperty(http: HttpClient, rootUrl: string, params: DeleteProperty$Params, context?: HttpContext): Observable<StrictHttpResponse<BaseResponseDtoString>> {
  const rb = new RequestBuilder(rootUrl, deleteProperty.PATH, 'delete');
  if (params) {
    rb.path('id', params.id, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: '*/*', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<BaseResponseDtoString>;
    })
  );
}

deleteProperty.PATH = '/property/{id}';
