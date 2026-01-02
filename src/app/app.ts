import { Component, signal } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Home } from "./home/home";
import { ServicesPage } from "./services-page/services-page";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, Home, ServicesPage],
  standalone:true,
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('serviceAI');

}
