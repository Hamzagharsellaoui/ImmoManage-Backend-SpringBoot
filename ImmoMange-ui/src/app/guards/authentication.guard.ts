import {CanActivateFn, Router} from '@angular/router';
import {AuthService} from "../services/services/auth-service.service";
import {inject} from "@angular/core";


export const authenticationGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if(authService.isAuthenticated){
    return true;
  }
  else {
    router.navigateByUrl('/User/login');
    return false;
  }
  };

