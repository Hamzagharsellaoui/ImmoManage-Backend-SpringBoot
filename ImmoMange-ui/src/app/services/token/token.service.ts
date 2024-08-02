import { Injectable } from '@angular/core';
import {JwtHelperService} from '@auth0/angular-jwt';
import {jwtDecode} from "jwt-decode";
import {GetUserInfoParams} from "../fn/authentication-controller/get-user-info";

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  set token(token: string) {
    localStorage.setItem('token', token);
  }

  get token() {
    return localStorage.getItem('token') as string;
  }


  isTokenValid() {
    const token = this.token;
    if (!token) {
      return false;
    }
    const jwtHelper = new JwtHelperService();
    const isTokenExpired = jwtHelper.isTokenExpired(token);
    if (isTokenExpired) {
      localStorage.clear();
      return false;
    }
    return true;
  }
  isTokenNotValid() {
    return !this.isTokenValid();
  }
  decodeToken(token: string): any {
    try {
      return jwtDecode(token);
    } catch (error) {
      console.error('Token decoding failed:', error);
      return null;
    }
  }
  getUserIdFromToken(): GetUserInfoParams {
      const token = this.token;
      const decodedToken = this.decodeToken(token);
      return decodedToken?.sub;
    }
}
