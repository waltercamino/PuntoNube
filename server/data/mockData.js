// Mock data storage - Replace with database models later
let users = [
  {
    id: '1',
    email: 'admin@tiendahub.com',
    password: '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password
    firstName: 'Admin',
    lastName: 'User',
    role: 'admin',
    phone: '+54 11 1234-5678',
    address: 'Av. Corrientes 1234, Buenos Aires',
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2024-01-01T00:00:00.000Z'
  },
  {
    id: '2',
    email: 'cliente@example.com',
    password: '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password
    firstName: 'Juan',
    lastName: 'Pérez',
    role: 'customer',
    phone: '+54 11 9876-5432',
    address: 'Calle Florida 567, Buenos Aires',
    createdAt: '2024-01-15T00:00:00.000Z',
    updatedAt: '2024-01-15T00:00:00.000Z'
  }
];

let categories = [
  {
    id: '1',
    name: 'Electrónicos',
    slug: 'electronicos',
    description: 'Dispositivos electrónicos y tecnología',
    image: 'https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    active: true,
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2024-01-01T00:00:00.000Z'
  },
  {
    id: '2',
    name: 'Ropa',
    slug: 'ropa',
    description: 'Ropa y accesorios de moda',
    image: 'https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    active: true,
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2024-01-01T00:00:00.000Z'
  },
  {
    id: '3',
    name: 'Hogar',
    slug: 'hogar',
    description: 'Artículos para el hogar y decoración',
    image: 'https://images.pexels.com/photos/1350789/pexels-photo-1350789.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    active: true,
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2024-01-01T00:00:00.000Z'
  },
  {
    id: '4',
    name: 'Deportes',
    slug: 'deportes',
    description: 'Artículos deportivos y fitness',
    image: 'https://images.pexels.com/photos/163452/basketball-dunk-blue-game-163452.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    active: true,
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2024-01-01T00:00:00.000Z'
  },
  {
    id: '5',
    name: 'Libros',
    slug: 'libros',
    description: 'Libros y material educativo',
    image: 'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    active: true,
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2024-01-01T00:00:00.000Z'
  }
];

