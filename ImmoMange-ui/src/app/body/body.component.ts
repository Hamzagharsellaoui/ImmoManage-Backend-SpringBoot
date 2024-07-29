import {Component} from '@angular/core';
import {AuthenticationService} from "../services/services/AuthenticationService";

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss']
})
export class BodyComponent{
  constructor(public authService:AuthenticationService) {}



  handleLogout(){
    this.authService.logout();
  }
}
