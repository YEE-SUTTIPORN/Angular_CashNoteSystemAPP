import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule, NgClass, NgIf } from '@angular/common';
import { LoginModel } from '../../models/auth.model';

@Component({
  selector: 'app-login',
  imports: [NgIf, NgClass, CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  error = '';

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    if (this.authService.authChecked$) {
      this.router.navigate(['/dashboard']); // หรือไปยังหน้า Dashboard
    }

    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      rememberMe: [false]
    });
  }

  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;
    this.error = '';

    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    const login: LoginModel = {
      Username: this.f['username'].value,
      Password: this.f['password'].value,
      RememberMe: this.f['rememberMe'].value
    };


    this.authService.login(login)
      .subscribe({
        next: (user) => {
          console.log('Login successful, navigating to home.');
          this.router.navigate(['/']); // หรือไปยังหน้า Dashboard
          this.loading = false;
        },
        error: (err) => {
          this.error = err.message || 'Login failed. Please check your credentials.';
          this.loading = false;
        }
      });
  }
}
