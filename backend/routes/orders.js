const express = require('express');
const { orders, products, carts, generateOrderId } = require('../data/mockData');
const { authenticateToken, requireAdmin } = require('../middleware/auth');
const { validateOrder, validateId, validatePagination } = require('../middleware/validation');

const router = express.Router();

// Helper function to calculate order totals
const calculateOrderTotals = (items) => {
  const subtotal = items.reduce((total, item) => {
    return total + (item.price * item.quantity);
  }, 0);

  const tax = subtotal * 0.21; // 21% IVA
  const shipping = subtotal >= 100 ? 0 : 10; // Free shipping over $100
  const total = subtotal + tax + shipping;

  return {
    subtotal: Math.round(subtotal * 100) / 100,
    tax: Math.round(tax * 100) / 100,
    shipping: Math.round(shipping * 100) / 100,
    total: Math.round(total * 100) / 100
  };
};

// Helper function to generate tracking number
const generateTrackingNumber = () => {
  return 'TH' + Date.now().toString().slice(-9);
};

// @route   GET /api/orders
// @desc    Get user's orders (or all orders for admin)
// @access  Private
router.get('/', authenticateToken, validatePagination, (req, res) => {
  try {
    const { page = 1, limit = 10, status } = req.query;
    let userOrders;

    if (req.user.role === 'admin') {
      // Admin can see all orders
      userOrders = [...orders];
    } else {
      // Regular users can only see their own orders
      userOrders = orders.filter(order => order.userId === req.user.id);
    }

    // Filter by status if provided
    if (status) {
      userOrders = userOrders.filter(order => order.status === status);
    }

    // Sort by creation date (newest first)
    userOrders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    // Pagination
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + parseInt(limit);
    const paginatedOrders = userOrders.slice(startIndex, endIndex);

    res.json({
      success: true,
      data: {
        orders: paginatedOrders,
        pagination: {
          currentPage: parseInt(page),
          totalPages: Math.ceil(userOrders.length / limit),
          totalOrders: userOrders.length,
          hasNextPage: endIndex < userOrders.length,
          hasPrevPage: page > 1
        }
      }
    });
  } catch (error) {
    console.error('Get orders error:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor'
    });
  }
});

// @route   GET /api/orders/:id
// @desc    Get single order
// @access  Private
router.get('/:id', authenticateToken, validateId, (req, res) => {
  try {
    const { id } = req.params;

    // Find order
    const order = orders.find(o => o.id === id);
    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Pedido no encontrado'
      });
    }

    // Check if user can access this order
    if (req.user.role !== 'admin' && order.userId !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'No tienes permisos para ver este pedido'
      });
    }

    res.json({
      success: true,
      data: {
        order
      }
    });
  } catch (error) {
    console.error('Get order error:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor'
    });
  }
});

// @route   POST /api/orders
// @desc    Create new order
// @access  Private
router.post('/', authenticateToken, validateOrder, (req, res) => {
  try {
    const { customerInfo, paymentMethod, shippingMethod = 'standard' } = req.body;

    // Get user's cart
    const userCart = carts[req.user.id];
    if (!userCart || !userCart.items || userCart.items.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'El carrito está vacío'
      });
    }

    // Validate cart items and check stock
    const orderItems = [];
    for (const cartItem of userCart.items) {
      const product = products.find(p => p.id === cartItem.productId && p.active);
      if (!product) {
        return res.status(400).json({
          success: false,
          message: `Producto ${cartItem.name} no está disponible`
        });
      }

      if (product.stock < cartItem.quantity) {
        return res.status(400).json({
          success: false,
          message: `Stock insuficiente para ${product.name}. Solo hay ${product.stock} unidades disponibles`
        });
      }

      orderItems.push({
        productId: product.id,
        quantity: cartItem.quantity,
        price: product.price,
        name: product.name
      });
    }

    // Calculate totals
    const totals = calculateOrderTotals(orderItems);

    // Create new order
    const newOrder = {
      id: generateOrderId(),
      userId: req.user.id,
      customerInfo,
      items: orderItems,
      ...totals,
      status: 'pending',
      paymentMethod,
      shippingMethod,
      trackingNumber: generateTrackingNumber(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    // Save order to mock data
    // TODO: Replace with database transaction
    orders.push(newOrder);

    // Update product stock
    for (const item of orderItems) {
      const productIndex = products.findIndex(p => p.id === item.productId);
      if (productIndex >= 0) {
        products[productIndex].stock -= item.quantity;
      }
    }

    // Clear user's cart
    if (carts[req.user.id]) {
      carts[req.user.id].items = [];
      carts[req.user.id].updatedAt = new Date().toISOString();
    }

    res.status(201).json({
      success: true,
      message: 'Pedido creado exitosamente',
      data: {
        order: newOrder
      }
    });
  } catch (error) {
    console.error('Create order error:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor'
    });
  }
});

