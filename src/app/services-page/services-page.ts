import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Service, SERVICES_DATA } from '../Interface/service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-services-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './services-page.html',
  styleUrl: './services-page.css',
})
export class ServicesPage implements OnInit {
  allServices: Service[] = SERVICES_DATA;
  filteredServices: Service[] = SERVICES_DATA;
  
  searchService: string = '';
  searchLocation: string = '';
  selectedCategory: string = 'all';
  sortBy: string = 'none';
  
  categories: string[] = ['all', 'Plumber', 'Electrician', 'Cleaning', 'AC Repair', 'Carpenter', 'Painting', 'Pest Control', 'Computer Repair', 'CCTV Installation', 'Gardening'];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {}

  ngOnInit() {
    // Read query parameters from URL
    this.route.queryParams.subscribe(params => {
      if (params['service']) {
        this.searchService = params['service'];
      }
      if (params['location']) {
        this.searchLocation = params['location'];
      }
      // Apply filters after reading params
      this.applyFilters();
    });
  }

  onSearch() {
    this.applyFilters();
  }

  onCategoryChange() {
    this.applyFilters();
  }

  onSortChange() {
    this.applyFilters();
  }

  applyFilters() {
    let filtered = [...this.allServices];

    // Filter by service name or category
    if (this.searchService.trim()) {
      const searchTerm = this.searchService.toLowerCase();
      filtered = filtered.filter(service => 
        service.name.toLowerCase().includes(searchTerm) ||
        service.category.toLowerCase().includes(searchTerm)
      );
    }

    // Filter by location
    if (this.searchLocation.trim()) {
      const locationTerm = this.searchLocation.toLowerCase();
      filtered = filtered.filter(service => 
        service.location.toLowerCase().includes(locationTerm)
      );
    }

    // Filter by category
    if (this.selectedCategory !== 'all') {
      filtered = filtered.filter(service => 
        service.category === this.selectedCategory
      );
    }

    // Sort by price
    if (this.sortBy === 'low-high') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (this.sortBy === 'high-low') {
      filtered.sort((a, b) => b.price - a.price);
    }

    this.filteredServices = filtered;
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
}
