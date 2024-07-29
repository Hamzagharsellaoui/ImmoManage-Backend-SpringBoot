/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { addProperty } from '../fn/property-controller/add-property';
import { AddProperty$Params } from '../fn/property-controller/add-property';
import { BaseResponseDtoListPropertyResponseDto } from '../models/base-response-dto-list-property-response-dto';
import { BaseResponseDtoPropertyResponseDto } from '../models/base-response-dto-property-response-dto';
import { BaseResponseDtoString } from '../models/base-response-dto-string';
import { deleteProperty } from '../fn/property-controller/delete-property';
import { DeleteProperty$Params } from '../fn/property-controller/delete-property';
import { getProperty } from '../fn/property-controller/get-property';
import { GetProperty$Params } from '../fn/property-controller/get-property';
import { updateProperty } from '../fn/property-controller/update-property';
import { UpdateProperty$Params } from '../fn/property-controller/update-property';
import {getAllProperties, GetAllProperties$Params} from "../fn/property-controller/get-all-properties";

@Injectable({ providedIn: 'root' })
export class PropertyService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  getProperty$Response(params: GetProperty$Params, context?: HttpContext): Observable<StrictHttpResponse<BaseResponseDtoPropertyResponseDto>> {
    return getProperty(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getProperty$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getProperty(params: GetProperty$Params, context?: HttpContext): Observable<BaseResponseDtoPropertyResponseDto> {
    return this.getProperty$Response(params, context).pipe(
      map((r: StrictHttpResponse<BaseResponseDtoPropertyResponseDto>): BaseResponseDtoPropertyResponseDto => r.body)
    );
  }

  /** Path part for operation `updateProperty()` */
  static readonly UpdatePropertyPath = '/property/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateProperty()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateProperty$Response(params: UpdateProperty$Params, context?: HttpContext): Observable<StrictHttpResponse<BaseResponseDtoPropertyResponseDto>> {
    return updateProperty(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `updateProperty$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateProperty(params: UpdateProperty$Params, context?: HttpContext): Observable<BaseResponseDtoPropertyResponseDto> {
    return this.updateProperty$Response(params, context).pipe(
      map((r: StrictHttpResponse<BaseResponseDtoPropertyResponseDto>): BaseResponseDtoPropertyResponseDto => r.body)
    );
  }

  /** Path part for operation `deleteProperty()` */
  static readonly DeletePropertyPath = '/property/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteProperty()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteProperty$Response(params: DeleteProperty$Params, context?: HttpContext): Observable<StrictHttpResponse<BaseResponseDtoString>> {
    return deleteProperty(this.http, this.rootUrl, params, context);
  }

  deleteProperty(params: DeleteProperty$Params, context?: HttpContext): Observable<BaseResponseDtoString> {
    return this.deleteProperty$Response(params, context).pipe(
      map((r: StrictHttpResponse<BaseResponseDtoString>): BaseResponseDtoString => r.body)
    );
  }

  static readonly AddPropertyPath = '/property';

  addProperty$Response(params: AddProperty$Params, context?: HttpContext): Observable<StrictHttpResponse<BaseResponseDtoPropertyResponseDto>> {
    return addProperty(this.http, this.rootUrl, params, context);
  }
  addProperty(params: AddProperty$Params, context?: HttpContext): Observable<BaseResponseDtoPropertyResponseDto> {
    return this.addProperty$Response(params, context).pipe(
      map((r: StrictHttpResponse<BaseResponseDtoPropertyResponseDto>): BaseResponseDtoPropertyResponseDto => r.body)
    );
  }
  static readonly GetAllProperties1Path = 'property/properties';

  getAllProperties$Response(params?: GetAllProperties$Params, context?: HttpContext): Observable<StrictHttpResponse<BaseResponseDtoListPropertyResponseDto>> {
    return getAllProperties(this.http, this.rootUrl, params, context);
  }

  getAllProperties(params?: GetAllProperties$Params, context?: HttpContext): Observable<BaseResponseDtoListPropertyResponseDto> {
    return this.getAllProperties$Response(params, context).pipe(
      map((r: StrictHttpResponse<BaseResponseDtoListPropertyResponseDto>): BaseResponseDtoListPropertyResponseDto => r.body)
    );
  }

}
