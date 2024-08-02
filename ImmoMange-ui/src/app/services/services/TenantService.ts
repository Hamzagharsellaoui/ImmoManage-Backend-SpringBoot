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
import { BaseResponseDtoListTenantResponseDto } from '../models/base-response-dto-list-tenant-response-dto';
import { BaseResponseDtoString } from '../models/base-response-dto-string';
import { BaseResponseDtoTenantResponseDto } from '../models/base-response-dto-tenant-response-dto';
import { deleteTenant } from '../fn/tenant-controller/delete-tenant';
import { DeleteTenant$Params } from '../fn/tenant-controller/delete-tenant';
import { getTenant } from '../fn/tenant-controller/get-tenant';
import { GetTenant$Params } from '../fn/tenant-controller/get-tenant';
import { updateTenant } from '../fn/tenant-controller/update-tenant';
import { UpdateTenant$Params } from '../fn/tenant-controller/update-tenant';
import {getAllTenants, GetAllTenants$Params} from "../fn/tenant-controller/get-all-tenants";

@Injectable({ providedIn: 'root' })
export class TenantService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  updateTenant$Response(params: UpdateTenant$Params, context?: HttpContext): Observable<StrictHttpResponse<BaseResponseDtoTenantResponseDto>> {
    return updateTenant(this.http, this.rootUrl, params, context);
  }

  updateTenant(params: UpdateTenant$Params, context?: HttpContext): Observable<BaseResponseDtoTenantResponseDto> {
    return this.updateTenant$Response(params, context).pipe(
      map((r: StrictHttpResponse<BaseResponseDtoTenantResponseDto>): BaseResponseDtoTenantResponseDto => r.body)
    );
  }

  addTenant$Response(params: AddTenant$Params, context?: HttpContext): Observable<StrictHttpResponse<BaseResponseDtoTenantResponseDto>> {
    return addTenant(this.http, this.rootUrl, params, context);
  }

  addTenant(params: AddTenant$Params, context?: HttpContext): Observable<BaseResponseDtoTenantResponseDto> {
    return this.addTenant$Response(params, context).pipe(
      map((r: StrictHttpResponse<BaseResponseDtoTenantResponseDto>): BaseResponseDtoTenantResponseDto => r.body)
    );
  }

  getTenant$Response(params: GetTenant$Params, context?: HttpContext): Observable<StrictHttpResponse<BaseResponseDtoTenantResponseDto>> {
    return getTenant(this.http, this.rootUrl, params, context);
  }

  getTenant(params: GetTenant$Params, context?: HttpContext): Observable<BaseResponseDtoTenantResponseDto> {
    return this.getTenant$Response(params, context).pipe(
      map((r: StrictHttpResponse<BaseResponseDtoTenantResponseDto>): BaseResponseDtoTenantResponseDto => r.body)
    );
  }

  getAllTenants$Response(params?: GetAllTenants$Params, context?: HttpContext): Observable<StrictHttpResponse<BaseResponseDtoListTenantResponseDto>> {
    return getAllTenants(this.http, this.rootUrl, params, context);
  }

  getAllTenants(params?: GetAllTenants$Params, context?: HttpContext): Observable<BaseResponseDtoListTenantResponseDto> {
    return this.getAllTenants$Response(params, context).pipe(
      map((r: StrictHttpResponse<BaseResponseDtoListTenantResponseDto>): BaseResponseDtoListTenantResponseDto => r.body)
    );
  }

  deleteTenant$Response(params: DeleteTenant$Params, context?: HttpContext): Observable<StrictHttpResponse<BaseResponseDtoString>> {
    return deleteTenant(this.http, this.rootUrl, params, context);
  }

  deleteTenant(params: DeleteTenant$Params, context?: HttpContext): Observable<BaseResponseDtoString> {
    return this.deleteTenant$Response(params, context).pipe(
      map((r: StrictHttpResponse<BaseResponseDtoString>): BaseResponseDtoString => r.body)
    );
  }

}
