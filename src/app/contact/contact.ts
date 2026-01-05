import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BookingService } from '../services/booking.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact.html',
  styleUrl: './contact.css',
})
export class Contact {
  form = {
    name: '',
    email: '',
    subject: '',
    message: ''
  };

  isSubmitting = false;
  submitSuccess = false;
  submitError = '';

  constructor(private bookingService: BookingService) {}

  onSubmit() {
    this.submitError = '';
    this.submitSuccess = false;

    if (!this.form.name || !this.form.email || !this.form.message) {
      this.submitError = 'Please fill in your name, email, and message.';
      return;
    }

    this.isSubmitting = true;
    try {
      this.bookingService.addContactMessage({
        name: this.form.name.trim(),
        email: this.form.email.trim(),
        subject: this.form.subject.trim() || 'General enquiry',
        message: this.form.message.trim()
      });
      this.submitSuccess = true;
      this.form = { name: '', email: '', subject: '', message: '' };
    } catch {
      this.submitError = 'Something went wrong while sending your message. Please try again.';
    } finally {
      this.isSubmitting = false;
    }
  }
}
