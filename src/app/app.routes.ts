import { Routes } from '@angular/router';
import { Home } from './home/home';
import { About } from './about/about';
import { Contact } from './contact/contact';
import { ServicesPage } from './services-page/services-page';
import { Login } from './login/login';


export const routes: Routes = [
     {path: '',component: Home},
     {path: 'about',component: About},
     {path: 'contact',component:Contact },
     {path: 'services',component:ServicesPage },
     {path: 'login',component:Login }
     
     
];
