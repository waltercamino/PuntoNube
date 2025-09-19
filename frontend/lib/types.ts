export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  images: string[];
  category: string;
  stock: number;
  featured: boolean;
  favorite?: boolean;
  rating?: number;
  reviews?: number;
  tags?: string[];
  variants?: ProductVariant[];
}

export interface ProductVariant {
  id: string;
  name: string;
  value: string;
  priceModifier?: number;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  image?: string;
  parent?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedVariants?: { [key: string]: string };
}

export interface Order {
  id: string;
  customerName: string;
  email: string;
  phone: string;
  address: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  date: string;
  paymentMethod: string;
  shippingMethod: string;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  orders: Order[];
}

export interface DashboardMetrics {
  totalSales: number;
  totalOrders: number;
  totalProducts: number;
  totalCustomers: number;
  monthlyRevenue: { month: string; revenue: number }[];
  topProducts: { product: Product; sales: number }[];
}

export type Language = 'es' | 'en';

export interface Translation {
  [key: string]: string | Translation;
}