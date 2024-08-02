/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { addProperty, AddProperty$Params} from '../fn/property-controller/add-property';
import { BaseResponseDtoListPropertyResponseDto } from '../models/base-response-dto-list-property-response-dto';
import { BaseResponseDtoPropertyResponseDto } from '../models/base-response-dto-property-response-dto';
import { BaseResponseDtoString } from '../models/base-response-dto-string';
import { deleteProperty, DeleteProperty$Params} from '../fn/property-controller/delete-property';
import { getAllProperties, GetAllProperties$Params} from '../fn/property-controller/get-all-properties';
import { getProperty, GetProperty$Params} from '../fn/property-controller/get-property';
import { updateProperty, UpdateProperty$Params} from '../fn/property-controller/update-property';
import {getAllAvailableProperties,GetAllAvailablePropertiesParams}from "../fn/property-controller/get-all-available-properties";
import {BaseResponseDtoMapLongString} from "../models/base-response-dto-list-long";

@Injectable({ providedIn: 'root' })
export class PropertyService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  getProperty$Response(params: GetProperty$Params, context?: HttpContext): Observable<StrictHttpResponse<BaseResponseDtoPropertyResponseDto>> {
    return getProperty(this.http, this.rootUrl, params, context);
  }

  getProperty(params: GetProperty$Params, context?: HttpContext): Observable<BaseResponseDtoPropertyResponseDto> {
    return this.getProperty$Response(params, context).pipe(
      map((r: StrictHttpResponse<BaseResponseDtoPropertyResponseDto>): BaseResponseDtoPropertyResponseDto => r.body)
    );
  }

  updateProperty$Response(params: UpdateProperty$Params, context?: HttpContext): Observable<StrictHttpResponse<BaseResponseDtoPropertyResponseDto>> {
    return updateProperty(this.http, this.rootUrl, params, context);
  }

  updateProperty(params: UpdateProperty$Params, context?: HttpContext): Observable<BaseResponseDtoPropertyResponseDto> {
    return this.updateProperty$Response(params, context).pipe(
      map((r: StrictHttpResponse<BaseResponseDtoPropertyResponseDto>): BaseResponseDtoPropertyResponseDto => r.body)
    );
  }

  deleteProperty$Response(params: DeleteProperty$Params, context?: HttpContext): Observable<StrictHttpResponse<BaseResponseDtoString>> {
    return deleteProperty(this.http, this.rootUrl, params, context);
  }

  deleteProperty(params: DeleteProperty$Params, context?: HttpContext): Observable<BaseResponseDtoString> {
    return this.deleteProperty$Response(params, context).pipe(
      map((r: StrictHttpResponse<BaseResponseDtoString>): BaseResponseDtoString => r.body)
    );
  }

  addProperty$Response(params: AddProperty$Params, context?: HttpContext): Observable<StrictHttpResponse<BaseResponseDtoPropertyResponseDto>> {
    return addProperty(this.http, this.rootUrl, params, context);
  }

  addProperty(params: AddProperty$Params, context?: HttpContext): Observable<BaseResponseDtoPropertyResponseDto> {
    return this.addProperty$Response(params, context).pipe(
      map((r: StrictHttpResponse<BaseResponseDtoPropertyResponseDto>): BaseResponseDtoPropertyResponseDto => r.body)
    );
  }

  getAllProperties$Response(params?: GetAllProperties$Params, context?: HttpContext): Observable<StrictHttpResponse<BaseResponseDtoListPropertyResponseDto>> {
    return getAllProperties(this.http, this.rootUrl, params, context);
  }

  getAllProperties(params?: GetAllProperties$Params, context?: HttpContext): Observable<BaseResponseDtoListPropertyResponseDto> {
    return this.getAllProperties$Response(params, context).pipe(
      map((r: StrictHttpResponse<BaseResponseDtoListPropertyResponseDto>): BaseResponseDtoListPropertyResponseDto => r.body)
    );
  }
  getAllAvailableProperties$Response(params?: GetAllAvailablePropertiesParams, context?: HttpContext): Observable<StrictHttpResponse<BaseResponseDtoMapLongString>> {
    return getAllAvailableProperties(this.http, this.rootUrl, params, context);
  }

  getAllAvailableProperties(params?: GetAllAvailablePropertiesParams, context?: HttpContext): Observable<BaseResponseDtoMapLongString> {
    return this.getAllAvailableProperties$Response(params, context).pipe(
      map((r: StrictHttpResponse<BaseResponseDtoMapLongString>): BaseResponseDtoMapLongString => r.body)
    );
  }

}
