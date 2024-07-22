import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import {TokenService} from "../../../services/token/token.service";
import {BaseResponseDtoAuthenticationResponse} from "../../../services/models/base-response-dto-authentication-response";
import {AuthenticationResponse} from "../../../services/models/authentication-response";
import {AuthService} from "../../../services/services/auth-service.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  errorMessage: Array<string> = [];
  loginForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private tokenService: TokenService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }
  login(): void {
    this.errorMessage = [];
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    let authRequest = this.loginForm.value;
    console.log('Login request:', authRequest);
    this.authService.login(authRequest).subscribe({
      next: (res: BaseResponseDtoAuthenticationResponse) => {
        console.log('Login response:', res.data);
        this.authService.loadProfile(res.data);
        this.router.navigate(['home']).then();
      },
      error: (err) => {
        console.error('Login error', err);
        if (err.status === 401) {
          this.errorMessage.push('Invalid credentials.');
        } else if (err.error.message) {
          if (!this.errorMessage.includes(err.error.message)) {
            this.errorMessage.push(err.error.message);
          }
        } else {
          this.errorMessage.push('An unexpected error occurred.');
        }
      }
    });
  }
  registration(): void {
    this.router.navigate(['user/register']).then();
  }
}
