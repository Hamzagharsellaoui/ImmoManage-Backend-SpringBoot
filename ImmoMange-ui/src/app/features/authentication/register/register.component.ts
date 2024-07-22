import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {AuthService} from "../../../services/services/auth-service.service";
import {RegisterRequestDto} from "../../../services/models/register-request-dto";

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
    private authService: AuthService
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

    const registrationRequest : RegisterRequestDto = this.registerForm.value;
    this.authService.register(registrationRequest).subscribe({
      next: () => {
        this.router.navigate(['property']);
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
    this.router.navigate(['user/login']);
  }
}
