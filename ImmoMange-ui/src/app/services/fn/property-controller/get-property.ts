import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';
import { BaseResponseDtoPropertyResponseDto } from '../../models/base-response-dto-property-response-dto';

export interface GetProperty$Params {
  id: number;
}

export function getProperty(http: HttpClient, rootUrl: string, params: GetProperty$Params, context?: HttpContext | undefined): Observable<StrictHttpResponse<BaseResponseDtoPropertyResponseDto>> {
  const rb = new RequestBuilder(rootUrl, getProperty.PATH, 'get');
  console.log(params);
  if (params) {

    rb.path('id', params.id,{});
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

getProperty.PATH = '/property/id';
