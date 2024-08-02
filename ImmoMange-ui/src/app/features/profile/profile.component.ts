import { Component, OnInit } from '@angular/core';
import { TokenService } from '../../services/token/token.service';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/services/AuthenticationService';
import { GetUserInfoParams } from '../../services/fn/authentication-controller/get-user-info';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user: any;
  errorMessage: Array<string> = [];
  currentUserId?: number;

  constructor(
    private tokenService: TokenService,
    private router: Router,
    private authService: AuthenticationService
  ) {}

  ngOnInit() {
    this.getCurrentUserID();
  }

  getCurrentUserID() {
    const email = this.tokenService.getUserIdFromToken();
    if (email) {
      this.authService.getUserInfo(email).subscribe({
        next: (res) => {
          if (res && res.data) {
            this.user = res.data;
            console.log('Current User Info:', res.data);
          } else {
            this.addErrorMessage('User info is undefined.');
          }
        },
        error: (err) => {
          this.addErrorMessage('Failed to load current user info.');
        }
      });
    } else {
      this.addErrorMessage('No user ID found in token.');
    }
  }

  addErrorMessage(message: string): void {
    if (!this.errorMessage.includes(message)) {
      this.errorMessage.push(message);
    }
  }

  formatName(name: string): string {
    const words = name.split(' ');
    const firstWord = words[0].charAt(0).toUpperCase() + words[0].slice(1).toLowerCase();
    const restOfWords = words.slice(1).map(word => word.toUpperCase()).join(' ');
    return `${firstWord} ${restOfWords}`;
  }

}
