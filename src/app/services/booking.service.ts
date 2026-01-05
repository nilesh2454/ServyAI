import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Booking, User, Provider, ContactMessage } from '../Interface/booking';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private bookingsKey = 'servyai_bookings';
  private usersKey = 'servyai_users';
  private providersKey = 'servyai_providers';
  private contactsKey = 'servyai_contacts';

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      this.initializeDefaultData();
    }
  }

  private initializeDefaultData() {
    // Initialize default users if none exist
    if (!this.getLocalStorageItem(this.usersKey)) {
      const defaultUsers: User[] = [
        {
          id: 'user1',
          name: 'John Doe',
          email: 'john@example.com',
          phone: '+91 98765 43210',
          role: 'user',
          createdAt: new Date().toISOString()
        },
        {
          id: 'user2',
          name: 'Jane Smith',
          email: 'jane@example.com',
          phone: '+91 91234 56789',
          role: 'user',
          createdAt: new Date().toISOString()
        }
      ];
      this.setLocalStorageItem(this.usersKey, JSON.stringify(defaultUsers));
    }

    // Initialize default providers if none exist
    if (!this.getLocalStorageItem(this.providersKey)) {
      const defaultProviders: Provider[] = [
        {
          id: 'provider1',
          name: 'Raj Plumbing Services',
          email: 'raj@plumbing.com',
          phone: '+91 98765 43210',
          role: 'provider',
          serviceCategory: 'Plumber',
          location: 'Pune, Maharashtra',
          price: 500,
          status: 'approved',
          createdAt: new Date().toISOString()
        },
        {
          id: 'provider2',
          name: 'QuickFix Electricians',
          email: 'quickfix@electric.com',
          phone: '+91 91234 56789',
          role: 'provider',
          serviceCategory: 'Electrician',
          location: 'Mumbai, Maharashtra',
          price: 600,
          status: 'approved',
          createdAt: new Date().toISOString()
        }
      ];
      this.setLocalStorageItem(this.providersKey, JSON.stringify(defaultProviders));
    }

    // Initialize empty contacts storage if none exist
    if (!this.getLocalStorageItem(this.contactsKey)) {
      this.setLocalStorageItem(this.contactsKey, JSON.stringify([]));
    }
  }

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

  // Booking methods
  addBooking(booking: Omit<Booking, 'id' | 'bookingDate' | 'status'>): Booking {
    const bookings = this.getBookings();
    const newBooking: Booking = {
      ...booking,
      id: this.generateId(),
      bookingDate: new Date().toISOString(),
      status: 'pending'
    };
    bookings.push(newBooking);
    this.setLocalStorageItem(this.bookingsKey, JSON.stringify(bookings));
    return newBooking;
  }

  getBookings(): Booking[] {
    const data = this.getLocalStorageItem(this.bookingsKey);
    return data ? JSON.parse(data) : [];
  }

  getBookingsByEmail(email: string): Booking[] {
    return this.getBookings().filter(booking => booking.customerEmail === email);
  }

  updateBookingStatus(id: string, status: Booking['status']): void {
    const bookings = this.getBookings();
    const index = bookings.findIndex(b => b.id === id);
    if (index !== -1) {
      bookings[index].status = status;
      this.setLocalStorageItem(this.bookingsKey, JSON.stringify(bookings));
    }
  }

  updateBookingRating(id: string, rating: number): void {
    const bookings = this.getBookings();
    const index = bookings.findIndex(b => b.id === id);
    if (index !== -1) {
      bookings[index].userRating = rating;
      this.setLocalStorageItem(this.bookingsKey, JSON.stringify(bookings));
    }
  }

  deleteBooking(id: string): void {
    const bookings = this.getBookings().filter(b => b.id !== id);
    this.setLocalStorageItem(this.bookingsKey, JSON.stringify(bookings));
  }

  // User methods
  getUsers(): User[] {
    const data = this.getLocalStorageItem(this.usersKey);
    return data ? JSON.parse(data) : [];
  }

  addUser(user: Omit<User, 'id' | 'createdAt'>): User {
    const users = this.getUsers();
    const newUser: User = {
      ...user,
      id: this.generateId(),
      createdAt: new Date().toISOString()
    };
    users.push(newUser);
    this.setLocalStorageItem(this.usersKey, JSON.stringify(users));
    return newUser;
  }

  deleteUser(id: string): void {
    const users = this.getUsers().filter(u => u.id !== id);
    this.setLocalStorageItem(this.usersKey, JSON.stringify(users));
  }

  // Provider methods
  getProviders(): Provider[] {
    const data = this.getLocalStorageItem(this.providersKey);
    return data ? JSON.parse(data) : [];
  }

  /**
   * Add a provider.
   * By default providers added from admin are approved, while those added from
   * public registration should pass status: 'pending' explicitly.
   */
  addProvider(
    provider: Omit<Provider, 'id' | 'createdAt' | 'role'>
  ): Provider {
    const providers = this.getProviders();
    const newProvider: Provider = {
      ...provider,
      id: this.generateId(),
      role: 'provider',
      status: provider.status ?? 'approved',
      createdAt: new Date().toISOString()
    };
    providers.push(newProvider);
    this.setLocalStorageItem(this.providersKey, JSON.stringify(providers));
    return newProvider;
  }

  deleteProvider(id: string): void {
    const providers = this.getProviders().filter(p => p.id !== id);
    this.setLocalStorageItem(this.providersKey, JSON.stringify(providers));
  }

  updateProviderStatus(id: string, status: Provider['status']): void {
    const providers = this.getProviders();
    const index = providers.findIndex(p => p.id === id);
    if (index !== -1) {
      providers[index].status = status;
      this.setLocalStorageItem(this.providersKey, JSON.stringify(providers));
    }
  }

  // Contact message methods
  getContactMessages(): ContactMessage[] {
    const data = this.getLocalStorageItem(this.contactsKey);
    return data ? JSON.parse(data) : [];
  }

  addContactMessage(payload: Omit<ContactMessage, 'id' | 'createdAt' | 'status'>): ContactMessage {
    const messages = this.getContactMessages();
    const newMessage: ContactMessage = {
      ...payload,
      id: this.generateId(),
      createdAt: new Date().toISOString(),
      status: 'new',
    };
    messages.push(newMessage);
    this.setLocalStorageItem(this.contactsKey, JSON.stringify(messages));
    return newMessage;
  }

  updateContactStatus(id: string, status: ContactMessage['status']): void {
    const messages = this.getContactMessages();
    const index = messages.findIndex(m => m.id === id);
    if (index !== -1) {
      messages[index].status = status;
      this.setLocalStorageItem(this.contactsKey, JSON.stringify(messages));
    }
  }

  deleteContactMessage(id: string): void {
    const messages = this.getContactMessages().filter(m => m.id !== id);
    this.setLocalStorageItem(this.contactsKey, JSON.stringify(messages));
  }

  private generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }
}