// @route   PUT /api/orders/:id/status
// @desc    Update order status
// @access  Private (Admin only)
router.put('/:id/status', authenticateToken, requireAdmin, validateId, (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const validStatuses = ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Estado de pedido inválido'
      });
    }

    // Find order
    const orderIndex = orders.findIndex(o => o.id === id);
    if (orderIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Pedido no encontrado'
      });
    }

    // Update order status
    orders[orderIndex].status = status;
    orders[orderIndex].updatedAt = new Date().toISOString();

    // If order is cancelled, restore product stock
    if (status === 'cancelled' && orders[orderIndex].status !== 'cancelled') {
      for (const item of orders[orderIndex].items) {
        const productIndex = products.findIndex(p => p.id === item.productId);
        if (productIndex >= 0) {
          products[productIndex].stock += item.quantity;
        }
      }
    }

    res.json({
      success: true,
      message: 'Estado del pedido actualizado',
      data: {
        order: orders[orderIndex]
      }
    });
  } catch (error) {
    console.error('Update order status error:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor'
    });
  }
});

// @route   GET /api/orders/:id/tracking
// @desc    Get order tracking information
// @access  Private
router.get('/:id/tracking', authenticateToken, validateId, (req, res) => {
  try {
    const { id } = req.params;

    // Find order
    const order = orders.find(o => o.id === id);
    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Pedido no encontrado'
      });
    }

    // Check if user can access this order
    if (req.user.role !== 'admin' && order.userId !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'No tienes permisos para ver este pedido'
      });
    }

    // Mock tracking events based on order status
    const trackingEvents = [
      {
        status: 'pending',
        description: 'Pedido recibido',
        date: order.createdAt,
        completed: true
      }
    ];

    if (['confirmed', 'shipped', 'delivered'].includes(order.status)) {
      trackingEvents.push({
        status: 'confirmed',
        description: 'Pedido confirmado',
        date: new Date(new Date(order.createdAt).getTime() + 2 * 60 * 60 * 1000).toISOString(),
        completed: true
      });
    }

    if (['shipped', 'delivered'].includes(order.status)) {
      trackingEvents.push({
        status: 'shipped',
        description: 'Pedido enviado',
        date: new Date(new Date(order.createdAt).getTime() + 24 * 60 * 60 * 1000).toISOString(),
        completed: true
      });
    }

    if (order.status === 'delivered') {
      trackingEvents.push({
        status: 'delivered',
        description: 'Pedido entregado',
        date: new Date(new Date(order.createdAt).getTime() + 72 * 60 * 60 * 1000).toISOString(),
        completed: true
      });
    }

    res.json({
      success: true,
      data: {
        orderId: order.id,
        trackingNumber: order.trackingNumber,
        currentStatus: order.status,
        events: trackingEvents
      }
    });
  } catch (error) {
    console.error('Get order tracking error:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor'
    });
  }
});

module.exports = router;