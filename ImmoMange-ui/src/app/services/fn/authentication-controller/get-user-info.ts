import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { BaseResponseDtoUserInfoResponse } from '../../models/base-response-dto-user-info-response';
import {UserInfoRequest} from "../../models/user-info-request";

export interface GetUserInfoParams {
  email: UserInfoRequest;
}

export function getUserInfo(http: HttpClient, rootUrl: string, params: GetUserInfoParams, context?: HttpContext): Observable<StrictHttpResponse<BaseResponseDtoUserInfoResponse>> {
  const rb = new RequestBuilder(rootUrl, getUserInfo.PATH, 'get');
  console.log('Params:', params);
  if (params) {
    rb.query('userInfoRequest',params, {});
    console.log('Params:', params);
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

getUserInfo.PATH = '/User/info';
