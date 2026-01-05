export interface Booking {
  id: string;
  /** ID of the user who created this booking */
  userId?: string;
  serviceName: string;
  serviceCategory: string;
  serviceLocation: string;
  servicePhone: string;
  /** Static/provider rating at time of booking (optional, for display) */
  serviceRating?: string;
  /** Rating given by the user for this booking (1–5). */
  userRating?: number;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  address: string;
  date: string;
  time: string;
  description: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  bookingDate: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'user' | 'provider' | 'admin';
  createdAt: string;
}

export interface Provider extends User {
  serviceCategory: string;
  location: string;
  price: number;
  /** Whether this provider is approved by admin */
  status: 'pending' | 'approved';
}

// Contact / support messages sent from the Contact Us page
export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
  /** Simple flag so admin can see if it's been reviewed */
  status: 'new' | 'resolved';
}

