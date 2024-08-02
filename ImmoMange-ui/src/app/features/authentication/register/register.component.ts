import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {RegisterRequestDto} from "../../../services/models/register-request-dto";
import {AuthenticationService} from "../../../services/services/AuthenticationService";
import {TokenService} from "../../../services/token/token.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  errorMessage: Array<string> = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthenticationService,
  ) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  register(): void {
    this.errorMessage = [];
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }
    let registrationRequest : RegisterRequestDto = this.registerForm.value;
    this.authService.registerUser({body:registrationRequest}).subscribe({
      next: () => {
        this.router.navigate(["user/home"]).then();
      },
      error: (err) => {
        if (err.status === 302) {
          this.addErrorMessage("There's already an employee with this email address.");
        } else if (err.error && err.error.validationErrors) {
          err.error.validationErrors.forEach((msg: string) => this.addErrorMessage(msg));
        } else {
          this.addErrorMessage('Registration failed.');
        }
      }
    });
  }

  addErrorMessage(message: string): void {
    if (!this.errorMessage.includes(message)) {
      this.errorMessage.push(message);
    }
  }

  signIn(): void {
    this.router.navigateByUrl("/user/login");
  }
}
