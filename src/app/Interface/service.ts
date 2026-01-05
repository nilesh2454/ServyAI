export interface Service {
  id: number;
  name: string;
  category: string;
  categoryIcon: string;
  location: string;
  phone: string;
  whatsapp: string;
  rating: number;
  price: number;
}

export const SERVICES_DATA: Service[] = [
  {
    id: 1,
    name: 'Raj Plumbing Services',
    category: 'Plumber',
    categoryIcon: '🔧',
    location: 'Pune, Maharashtra',
    phone: '+91 98765 43210',
    whatsapp: '919876543210',
    rating: 4.5,
    price: 500
  },
  {
    id: 2,
    name: 'QuickFix Electricians',
    category: 'Electrician',
    categoryIcon: '⚡',
    location: 'Mumbai, Maharashtra',
    phone: '+91 91234 56789',
    whatsapp: '919123456789',
    rating: 4.7,
    price: 600
  },
  {
    id: 3,
    name: 'CleanPro Home Care',
    category: 'Cleaning',
    categoryIcon: '🧹',
    location: 'Bangalore, Karnataka',
    phone: '+91 90123 45678',
    whatsapp: '919012345678',
    rating: 4.6,
    price: 800
  },
  {
    id: 4,
    name: 'Rapid AC Solutions',
    category: 'AC Repair',
    categoryIcon: '❄️',
    location: 'Chennai, Tamil Nadu',
    phone: '+91 88991 22334',
    whatsapp: '918899122334',
    rating: 4.4,
    price: 700
  },
  {
    id: 5,
    name: 'Urban Carpenter',
    category: 'Carpenter',
    categoryIcon: '🪚',
    location: 'Delhi',
    phone: '+91 99887 66554',
    whatsapp: '919988766554',
    rating: 4.6,
    price: 550
  },
  {
    id: 6,
    name: 'BrightHome Painters',
    category: 'Painting',
    categoryIcon: '🎨',
    location: 'Jaipur, Rajasthan',
    phone: '+91 90909 78787',
    whatsapp: '919090978787',
    rating: 4.5,
    price: 1200
  },
  {
    id: 7,
    name: 'SafeHome Pest Control',
    category: 'Pest Control',
    categoryIcon: '🐜',
    location: 'Ahmedabad, Gujarat',
    phone: '+91 77665 44332',
    whatsapp: '917766544332',
    rating: 4.3,
    price: 900
  },
  {
    id: 8,
    name: 'Quick Laptop Repair',
    category: 'Computer Repair',
    categoryIcon: '💻',
    location: 'Pune, Maharashtra',
    phone: '+91 88776 55443',
    whatsapp: '918877655443',
    rating: 4.7,
    price: 400
  },
  {
    id: 9,
    name: 'Secure CCTV Solutions',
    category: 'CCTV Installation',
    categoryIcon: '📷',
    location: 'Noida, UP',
    phone: '+91 77889 33445',
    whatsapp: '917788933445',
    rating: 4.6,
    price: 1500
  },
  {
    id: 10,
    name: 'Green Garden Care',
    category: 'Gardening',
    categoryIcon: '🌿',
    location: 'Indore, MP',
    phone: '+91 88990 22110',
    whatsapp: '918899022110',
    rating: 4.4,
    price: 450
  }
];
