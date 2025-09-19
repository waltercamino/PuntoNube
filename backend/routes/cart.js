const express = require('express');
const { products, carts } = require('../data/mockData');
const { authenticateToken } = require('../middleware/auth');
const { validateCartItem, validateId } = require('../middleware/validation');

const router = express.Router();

// Helper function to get user's cart
const getUserCart = (userId) => {
  if (!carts[userId]) {
    carts[userId] = {
      userId,
      items: [],
      updatedAt: new Date().toISOString()
    };
  }
  return carts[userId];
};

// Helper function to calculate cart totals
const calculateCartTotals = (cartItems) => {
  const subtotal = cartItems.reduce((total, item) => {
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

// @route   GET /api/cart
// @desc    Get user's cart
// @access  Private
router.get('/', authenticateToken, (req, res) => {
  try {
    const cart = getUserCart(req.user.id);

    // Validate cart items and update with current product info
    const validItems = [];
    for (const item of cart.items) {
      const product = products.find(p => p.id === item.productId && p.active);
      if (product) {
        validItems.push({
          ...item,
          name: product.name,
          price: product.price,
          image: product.images[0],
          stock: product.stock,
          available: product.stock >= item.quantity
        });
      }
    }

    // Update cart with valid items only
    cart.items = validItems;

    // Calculate totals
    const totals = calculateCartTotals(cart.items);

    res.json({
      success: true,
      data: {
        cart: {
          ...cart,
          itemCount: cart.items.reduce((count, item) => count + item.quantity, 0),
          ...totals
        }
      }
    });
  } catch (error) {
    console.error('Get cart error:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor'
    });
  }
});

// @route   POST /api/cart/items
// @desc    Add item to cart
// @access  Private
router.post('/items', authenticateToken, validateCartItem, (req, res) => {
  try {
    const { productId, quantity } = req.body;

    // Find product
    const product = products.find(p => p.id === productId && p.active);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Producto no encontrado'
      });
    }

    // Check stock availability
    if (product.stock < quantity) {
      return res.status(400).json({
        success: false,
        message: `Stock insuficiente. Solo hay ${product.stock} unidades disponibles`
      });
    }

    const cart = getUserCart(req.user.id);

    // Check if item already exists in cart
    const existingItemIndex = cart.items.findIndex(item => item.productId === productId);

    if (existingItemIndex >= 0) {
      // Update quantity
      const newQuantity = cart.items[existingItemIndex].quantity + quantity;
      
      if (newQuantity > product.stock) {
        return res.status(400).json({
          success: false,
          message: `Stock insuficiente. Solo hay ${product.stock} unidades disponibles`
        });
      }

      cart.items[existingItemIndex].quantity = newQuantity;
    } else {
      // Add new item
      cart.items.push({
        productId,
        quantity,
        name: product.name,
        price: product.price,
        image: product.images[0],
        addedAt: new Date().toISOString()
      });
    }

    cart.updatedAt = new Date().toISOString();

    // Calculate totals
    const totals = calculateCartTotals(cart.items);

    res.json({
      success: true,
      message: 'Producto agregado al carrito',
      data: {
        cart: {
          ...cart,
          itemCount: cart.items.reduce((count, item) => count + item.quantity, 0),
          ...totals
        }
      }
    });
  } catch (error) {
    console.error('Add to cart error:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor'
    });
  }
});

// @route   PUT /api/cart/items/:productId
// @desc    Update cart item quantity
// @access  Private
router.put('/items/:productId', authenticateToken, validateId, (req, res) => {
  try {
    const { productId } = req.params;
    const { quantity } = req.body;

    if (!quantity || quantity < 1) {
      return res.status(400).json({
        success: false,
        message: 'La cantidad debe ser mayor a 0'
      });
    }

    // Find product
    const product = products.find(p => p.id === productId && p.active);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Producto no encontrado'
      });
    }

    // Check stock availability
    if (product.stock < quantity) {
      return res.status(400).json({
        success: false,
        message: `Stock insuficiente. Solo hay ${product.stock} unidades disponibles`
      });
    }

    const cart = getUserCart(req.user.id);

    // Find item in cart
    const itemIndex = cart.items.findIndex(item => item.productId === productId);
    if (itemIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Producto no encontrado en el carrito'
      });
    }

    // Update quantity
    cart.items[itemIndex].quantity = quantity;
    cart.updatedAt = new Date().toISOString();

    // Calculate totals
    const totals = calculateCartTotals(cart.items);

    res.json({
      success: true,
      message: 'Cantidad actualizada',
      data: {
        cart: {
          ...cart,
          itemCount: cart.items.reduce((count, item) => count + item.quantity, 0),
          ...totals
        }
      }
    });
  } catch (error) {
    console.error('Update cart item error:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor'
    });
  }
});

// @route   DELETE /api/cart/items/:productId
// @desc    Remove item from cart
// @access  Private
router.delete('/items/:productId', authenticateToken, validateId, (req, res) => {
  try {
    const { productId } = req.params;

    const cart = getUserCart(req.user.id);

    // Find and remove item
    const itemIndex = cart.items.findIndex(item => item.productId === productId);
    if (itemIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Producto no encontrado en el carrito'
      });
    }

    cart.items.splice(itemIndex, 1);
    cart.updatedAt = new Date().toISOString();

    // Calculate totals
    const totals = calculateCartTotals(cart.items);

    res.json({
      success: true,
      message: 'Producto eliminado del carrito',
      data: {
        cart: {
          ...cart,
          itemCount: cart.items.reduce((count, item) => count + item.quantity, 0),
          ...totals
        }
      }
    });
  } catch (error) {
    console.error('Remove cart item error:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor'
    });
  }
});

// @route   DELETE /api/cart
// @desc    Clear cart
// @access  Private
router.delete('/', authenticateToken, (req, res) => {
  try {
    const cart = getUserCart(req.user.id);
    cart.items = [];
    cart.updatedAt = new Date().toISOString();

    res.json({
      success: true,
      message: 'Carrito vaciado',
      data: {
        cart: {
          ...cart,
          itemCount: 0,
          subtotal: 0,
          tax: 0,
          shipping: 0,
          total: 0
        }
      }
    });
  } catch (error) {
    console.error('Clear cart error:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor'
    });
  }
});

module.exports = router;