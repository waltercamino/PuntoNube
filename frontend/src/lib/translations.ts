import { Translation } from './types';

export const translations: { [key: string]: Translation } = {
  es: {
    navigation: {
      home: 'Inicio',
      catalog: 'Catálogo',
      contact: 'Contacto',
      about: 'Acerca de',
      cart: 'Carrito',
      admin: 'Admin'
    },
    product: {
      addToCart: 'Agregar al Carrito',
      buyNow: 'Comprar Ahora',
      outOfStock: 'Sin Stock',
      price: 'Precio',
      description: 'Descripción',
      reviews: 'Reseñas',
      rating: 'Calificación'
    },
    cart: {
      title: 'Carrito de Compras',
      empty: 'Tu carrito está vacío',
      subtotal: 'Subtotal',
      total: 'Total',
      checkout: 'Proceder al Pago',
      remove: 'Eliminar',
      quantity: 'Cantidad'
    },
    checkout: {
      title: 'Finalizar Compra',
      shippingInfo: 'Información de Envío',
      paymentMethod: 'Método de Pago',
      orderSummary: 'Resumen del Pedido',
      placeOrder: 'Realizar Pedido',
      name: 'Nombre Completo',
      email: 'Email',
      phone: 'Teléfono',
      address: 'Dirección'
    },
    admin: {
      dashboard: 'Panel de Control',
      products: 'Productos',
      categories: 'Categorías',
      orders: 'Pedidos',
      customers: 'Clientes',
      addProduct: 'Agregar Producto',
      editProduct: 'Editar Producto',
      deleteProduct: 'Eliminar Producto'
    },
    footer: {
      newsletter: 'Suscríbete a nuestro newsletter',
      subscribe: 'Suscribirse',
      contact: 'Contacto',
      about: 'Acerca de',
      privacy: 'Privacidad',
      terms: 'Términos'
    }
  },
  en: {
    navigation: {
      home: 'Home',
      catalog: 'Catalog',
      contact: 'Contact',
      about: 'About',
      cart: 'Cart',
      admin: 'Admin'
    },
    product: {
      addToCart: 'Add to Cart',
      buyNow: 'Buy Now',
      outOfStock: 'Out of Stock',
      price: 'Price',
      description: 'Description',
      reviews: 'Reviews',
      rating: 'Rating'
    },
    cart: {
      title: 'Shopping Cart',
      empty: 'Your cart is empty',
      subtotal: 'Subtotal',
      total: 'Total',
      checkout: 'Checkout',
      remove: 'Remove',
      quantity: 'Quantity'
    },
    checkout: {
      title: 'Checkout',
      shippingInfo: 'Shipping Information',
      paymentMethod: 'Payment Method',
      orderSummary: 'Order Summary',
      placeOrder: 'Place Order',
      name: 'Full Name',
      email: 'Email',
      phone: 'Phone',
      address: 'Address'
    },
    admin: {
      dashboard: 'Dashboard',
      products: 'Products',
      categories: 'Categories',
      orders: 'Orders',
      customers: 'Customers',
      addProduct: 'Add Product',
      editProduct: 'Edit Product',
      deleteProduct: 'Delete Product'
    },
    footer: {
      newsletter: 'Subscribe to our newsletter',
      subscribe: 'Subscribe',
      contact: 'Contact',
      about: 'About',
      privacy: 'Privacy',
      terms: 'Terms'
    }
  }
};