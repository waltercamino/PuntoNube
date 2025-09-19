import { Product, Category, Order, DashboardMetrics } from './types';

export const categories: Category[] = [
  {
    id: '1',
    name: 'Electrónicos',
    slug: 'electronicos',
    image: 'https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    id: '2',
    name: 'Ropa',
    slug: 'ropa',
    image: 'https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    id: '3',
    name: 'Hogar',
    slug: 'hogar',
    image: 'https://images.pexels.com/photos/1350789/pexels-photo-1350789.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    id: '4',
    name: 'Deportes',
    slug: 'deportes',
    image: 'https://images.pexels.com/photos/163452/basketball-dunk-blue-game-163452.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    id: '5',
    name: 'Libros',
    slug: 'libros',
    image: 'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  }
];

export const products: Product[] = [
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
    category: '1',
    stock: 25,
    featured: true,
    favorite: true,
    rating: 4.8,
    reviews: 324,
    tags: ['nuevo', 'premium'],
    variants: [
      { id: 'color', name: 'Color', value: 'Titanio Natural' },
      { id: 'storage', name: 'Almacenamiento', value: '256GB' }
    ]
  },
  {
    id: '2',
    name: 'MacBook Air M3',
    description: 'Laptop ultradelgada con chip M3, pantalla Liquid Retina de 13 pulgadas y hasta 18 horas de batería.',
    price: 1099,
    images: [
      'https://images.pexels.com/photos/205421/pexels-photo-205421.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      'https://images.pexels.com/photos/374074/pexels-photo-374074.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    ],
    category: '1',
    stock: 15,
    featured: true,
    rating: 4.9,
    reviews: 156
  },
  {
    id: '3',
    name: 'Camiseta Básica Premium',
    description: 'Camiseta de algodón 100% orgánico, corte moderno y colores vibrantes.',
    price: 29.99,
    images: [
      'https://images.pexels.com/photos/8532616/pexels-photo-8532616.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      'https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    ],
    category: '2',
    stock: 100,
    featured: false,
    favorite: true,
    rating: 4.5,
    reviews: 89
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
    category: '3',
    stock: 8,
    featured: true,
    rating: 4.7,
    reviews: 45
  },
  {
    id: '5',
    name: 'Zapatillas Running Pro',
    description: 'Zapatillas de running profesionales con tecnología de amortiguación avanzada.',
    price: 149.99,
    images: [
      'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      'https://images.pexels.com/photos/163452/basketball-dunk-blue-game-163452.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    ],
    category: '4',
    stock: 50,
    featured: true,
    rating: 4.6,
    reviews: 203
  },
  {
    id: '6',
    name: 'El Arte de la Guerra',
    description: 'Clásico tratado de estrategia militar de Sun Tzu, edición de lujo con tapa dura.',
    price: 24.99,
    images: [
      'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      'https://images.pexels.com/photos/256559/pexels-photo-256559.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    ],
    category: '5',
    stock: 30,
    featured: false,
    rating: 4.8,
    reviews: 67
  }
];

export const orders: Order[] = [
  {
    id: 'ORD-001',
    customerName: 'Juan Pérez',
    email: 'juan@example.com',
    phone: '+54 11 1234-5678',
    address: 'Av. Corrientes 1234, Buenos Aires',
    items: [
      { product: products[0], quantity: 1 },
      { product: products[2], quantity: 2 }
    ],
    total: 1259.98,
    status: 'confirmed',
    date: '2024-01-15',
    paymentMethod: 'Tarjeta de Crédito',
    shippingMethod: 'Envío Estándar'
  },
  {
    id: 'ORD-002',
    customerName: 'María González',
    email: 'maria@example.com',
    phone: '+54 11 9876-5432',
    address: 'Calle Florida 567, Buenos Aires',
    items: [
      { product: products[1], quantity: 1 }
    ],
    total: 1099,
    status: 'shipped',
    date: '2024-01-14',
    paymentMethod: 'Transferencia',
    shippingMethod: 'Envío Express'
  }
];

export const dashboardMetrics: DashboardMetrics = {
  totalSales: 15430.50,
  totalOrders: 47,
  totalProducts: 156,
  totalCustomers: 234,
  monthlyRevenue: [
    { month: 'Ene', revenue: 12500 },
    { month: 'Feb', revenue: 15200 },
    { month: 'Mar', revenue: 18900 },
    { month: 'Abr', revenue: 16800 },
    { month: 'May', revenue: 21400 },
    { month: 'Jun', revenue: 19600 }
  ],
  topProducts: [
    { product: products[0], sales: 45 },
    { product: products[1], sales: 32 },
    { product: products[4], sales: 28 }
  ]
};