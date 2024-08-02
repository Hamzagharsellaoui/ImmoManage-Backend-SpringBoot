import {getUserInfo, GetUserInfoParams} from "../fn/authentication-controller/get-user-info";
import {HttpClient, HttpContext} from "@angular/common/http";
import {Observable} from "rxjs";
import {StrictHttpResponse} from "../strict-http-response";
import {BaseResponseDtoUserInfoResponse} from "../models/base-response-dto-user-info-response";
import {map} from "rxjs/operators";
import {Injectable} from "@angular/core";
import {BaseService} from "../base-service";
import {ApiConfiguration} from "../api-configuration";



@Injectable({ providedIn: 'root' })
export class UserService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  getUserInfo$Response(params: number, context?: HttpContext): Observable<StrictHttpResponse<BaseResponseDtoUserInfoResponse>> {
    return getUserInfo(this.http, this.rootUrl, params, context);
  }

  getUserInfo(params: number, context?: HttpContext): Observable<BaseResponseDtoUserInfoResponse> {
    return this.getUserInfo$Response(params, context).pipe(
      map((r: StrictHttpResponse<BaseResponseDtoUserInfoResponse>): BaseResponseDtoUserInfoResponse => r.body)
    );
  }
}
