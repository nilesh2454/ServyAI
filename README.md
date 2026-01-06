# 🚀 ServyAI - AI-Powered Service Finder Platform

<div align="center">

![Angular](https://img.shields.io/badge/Angular-21.0.0-red?style=for-the-badge&logo=angular)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9.2-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.1.18-38bdf8?style=for-the-badge&logo=tailwind-css)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

**Find trusted local services with AI-powered recommendations**

[Live Demo](https://servy-ai-nine.vercel.app) • [Report Bug](https://github.com/nilesh2454/ServyAI/issues) • [Request Feature](https://github.com/nilesh2454/ServyAI/issues)

</div>

---

## 📋 Table of Contents

- [About](#-about)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Getting Started](#-getting-started)
- [Project Structure](#-project-structure)
- [Available Scripts](#-available-scripts)
- [Key Features Explained](#-key-features-explained)
- [Deployment](#-deployment)
- [Contributing](#-contributing)
- [License](#-license)

## 🎯 About

**ServyAI** is a modern, AI-powered service discovery platform that helps users find and connect with trusted local service providers. Whether you need a plumber, electrician, cleaner, or any other professional service, ServyAI makes it easy to discover, compare, and book services instantly.

### Why ServyAI?

- 🤖 **AI-Powered Assistance**: Get instant recommendations through our intelligent chatbot
- 📍 **Location-Based Search**: Find services near you quickly
- ⭐ **Verified Providers**: Browse services with ratings and reviews
- 📞 **Direct Contact**: Connect via Call or WhatsApp instantly
- 🎨 **Modern UI**: Beautiful, responsive design built with Tailwind CSS
- 🔒 **Secure Booking**: Protected booking system with authentication

## ✨ Features

### Core Features

- 🔍 **Advanced Search**: Search services by name, category, or location
- 🤖 **AI Chatbot**: Interactive AI assistant to help find the right service
- 📱 **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- 🔐 **User Authentication**: Secure login system for booking services
- 📅 **Booking Management**: Track and manage your service bookings
- 👨‍💼 **Admin Dashboard**: Manage services and bookings (admin access)
- 🎯 **Service Filtering**: Filter by category, location, and price
- 📊 **Sorting Options**: Sort services by price (low to high / high to low)

### Service Categories

- 🔧 Plumber
- ⚡ Electrician
- 🧹 Cleaning
- ❄️ AC Repair
- 🪚 Carpenter
- 🎨 Painting
- 🐜 Pest Control
- 💻 Computer Repair
- 📷 CCTV Installation
- 🌿 Gardening

## 🛠️ Tech Stack

### Frontend
- **Framework**: Angular 21.0.0
- **Language**: TypeScript 5.9.2
- **Styling**: Tailwind CSS 4.1.18
- **State Management**: Angular Services & RxJS
- **Routing**: Angular Router with Guards

### Development Tools
- **Build Tool**: Angular Build (@angular/build)
- **Package Manager**: npm 10.8.2
- **Testing**: Vitest 4.0.8
- **SSR**: Angular SSR (@angular/ssr)

### Additional Libraries
- **HTTP Client**: Angular HttpClient
- **Forms**: Angular Reactive Forms & Template-driven Forms
- **Icons**: SVG Icons & Font Awesome

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v18 or higher)
- **npm** (v10.8.2 or higher)
- **Angular CLI** (v21.0.4)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/nilesh2454/ServyAI.git
   cd ServyAI
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   # or
   ng serve
   ```

4. **Open your browser**
   Navigate to `http://localhost:4200/`

The application will automatically reload when you modify any source files.

## 📁 Project Structure

```
ServyAI/
├── src/
│   ├── app/
│   │   ├── about/              # About page component
│   │   ├── admin/              # Admin dashboard
│   │   ├── book-service/       # Service booking component
│   │   ├── bookings/           # User bookings page
│   │   ├── chatbot/            # AI chatbot component
│   │   ├── contact/            # Contact page
│   │   ├── guards/             # Route guards (auth, admin)
│   │   ├── home/               # Home page with search
│   │   ├── Interface/          # TypeScript interfaces
│   │   │   ├── booking.ts      # Booking interface
│   │   │   └── service.ts      # Service interface & data
│   │   ├── login/              # Login component
│   │   ├── services/           # Angular services
│   │   │   ├── auth.service.ts
│   │   │   └── booking.service.ts
│   │   ├── services-page/      # Services listing page
│   │   ├── app.config.ts       # App configuration
│   │   ├── app.routes.ts       # Route definitions
│   │   └── app.ts              # Root component
│   ├── assets/                 # Static assets (images, icons)
│   ├── index.html              # Main HTML file
│   ├── main.ts                 # Application entry point
│   └── styles.css              # Global styles
├── public/                     # Public assets
├── angular.json                # Angular configuration
├── package.json                # Dependencies & scripts
├── tsconfig.json               # TypeScript configuration
└── README.md                   # This file
```

## 📜 Available Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Start development server on `http://localhost:4200` |
| `npm run build` | Build the project for production |
| `npm run watch` | Build and watch for changes |
| `npm test` | Run unit tests with Vitest |
| `npm run serve:ssr:serviceAI` | Serve SSR build locally |

## 🎨 Key Features Explained

### 1. Service Search & Discovery
- **Home Page Search**: Quick search by service type and location
- **Advanced Filtering**: Filter by category, location, and price range
- **Smart Sorting**: Sort services by price or rating

### 2. AI Chatbot Assistant
- **Natural Language Processing**: Ask questions in plain English
- **Service Recommendations**: Get personalized service suggestions
- **Interactive Interface**: Chat-like experience with instant responses

### 3. Booking System
- **Secure Booking**: Protected routes with authentication guards
- **Booking Form**: Comprehensive form with validation
- **Booking History**: View all your past and upcoming bookings

### 4. Direct Contact
- **One-Click Calling**: Direct phone call integration
- **WhatsApp Integration**: Instant WhatsApp messaging
- **Service Details**: Complete information about each provider

### 5. Admin Dashboard
- **Service Management**: Add, edit, or remove services
- **Booking Overview**: Monitor all bookings
- **User Management**: Manage user accounts

## 🚢 Deployment

### Build for Production

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
"# ServyAI" 
"# ServyAI" 
