import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BookingService } from '../services/booking.service';
import { Booking, User, Provider, ContactMessage } from '../Interface/booking';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin.html',
  styleUrl: './admin.css',
})
export class Admin implements OnInit {
  activeTab: 'bookings' | 'users' | 'providers' | 'contacts' = 'bookings';
  
  bookings: Booking[] = [];
  users: User[] = [];
  providers: Provider[] = [];
  contacts: ContactMessage[] = [];
  
  filterStatus: string = 'all';
  
  // New user/provider forms
  showAddUserForm: boolean = false;
  showAddProviderForm: boolean = false;
  
  newUser = {
    name: '',
    email: '',
    phone: '',
    role: 'user' as 'user' | 'provider' | 'admin'
  };
  
  newProvider = {
    name: '',
    email: '',
    phone: '',
    serviceCategory: '',
    location: '',
    price: 500,
    status: 'approved' as 'approved' | 'pending'
  };

  // Inline admin login state
  adminLoginForm = {
    email: '',
    password: ''
  };
  adminLoginError: string = '';
  adminLoginSuccess: boolean = false;

  constructor(
    private bookingService: BookingService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    if (this.isAdmin()) {
      this.loadData();
    }
  }

  // Overview metrics
  get totalBookings(): number {
    return this.bookings.length;
  }

  get totalServices(): number {
    return this.providers.length;
  }

  get activeBookingsCount(): number {
    return this.bookings.filter(b => b.status === 'pending' || b.status === 'confirmed').length;
  }

  isAdmin(): boolean {
    return this.authService.isAdmin();
  }

  onAdminLogin() {
    this.adminLoginError = '';
    this.adminLoginSuccess = false;

    if (!this.adminLoginForm.email || !this.adminLoginForm.password) {
      this.adminLoginError = 'Please fill in all fields';
      return;
    }

    if (this.authService.adminLogin(this.adminLoginForm.email, this.adminLoginForm.password)) {
      this.adminLoginSuccess = true;
      this.loadData();
    } else {
      this.adminLoginError = 'Please enter valid admin credentials';
    }
  }

  approveProvider(providerId: string) {
    this.bookingService.updateProviderStatus(providerId, 'approved');
    this.loadData();
  }

  loadData() {
    this.bookings = this.bookingService.getBookings();
    this.users = this.bookingService.getUsers();
    this.providers = this.bookingService.getProviders();
    this.contacts = this.bookingService.getContactMessages();
    this.applyFilter();
  }

  setTab(tab: 'bookings' | 'users' | 'providers' | 'contacts') {
    this.activeTab = tab;
  }

  onFilterChange() {
    this.applyFilter();
  }

  applyFilter() {
    // Filter logic is handled in template with ngIf
  }

  getFilteredBookings(): Booking[] {
    if (this.filterStatus === 'all') {
      return this.bookings;
    }
    return this.bookings.filter(b => b.status === this.filterStatus);
  }

  updateBookingStatus(bookingId: string, status: Booking['status']) {
    this.bookingService.updateBookingStatus(bookingId, status);
    this.loadData();
  }

  deleteBooking(bookingId: string) {
    if (confirm('Are you sure you want to delete this booking?')) {
      this.bookingService.deleteBooking(bookingId);
      this.loadData();
    }
  }

  addUser() {
    if (this.newUser.name && this.newUser.email && this.newUser.phone) {
      this.bookingService.addUser(this.newUser);
      this.newUser = { name: '', email: '', phone: '', role: 'user' };
      this.showAddUserForm = false;
      this.loadData();
    }
  }

  deleteUser(userId: string) {
    if (confirm('Are you sure you want to delete this user?')) {
      this.bookingService.deleteUser(userId);
      this.loadData();
    }
  }

  addProvider() {
    if (this.newProvider.name && this.newProvider.email && this.newProvider.phone) {
      this.bookingService.addProvider(this.newProvider);
      this.newProvider = { 
        name: '', 
        email: '', 
        phone: '', 
        serviceCategory: '', 
        location: '', 
        price: 500,
        status: 'approved'
      };
      this.showAddProviderForm = false;
      this.loadData();
    }
  }

  deleteProvider(providerId: string) {
    if (confirm('Are you sure you want to delete this provider?')) {
      this.bookingService.deleteProvider(providerId);
      this.loadData();
    }
  }

  // Contact messages management
  markContactResolved(id: string) {
    this.bookingService.updateContactStatus(id, 'resolved');
    this.loadData();
  }

  deleteContact(id: string) {
    if (confirm('Are you sure you want to delete this message?')) {
      this.bookingService.deleteContactMessage(id);
      this.loadData();
    }
  }

  getStatusClass(status: string): string {
    const statusMap: { [key: string]: string } = {
      'pending': 'status-pending',
      'confirmed': 'status-confirmed',
      'completed': 'status-completed',
      'cancelled': 'status-cancelled'
    };
    return statusMap[status] || '';
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  }
}