let products = [
  {
    id: '1',
    name: 'iPhone 15 Pro Max',
    description: 'El iPhone más avanzado con chip A17 Pro, sistema de cámaras Pro y titanio de grado aeroespacial.',
    price: 1199,
    originalPrice: 1299,
    images: [
      'https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      'https://images.pexels.com/photos/1092644/pexels-photo-1092644.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    ],
    categoryId: '1',
    stock: 25,
    featured: true,
    active: true,
    rating: 4.8,
    reviews: 324,
    tags: ['nuevo', 'premium'],
    variants: [
      { id: 'color', name: 'Color', value: 'Titanio Natural' },
      { id: 'storage', name: 'Almacenamiento', value: '256GB' }
    ],
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2024-01-01T00:00:00.000Z'
  },
  {
    id: '2',
    name: 'MacBook Air M3',
    description: 'Laptop ultradelgada con chip M3, pantalla Liquid Retina de 13 pulgadas y hasta 18 horas de batería.',
    price: 1099,
    originalPrice: null,
    images: [
      'https://images.pexels.com/photos/205421/pexels-photo-205421.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      'https://images.pexels.com/photos/374074/pexels-photo-374074.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    ],
    categoryId: '1',
    stock: 15,
    featured: true,
    active: true,
    rating: 4.9,
    reviews: 156,
    tags: ['laptop', 'apple'],
    variants: [],
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2024-01-01T00:00:00.000Z'
  },
  {
    id: '3',
    name: 'Camiseta Básica Premium',
    description: 'Camiseta de algodón 100% orgánico, corte moderno y colores vibrantes.',
    price: 29.99,
    originalPrice: null,
    images: [
      'https://images.pexels.com/photos/8532616/pexels-photo-8532616.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      'https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    ],
    categoryId: '2',
    stock: 100,
    featured: false,
    active: true,
    rating: 4.5,
    reviews: 89,
    tags: ['básico', 'algodón'],
    variants: [],
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2024-01-01T00:00:00.000Z'
  },
  {
    id: '4',
    name: 'Sofá Moderno 3 Plazas',
    description: 'Sofá contemporáneo tapizado en tela de alta calidad, estructura de madera maciza.',
    price: 899,
    originalPrice: 1199,
    images: [
      'https://images.pexels.com/photos/1350789/pexels-photo-1350789.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      'https://images.pexels.com/photos/276583/pexels-photo-276583.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    ],
    categoryId: '3',
    stock: 8,
    featured: true,
    active: true,
    rating: 4.7,
    reviews: 45,
    tags: ['mueble', 'sala'],
    variants: [],
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2024-01-01T00:00:00.000Z'
  },
  {
    id: '5',
    name: 'Zapatillas Running Pro',
    description: 'Zapatillas de running profesionales con tecnología de amortiguación avanzada.',
    price: 149.99,
    originalPrice: null,
    images: [
      'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      'https://images.pexels.com/photos/163452/basketball-dunk-blue-game-163452.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    ],
    categoryId: '4',
    stock: 50,
    featured: true,
    active: true,
    rating: 4.6,
    reviews: 203,
    tags: ['running', 'deporte'],
    variants: [],
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2024-01-01T00:00:00.000Z'
  },
  {
    id: '6',
    name: 'El Arte de la Guerra',
    description: 'Clásico tratado de estrategia militar de Sun Tzu, edición de lujo con tapa dura.',
    price: 24.99,
    originalPrice: null,
    images: [
      'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      'https://images.pexels.com/photos/256559/pexels-photo-256559.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    ],
    categoryId: '5',
    stock: 30,
    featured: false,
    active: true,
    rating: 4.8,
    reviews: 67,
    tags: ['clásico', 'estrategia'],
    variants: [],
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2024-01-01T00:00:00.000Z'
  }
];

let orders = [
  {
    id: 'ORD-001',
    userId: '2',
    customerInfo: {
      firstName: 'Juan',
      lastName: 'Pérez',
      email: 'juan@example.com',
      phone: '+54 11 1234-5678',
      address: 'Av. Corrientes 1234, Buenos Aires',
      city: 'Buenos Aires',
      zipCode: '1043'
    },
    items: [
      { 
        productId: '1', 
        quantity: 1, 
        price: 1199,
        name: 'iPhone 15 Pro Max'
      },
      { 
        productId: '3', 
        quantity: 2, 
        price: 29.99,
        name: 'Camiseta Básica Premium'
      }
    ],
    subtotal: 1259.98,
    tax: 264.60,
    shipping: 0,
    total: 1524.58,
    status: 'confirmed',
    paymentMethod: 'credit-card',
    shippingMethod: 'standard',
    trackingNumber: 'TH001234567',
    createdAt: '2024-01-15T10:30:00.000Z',
    updatedAt: '2024-01-15T10:30:00.000Z'
  },
  {
    id: 'ORD-002',
    userId: '2',
    customerInfo: {
      firstName: 'María',
      lastName: 'González',
      email: 'maria@example.com',
      phone: '+54 11 9876-5432',
      address: 'Calle Florida 567, Buenos Aires',
      city: 'Buenos Aires',
      zipCode: '1005'
    },
    items: [
      { 
        productId: '2', 
        quantity: 1, 
        price: 1099,
        name: 'MacBook Air M3'
      }
    ],
    subtotal: 1099,
    tax: 230.79,
    shipping: 0,
    total: 1329.79,
    status: 'shipped',
    paymentMethod: 'bank-transfer',
    shippingMethod: 'express',
    trackingNumber: 'TH001234568',
    createdAt: '2024-01-14T15:45:00.000Z',
    updatedAt: '2024-01-16T09:20:00.000Z'
  }
];

// Cart storage (in production, this would be in database or Redis)
let carts = {};

// Helper functions to generate IDs
const generateId = () => {
  return Date.now().toString() + Math.random().toString(36).substr(2, 9);
};

const generateOrderId = () => {
  const timestamp = Date.now().toString().slice(-6);
  return `ORD-${timestamp}`;
};

module.exports = {
  users,
  categories,
  products,
  orders,
  carts,
  generateId,
  generateOrderId
};