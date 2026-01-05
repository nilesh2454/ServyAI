import { Component, OnInit, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Service, SERVICES_DATA } from '../Interface/service';

interface ChatMessage {
  type: 'user' | 'bot';
  content: string;
  services?: Service[];
  timestamp: Date;
}

@Component({
  selector: 'app-chatbot',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './chatbot.html',
  styleUrl: './chatbot.css',
})
export class Chatbot implements OnInit, AfterViewChecked {
  @ViewChild('chatContainer') private chatContainer!: ElementRef;
  @ViewChild('messageInput') private messageInput!: ElementRef;

  isOpen: boolean = false;
  messages: ChatMessage[] = [];
  userMessage: string = '';
  isLoading: boolean = false;

  constructor(private router: Router) {}

  ngOnInit() {
    
  }

  ngAfterViewChecked() {
    if (this.isOpen) {
      this.scrollToBottom();
    }
  }

  toggleChat() {
    this.isOpen = !this.isOpen;
    if (this.isOpen && this.messages.length === 0) {
      this.addBotMessage('Hello! I\'m ServyAI Assistant. How can I help you today? 😊\n\nYou can ask me about services like:\n• "I need a plumber"\n• "Show me electrician services"\n• "Find cleaning services near me"');
    }
    if (this.isOpen) {
      setTimeout(() => {
        this.messageInput?.nativeElement?.focus();
      }, 100);
    }
  }

  closeChat() {
    this.isOpen = false;
  }

  scrollToBottom(): void {
    try {
      if (this.chatContainer) {
        this.chatContainer.nativeElement.scrollTop = this.chatContainer.nativeElement.scrollHeight;
      }
    } catch (err) {}
  }

  sendMessage() {
    if (!this.userMessage.trim()) return;

    const messageText = this.userMessage.trim();

    // Push user message immediately for snappy UI
    this.addUserMessage(messageText);
    const query = messageText.toLowerCase();
    this.userMessage = '';

    // Show a very short typing indicator and respond quickly
    this.isLoading = true;

    setTimeout(() => {
      this.processMessage(query);
      this.isLoading = false;

      // Ensure we stay scrolled to the latest message
      this.scrollToBottom();

      setTimeout(() => {
        this.messageInput?.nativeElement?.focus();
      }, 50);
    }, 120);
  }

  processMessage(query: string) {
    // Navigate to My Bookings
    if (query.includes('show my bookings') || query.includes('my bookings')) {
      this.addBotMessage('Opening your bookings page...');
      this.router.navigate(['/bookings']);
      this.closeChat();
      return;
    }

    // Quick navigation for booking plumber
    if (query.includes('book') && query.includes('plumber')) {
      this.addBotMessage('Sure, showing plumber services for you.');
      this.router.navigate(['/services'], {
        queryParams: { service: 'Plumber' }
      });
      this.closeChat();
      return;
    }

    // Greeting patterns
    if (this.isGreeting(query)) {
      this.addBotMessage('Hello! I\'m here to help you find services. What service are you looking for?');
      return;
    }

   
    if (this.isHelp(query)) {
      this.addBotMessage('I can help you find services! Try asking:\n• "I need a plumber"\n• "Show me electrician services"\n• "Find cleaning services"\n• "I want AC repair service"\n\nJust tell me what service you need and I\'ll show you available providers! 😊');
      return;
    }

    
    const services = this.searchServices(query);
    
    if (services.length > 0) {
      
      this.addBotMessage(`I found ${services.length} service${services.length > 1 ? 's' : ''} for you! Here are the available providers:`);
      this.addServicesMessage(services);
    } else {
      
      this.addBotMessage('Sorry, I couldn\'t find any services matching your request. 😔\n\nTry asking for:\n• Plumber\n• Electrician\n• Cleaning\n• AC Repair\n• Carpenter\n• Painting\n• Pest Control\n• Computer Repair\n• CCTV Installation\n• Gardening\n\nOr you can browse all services on our services page!');
    }
  }

  isGreeting(query: string): boolean {
    const greetings = ['hi', 'hello', 'hey', 'good morning', 'good afternoon', 'good evening', 'howdy'];
    return greetings.some(greeting => query.includes(greeting));
  }

  isHelp(query: string): boolean {
    const helpKeywords = ['help', 'what can you do', 'how can you help', 'what services', 'options'];
    return helpKeywords.some(keyword => query.includes(keyword));
  }

  searchServices(query: string): Service[] {
    const searchTerms = this.extractSearchTerms(query);
    if (searchTerms.length === 0) return [];

    return SERVICES_DATA.filter(service => {
      const serviceText = `${service.name} ${service.category} ${service.location}`.toLowerCase();
      return searchTerms.some(term => serviceText.includes(term));
    });
  }

  extractSearchTerms(query: string): string[] {
    const serviceKeywords: { [key: string]: string[] } = {
      'plumber': ['plumber', 'plumbing', 'pipe', 'water', 'drain', 'leak'],
      'electrician': ['electrician', 'electrical', 'electric', 'wiring', 'power', 'circuit'],
      'cleaning': ['cleaning', 'clean', 'maid', 'housekeeping'],
      'ac repair': ['ac', 'air conditioning', 'cooling', 'air conditioner'],
      'carpenter': ['carpenter', 'carpentry', 'wood', 'furniture', 'cabinet'],
      'painting': ['painting', 'paint', 'painter', 'wall'],
      'pest control': ['pest', 'insect', 'rodent', 'termite', 'cockroach'],
      'computer repair': ['computer', 'laptop', 'pc', 'repair', 'fix computer'],
      'cctv': ['cctv', 'camera', 'surveillance', 'security camera'],
      'gardening': ['garden', 'gardening', 'landscape', 'plant', 'lawn']
    };

    const foundTerms: string[] = [];
    const lowerQuery = query.toLowerCase();

    for (const [category, keywords] of Object.entries(serviceKeywords)) {
      if (keywords.some(keyword => lowerQuery.includes(keyword))) {
        foundTerms.push(category);
      }
    }

    // Also check for direct category mentions
    for (const service of SERVICES_DATA) {
      if (lowerQuery.includes(service.category.toLowerCase())) {
        if (!foundTerms.includes(service.category.toLowerCase())) {
          foundTerms.push(service.category.toLowerCase());
        }
      }
    }

    return foundTerms;
  }

  addUserMessage(content: string) {
    this.messages.push({
      type: 'user',
      content: content.trim(),
      timestamp: new Date()
    });
  }

  addBotMessage(content: string) {
    this.messages.push({
      type: 'bot',
      content: content,
      timestamp: new Date()
    });
  }

  addServicesMessage(services: Service[]) {
    this.messages.push({
      type: 'bot',
      content: '',
      services: services,
      timestamp: new Date()
    });
  }

  bookService(service: Service) {
    this.router.navigate(['/book-service'], {
      queryParams: {
        name: service.name,
        category: service.categoryIcon + ' ' + service.category,
        location: service.location,
        phone: service.phone,
        rating: service.rating.toString()
      }
    });
    this.closeChat();
  }
}
