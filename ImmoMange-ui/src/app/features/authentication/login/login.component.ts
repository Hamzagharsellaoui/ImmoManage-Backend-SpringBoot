import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import {TokenService} from "../../../services/token/token.service";
import {BaseResponseDtoAuthenticationResponse} from "../../../services/models/base-response-dto-authentication-response";
import {Router} from "@angular/router";
import {AuthenticationService} from "../../../services/services/AuthenticationService";

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
    private authService: AuthenticationService,
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
    this.authService.loginUser({body: this.loginForm.value})
      .subscribe({
      next: (res: BaseResponseDtoAuthenticationResponse) => {
        this.tokenService.token = res.data.token;
        this.router.navigate(["AppUser/home"]).then();
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
    this.router.navigate(['/Auth/register']).then();
  }
}
