import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BookingService } from '../services/booking.service';
import { Booking } from '../Interface/booking';

@Component({
  selector: 'app-bookings',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './bookings.html',
  styleUrl: './bookings.css',
})
export class Bookings implements OnInit {
  bookings: Booking[] = [];
  filteredBookings: Booking[] = [];
  currentUserEmail: string = '';
  filterStatus: string = 'all';
  ratingInputs: { [bookingId: string]: number } = {};

  constructor(private bookingService: BookingService) {
    // In a real app, get from auth service. For demo, using localStorage
    if (typeof window !== 'undefined' && window.localStorage) {
      this.currentUserEmail = localStorage.getItem('currentUserEmail') || 'john@example.com';
    } else {
      this.currentUserEmail = 'john@example.com';
    }
  }

  ngOnInit() {
    this.loadBookings();
  }

  loadBookings() {
    this.bookings = this.bookingService.getBookingsByEmail(this.currentUserEmail);
    this.applyFilter();
  }

  onFilterChange() {
    this.applyFilter();
  }

  applyFilter() {
    if (this.filterStatus === 'all') {
      this.filteredBookings = [...this.bookings];
    } else {
      this.filteredBookings = this.bookings.filter(b => b.status === this.filterStatus);
    }
    // Sort by booking date (newest first)
    this.filteredBookings.sort((a, b) => 
      new Date(b.bookingDate).getTime() - new Date(a.bookingDate).getTime()
    );
  }

  canCancel(booking: Booking): boolean {
    return booking.status === 'pending' || booking.status === 'confirmed';
  }

  cancelBooking(booking: Booking): void {
    if (!this.canCancel(booking)) {
      return;
    }
    if (confirm('Are you sure you want to cancel this booking?')) {
      this.bookingService.updateBookingStatus(booking.id, 'cancelled');
      this.loadBookings();
    }
  }

  canRate(booking: Booking): boolean {
    return booking.status === 'completed' && (booking.userRating == null);
  }

  setRating(bookingId: string, value: string): void {
    const numeric = Number(value);
    if (!isNaN(numeric) && numeric >= 1 && numeric <= 5) {
      this.ratingInputs[bookingId] = numeric;
    }
  }

  submitRating(booking: Booking): void {
    const rating = this.ratingInputs[booking.id];
    if (!rating) {
      return;
    }
    this.bookingService.updateBookingRating(booking.id, rating);
    this.loadBookings();
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

  formatDateTime(dateString: string, timeString: string): string {
    const date = new Date(dateString + 'T' + timeString);
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }
}
