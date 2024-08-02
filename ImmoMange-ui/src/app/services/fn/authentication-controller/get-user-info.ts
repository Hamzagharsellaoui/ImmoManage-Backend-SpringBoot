import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { BaseResponseDtoUserInfoResponse } from '../../models/base-response-dto-user-info-response';
import {UserInfoRequest} from "../../models/user-info-request";

export interface GetUserInfoParams {
  id: number;
}

export function getUserInfo(http: HttpClient, rootUrl: string, params: number, context?: HttpContext): Observable<StrictHttpResponse<BaseResponseDtoUserInfoResponse>> {
  const rb = new RequestBuilder(rootUrl, getUserInfo.PATH, 'get');
  if (params) {
    rb.path("id",params);
  }

  return http.request(
    rb.build({ responseType: 'json', accept: '*/*', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<BaseResponseDtoUserInfoResponse>;
    })
  );
}

getUserInfo.PATH = '/User/info/{id}';
