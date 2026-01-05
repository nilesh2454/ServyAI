import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BookingService } from '../services/booking.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-book-service',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './book-service.html',
  styleUrl: './book-service.css',
})
export class BookService implements OnInit {
  serviceName: string = '';
  serviceCategory: string = '';
  serviceLocation: string = '';
  servicePhone: string = '';
  serviceRating: string = '';

  bookingForm = {
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    address: '',
    date: '',
    time: '',
    description: ''
  };

  submitted: boolean = false;
  bookingSuccess: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private bookingService: BookingService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    // Get service details from query parameters
    this.route.queryParams.subscribe(params => {
      this.serviceName = params['name'] || 'Service Provider';
      this.serviceCategory = params['category'] || '';
      this.serviceLocation = params['location'] || '';
      this.servicePhone = params['phone'] || '';
      this.serviceRating = params['rating'] || '4.5';
    });
  }

  getMinDate(): string {
    const today = new Date();
    return today.toISOString().split('T')[0];
  }

  onSubmit() {
    this.submitted = true;
    
    // Simple validation
    if (this.isFormValid()) {
      // Save user email to localStorage for demo purposes (only in browser)
      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.setItem('currentUserEmail', this.bookingForm.customerEmail);
      }

      // Get current user id (demo)
      const currentUser = this.authService.getCurrentUser();
      const userId = currentUser?.id || 'guest';

      // Save booking
      this.bookingService.addBooking({
        userId,
        serviceName: this.serviceName,
        serviceCategory: this.serviceCategory,
        serviceLocation: this.serviceLocation,
        servicePhone: this.servicePhone,
        serviceRating: this.serviceRating,
        ...this.bookingForm
      });
      
      this.bookingSuccess = true;
      
      // Reset form after 3 seconds and redirect
      setTimeout(() => {
        this.router.navigate(['/bookings']);
      }, 3000);
    }
  }

  isFormValid(): boolean {
    return !!(
      this.bookingForm.customerName &&
      this.bookingForm.customerEmail &&
      this.bookingForm.customerPhone &&
      this.bookingForm.address &&
      this.bookingForm.date &&
      this.bookingForm.time
    );
  }

  isFieldInvalid(fieldName: string): boolean {
    return this.submitted && !this.bookingForm[fieldName as keyof typeof this.bookingForm];
  }
}
