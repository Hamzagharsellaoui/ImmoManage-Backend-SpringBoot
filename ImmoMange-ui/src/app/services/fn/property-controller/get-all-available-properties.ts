
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

import {BaseResponseDtoMapLongString} from "../../models/base-response-dto-list-long";
import {RequestBuilder} from "../../request-builder";
import {StrictHttpResponse} from "../../strict-http-response";

export interface GetAllAvailablePropertiesParams {
}
export function getAllAvailableProperties(http: HttpClient, rootUrl: string, params?: GetAllAvailablePropertiesParams, context?: HttpContext): Observable<StrictHttpResponse<BaseResponseDtoMapLongString>> {
  const rb = new RequestBuilder(rootUrl, getAllAvailableProperties.PATH, 'get');

  return http.request(
    rb.build({ responseType: 'json', accept: '*/*', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<BaseResponseDtoMapLongString>;
    })
  );
}

getAllAvailableProperties.PATH = '/property/availableProperties';
