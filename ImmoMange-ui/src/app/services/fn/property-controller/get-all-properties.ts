/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { BaseResponseDtoListPropertyResponseDto } from '../../models/base-response-dto-list-property-response-dto';

export interface GetAllProperties$Params {
}

export function getAllProperties(http: HttpClient, rootUrl: string, params?: GetAllProperties$Params, context?: HttpContext): Observable<StrictHttpResponse<BaseResponseDtoListPropertyResponseDto>> {
  const rb = new RequestBuilder(rootUrl, getAllProperties.PATH, 'get');
  if (params) {
  }

  return http.request(
    rb.build({ responseType: 'json', accept: '*/*', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<BaseResponseDtoListPropertyResponseDto>;
    })
  );
}

getAllProperties.PATH = '/property/properties';
