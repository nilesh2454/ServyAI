import { Routes } from '@angular/router';
import { Home } from './home/home';
import { About } from './about/about';
import { Contact } from './contact/contact';
import { ServicesPage } from './services-page/services-page';
import { Login } from './login/login';
import { BookService } from './book-service/book-service';
import { Bookings } from './bookings/bookings';
import { Admin } from './admin/admin';
import { authGuard } from './guards/auth.guard';


export const routes: Routes = [
  { path: '', component: Home },
  { path: 'about', component: About },
  { path: 'contact', component: Contact },
  { path: 'services', component: ServicesPage },
  { path: 'login', component: Login },
  // Require login to book a service and view bookings
  { path: 'book-service', component: BookService, canActivate: [authGuard] },
  { path: 'bookings', component: Bookings, canActivate: [authGuard] },
  // Admin dashboard (handles its own login UI)
  { path: 'admin', component: Admin }
];
