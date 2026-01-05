import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Service, SERVICES_DATA } from '../Interface/service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterOutlet, RouterLink, CommonModule, FormsModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  // Show only first 3 services on home page
  featuredServices: Service[] = SERVICES_DATA.slice(0, 3);
  
  searchService: string = '';
  searchLocation: string = '';

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  onSearch() {
    // Navigate to services page with search params
    this.router.navigate(['/services'], {
      queryParams: {
        service: this.searchService,
        location: this.searchLocation
      }
    });
  }

  bookService(service: Service) {
    // If not logged in, redirect to login (demo auth)
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
      return;
    }

    this.router.navigate(['/book-service'], {
      queryParams: {
        name: service.name,
        category: service.categoryIcon + ' ' + service.category,
        location: service.location,
        phone: service.phone,
        rating: service.rating.toString()
      }
    });
  }

  getServiceIcon(category: string): string {
    // Map categories to asset icons
    const iconMap: { [key: string]: string } = {
      'Plumber': 'service',
      'Electrician': 'service',
      'Cleaning': 'service',
      'AC Repair': 'service',
      'Carpenter': 'service',
      'Painting': 'service',
      'Pest Control': 'service',
      'Computer Repair': 'service',
      'CCTV Installation': 'service',
      'Gardening': 'service'
    };
    return iconMap[category] || 'service';
  }
}
