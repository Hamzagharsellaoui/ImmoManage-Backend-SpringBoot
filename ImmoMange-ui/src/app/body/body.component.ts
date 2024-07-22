import {Component} from '@angular/core';
import {AuthService} from "../services/services/auth-service.service";

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss']
})
export class BodyComponent{
  constructor(public authService:AuthService) {}



  handleLogout(){
    this.authService.logout();
  }
}
