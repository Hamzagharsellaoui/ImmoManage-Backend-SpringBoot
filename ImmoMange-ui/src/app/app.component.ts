import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "./services/services/auth-service.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'ImmoMange-ui';
  constructor(private authService: AuthService) {}
  ngOnInit() {
    this.authService.loadJwtTokenFromLocalStorage();
  }
}
