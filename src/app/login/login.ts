import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login implements OnInit {
  activeTab: 'user-login' | 'register-user' = 'user-login';

  // User login form (demo login)
  userLoginForm = {
    email: '',
    password: ''
  };
  userLoginError: string = '';
  userLoginSuccess: boolean = false;

  // User registration form
  userRegisterForm = {
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  };
  userRegisterError: string = '';
  userRegisterSuccess: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    // If already logged in, redirect based on role
    if (this.authService.isLoggedIn()) {
      if (this.authService.isAdmin()) {
        this.router.navigate(['/admin']);
      } else {
        this.router.navigate(['/']);
      }
    }
  }

  setTab(tab: 'user-login' | 'register-user') {
    this.activeTab = tab;
    this.clearErrors();
  }

  clearErrors() {
    this.userLoginError = '';
    this.userRegisterError = '';
  }

  // User Login (demo)
  onUserLogin() {
    this.userLoginError = '';
    this.userLoginSuccess = false;

    if (!this.userLoginForm.email || !this.userLoginForm.password) {
      this.userLoginError = 'Please fill in all fields';
      return;
    }

    if (this.authService.loginUser(this.userLoginForm.email, this.userLoginForm.password)) {
      this.userLoginSuccess = true;
      setTimeout(() => {
        this.router.navigate(['/bookings']);
      }, 1000);
    } else {
      this.userLoginError = 'Login failed. Please try again.';
    }
  }

  // User Registration
  onUserRegister() {
    this.userRegisterError = '';
    this.userRegisterSuccess = false;

    // Validation
    if (!this.userRegisterForm.name || !this.userRegisterForm.email || 
        !this.userRegisterForm.phone || !this.userRegisterForm.password) {
      this.userRegisterError = 'Please fill in all required fields';
      return;
    }

    if (this.userRegisterForm.password !== this.userRegisterForm.confirmPassword) {
      this.userRegisterError = 'Passwords do not match';
      return;
    }

    if (this.userRegisterForm.password.length < 6) {
      this.userRegisterError = 'Password must be at least 6 characters';
      return;
    }

    if (this.authService.registerUser({
      name: this.userRegisterForm.name,
      email: this.userRegisterForm.email,
      phone: this.userRegisterForm.phone,
      password: this.userRegisterForm.password
    })) {
      this.userRegisterSuccess = true;
      setTimeout(() => {
        this.router.navigate(['/']);
      }, 1500);
    } else {
      this.userRegisterError = 'Email already registered';
    }
  }
}
