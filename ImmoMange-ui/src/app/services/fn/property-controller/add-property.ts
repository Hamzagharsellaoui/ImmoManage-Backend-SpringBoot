/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { BaseResponseDtoPropertyResponseDto } from '../../models/base-response-dto-property-response-dto';

export interface AddProperty$Params {
  body: {
    'property': FormDataEntryValue[];
    'imageFile': FormDataEntryValue[];
  }
}

export function addProperty(http: HttpClient, rootUrl: string, params?: AddProperty$Params, context?: HttpContext): Observable<StrictHttpResponse<BaseResponseDtoPropertyResponseDto>> {
  const rb = new RequestBuilder(rootUrl, addProperty.PATH, 'post');
  if (params) {
    rb.body(params.body, 'multipart/form-data');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: '*/*', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<BaseResponseDtoPropertyResponseDto>;
    })
  );
}

addProperty.PATH = '/property/addProperty';
