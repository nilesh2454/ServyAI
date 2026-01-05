import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { BookingService } from './booking.service';
import { User, Provider } from '../Interface/booking';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserKey = 'currentUser';
  private isAdminKey = 'isAdmin';
  private currentUserEmailKey = 'currentUserEmail';

  // Demo admin credentials
  private adminCredentials = {
    email: 'admin@servyai.com',
    password: 'admin123'
  };

  constructor(
    private router: Router, 
    private bookingService: BookingService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  // Helper methods to safely access localStorage
  private getLocalStorageItem(key: string): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem(key);
    }
    return null;
  }

  private setLocalStorageItem(key: string, value: string): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(key, value);
    }
  }

  private removeLocalStorageItem(key: string): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem(key);
    }
  }

  // Create a demo session user object and persist it
  private createSession(email: string, role: 'user' | 'admin' | 'provider', name?: string): void {
    const sessionUser = {
      id: `${role}_${Date.now().toString(36)}`,
      email,
      role,
      name: name || (role === 'admin' ? 'Admin User' : email.split('@')[0] || 'User')
    };

    this.setLocalStorageItem(this.currentUserKey, JSON.stringify(sessionUser));
    this.setLocalStorageItem(this.currentUserEmailKey, email);
    this.setLocalStorageItem(this.isAdminKey, role === 'admin' ? 'true' : 'false');
  }

  // Admin Login (demo: accept any email/password)
  adminLogin(email: string, password: string): boolean {
    if (!email || !password) {
      return false;
    }
    this.createSession(email, 'admin', 'Admin User');
    return true;
  }

  // User Login (demo: accept any email/password)
  loginUser(email: string, password: string): boolean {
    if (!email || !password) {
      return false;
    }
    this.createSession(email, 'user');
    return true;
  }

  // User Registration
  registerUser(user: { name: string; email: string; phone: string; password: string }): boolean {
    const users = this.getUsers();
    // Check if email already exists
    if (users.find(u => u.email === user.email)) {
      return false;
    }
    
    // Add user record (demo)
    this.bookingService.addUser({
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: 'user'
    });
    
    // Log the user in
    this.createSession(user.email, 'user', user.name);
    return true;
  }

  // Provider Registration (goes to admin for approval)
  registerProvider(provider: { 
    name: string; 
    email: string; 
    phone: string; 
    password: string;
    serviceCategory: string;
    location: string;
    price: number;
  }): boolean {
    const providers = this.getProviders();
    // Check if email already exists
    if (providers.find(p => p.email === provider.email)) {
      return false;
    }
    
    // Add provider as pending – admin must approve
    this.bookingService.addProvider({
      name: provider.name,
      email: provider.email,
      phone: provider.phone,
      serviceCategory: provider.serviceCategory,
      location: provider.location,
      price: provider.price,
      status: 'pending'
    });
    
    // Do NOT auto-login provider; admin will approve first
    return true;
  }

  // Check if user is logged in
  isLoggedIn(): boolean {
    return !!this.getLocalStorageItem(this.currentUserKey);
  }

  // Check if user is admin
  isAdmin(): boolean {
    return this.getLocalStorageItem(this.isAdminKey) === 'true';
  }

  // Get current user
  getCurrentUser(): any {
    const user = this.getLocalStorageItem(this.currentUserKey);
    return user ? JSON.parse(user) : null;
  }

  // Logout
  logout(): void {
    this.removeLocalStorageItem(this.currentUserKey);
    this.removeLocalStorageItem(this.isAdminKey);
    this.removeLocalStorageItem(this.currentUserEmailKey);
    this.router.navigate(['/']);
  }

  // Helper methods
  private getUsers(): User[] {
    const data = this.getLocalStorageItem('servyai_users');
    return data ? JSON.parse(data) : [];
  }

  private getProviders(): Provider[] {
    const data = this.getLocalStorageItem('servyai_providers');
    return data ? JSON.parse(data) : [];
  }
}
