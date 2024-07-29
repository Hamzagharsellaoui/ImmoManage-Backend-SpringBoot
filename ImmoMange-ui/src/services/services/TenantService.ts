/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { addTenant } from '../fn/tenant-controller/add-tenant';
import { AddTenant$Params } from '../fn/tenant-controller/add-tenant';
import { BaseResponseDtoListTenant } from '../models/base-response-dto-list-tenant';
import { BaseResponseDtoString } from '../models/base-response-dto-string';
import { BaseResponseDtoTenantDto } from '../models/base-response-dto-tenant-dto';
import { deleteTenant } from '../fn/tenant-controller/delete-tenant';
import { DeleteTenant$Params } from '../fn/tenant-controller/delete-tenant';
import {getAllProperties, GetAllTenants$Params} from '../fn/tenant-controller/get-all-properties';
import { getTenant } from '../fn/tenant-controller/get-tenant';
import { GetTenant$Params } from '../fn/tenant-controller/get-tenant';
import { updateTenant } from '../fn/tenant-controller/update-tenant';
import { UpdateTenant$Params } from '../fn/tenant-controller/update-tenant';

@Injectable({ providedIn: 'root' })
export class TenantService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `getTenant()` */
  static readonly GetTenantPath = '/tenant/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getTenant()` instead.
   *
   * This method doesn't expect any request body.
   */
  getTenant$Response(params: GetTenant$Params, context?: HttpContext): Observable<StrictHttpResponse<BaseResponseDtoTenantDto>> {
    return getTenant(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getTenant$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getTenant(params: GetTenant$Params, context?: HttpContext): Observable<BaseResponseDtoTenantDto> {
    return this.getTenant$Response(params, context).pipe(
      map((r: StrictHttpResponse<BaseResponseDtoTenantDto>): BaseResponseDtoTenantDto => r.body)
    );
  }

  /** Path part for operation `updateTenant()` */
  static readonly UpdateTenantPath = '/tenant/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateTenant()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateTenant$Response(params: UpdateTenant$Params, context?: HttpContext): Observable<StrictHttpResponse<BaseResponseDtoTenantDto>> {
    return updateTenant(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `updateTenant$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateTenant(params: UpdateTenant$Params, context?: HttpContext): Observable<BaseResponseDtoTenantDto> {
    return this.updateTenant$Response(params, context).pipe(
      map((r: StrictHttpResponse<BaseResponseDtoTenantDto>): BaseResponseDtoTenantDto => r.body)
    );
  }

  /** Path part for operation `deleteTenant()` */
  static readonly DeleteTenantPath = '/tenant/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteTenant()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteTenant$Response(params: DeleteTenant$Params, context?: HttpContext): Observable<StrictHttpResponse<BaseResponseDtoString>> {
    return deleteTenant(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `deleteTenant$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteTenant(params: DeleteTenant$Params, context?: HttpContext): Observable<BaseResponseDtoString> {
    return this.deleteTenant$Response(params, context).pipe(
      map((r: StrictHttpResponse<BaseResponseDtoString>): BaseResponseDtoString => r.body)
    );
  }

  /** Path part for operation `getAllProperties()` */
  static readonly GetAllPropertiesPath = '/tenant';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllProperties()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllProperties$Response(params?: GetAllTenants$Params, context?: HttpContext): Observable<StrictHttpResponse<BaseResponseDtoListTenant>> {
    return getAllProperties(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getAllProperties$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllProperties(params?: GetAllTenants$Params, context?: HttpContext): Observable<BaseResponseDtoListTenant> {
    return this.getAllProperties$Response(params, context).pipe(
      map((r: StrictHttpResponse<BaseResponseDtoListTenant>): BaseResponseDtoListTenant => r.body)
    );
  }

  /** Path part for operation `addTenant()` */
  static readonly AddTenantPath = '/tenant';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `addTenant()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  addTenant$Response(params: AddTenant$Params, context?: HttpContext): Observable<StrictHttpResponse<BaseResponseDtoTenantDto>> {
    return addTenant(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `addTenant$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  addTenant(params: AddTenant$Params, context?: HttpContext): Observable<BaseResponseDtoTenantDto> {
    return this.addTenant$Response(params, context).pipe(
      map((r: StrictHttpResponse<BaseResponseDtoTenantDto>): BaseResponseDtoTenantDto => r.body)
    );
  }

}
