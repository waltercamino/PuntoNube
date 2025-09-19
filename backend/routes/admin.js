const express = require('express');
const { users, products, categories, orders } = require('../data/mockData');
const { authenticateToken, requireAdmin } = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/admin/dashboard
// @desc    Get dashboard metrics
// @access  Private (Admin only)
router.get('/dashboard', authenticateToken, requireAdmin, (req, res) => {
  try {
    // Calculate metrics
    const totalUsers = users.length;
    const totalProducts = products.length;
    const activeProducts = products.filter(p => p.active).length;
    const totalCategories = categories.length;
    const totalOrders = orders.length;

    // Calculate revenue
    const totalRevenue = orders
      .filter(order => order.status !== 'cancelled')
      .reduce((sum, order) => sum + order.total, 0);

    // Calculate orders by status
    const ordersByStatus = {
      pending: orders.filter(o => o.status === 'pending').length,
      confirmed: orders.filter(o => o.status === 'confirmed').length,
      shipped: orders.filter(o => o.status === 'shipped').length,
      delivered: orders.filter(o => o.status === 'delivered').length,
      cancelled: orders.filter(o => o.status === 'cancelled').length
    };

    // Calculate monthly revenue (mock data for last 6 months)
    const monthlyRevenue = [
      { month: 'Ene', revenue: 12500 },
      { month: 'Feb', revenue: 15200 },
      { month: 'Mar', revenue: 18900 },
      { month: 'Abr', revenue: 16800 },
      { month: 'May', revenue: 21400 },
      { month: 'Jun', revenue: Math.round(totalRevenue) }
    ];

    // Top selling products
    const productSales = {};
    orders.forEach(order => {
      if (order.status !== 'cancelled') {
        order.items.forEach(item => {
          if (productSales[item.productId]) {
            productSales[item.productId] += item.quantity;
          } else {
            productSales[item.productId] = item.quantity;
          }
        });
      }
    });

    const topProducts = Object.entries(productSales)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 5)
      .map(([productId, sales]) => {
        const product = products.find(p => p.id === productId);
        return {
          product: product ? {
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.images[0]
          } : null,
          sales
        };
      })
      .filter(item => item.product);

    // Recent orders
    const recentOrders = orders
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 5)
      .map(order => ({
        id: order.id,
        customerName: `${order.customerInfo.firstName} ${order.customerInfo.lastName}`,
        total: order.total,
        status: order.status,
        createdAt: order.createdAt
      }));

    // Low stock products
    const lowStockProducts = products
      .filter(product => product.active && product.stock <= 10)
      .sort((a, b) => a.stock - b.stock)
      .slice(0, 5)
      .map(product => ({
        id: product.id,
        name: product.name,
        stock: product.stock,
        image: product.images[0]
      }));

    res.json({
      success: true,
      data: {
        overview: {
          totalUsers,
          totalProducts,
          activeProducts,
          totalCategories,
          totalOrders,
          totalRevenue: Math.round(totalRevenue * 100) / 100
        },
        ordersByStatus,
        monthlyRevenue,
        topProducts,
        recentOrders,
        lowStockProducts
      }
    });
  } catch (error) {
    console.error('Get dashboard error:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor'
    });
  }
});

// @route   GET /api/admin/stats
// @desc    Get detailed statistics
// @access  Private (Admin only)
router.get('/stats', authenticateToken, requireAdmin, (req, res) => {
  try {
    const { period = '30d' } = req.query;

    // Calculate date range based on period
    const now = new Date();
    let startDate;
    
    switch (period) {
      case '7d':
        startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        break;
      case '30d':
        startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        break;
      case '90d':
        startDate = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);
        break;
      case '1y':
        startDate = new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000);
        break;
      default:
        startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    }

    // Filter orders by date range
    const periodOrders = orders.filter(order => 
      new Date(order.createdAt) >= startDate
    );

    // Calculate statistics
    const stats = {
      period,
      totalOrders: periodOrders.length,
      totalRevenue: periodOrders
        .filter(order => order.status !== 'cancelled')
        .reduce((sum, order) => sum + order.total, 0),
      averageOrderValue: periodOrders.length > 0 
        ? periodOrders.reduce((sum, order) => sum + order.total, 0) / periodOrders.length 
        : 0,
      conversionRate: 0.035, // Mock conversion rate
      newCustomers: users.filter(user => 
        new Date(user.createdAt) >= startDate && user.role === 'customer'
      ).length,
      returningCustomers: 0, // Mock data
      topCategories: categories.map(category => {
        const categoryProducts = products.filter(p => p.categoryId === category.id);
        const categorySales = periodOrders.reduce((sum, order) => {
          return sum + order.items
            .filter(item => categoryProducts.some(p => p.id === item.productId))
            .reduce((itemSum, item) => itemSum + (item.price * item.quantity), 0);
        }, 0);
        
        return {
          category: category.name,
          revenue: categorySales,
          orders: periodOrders.filter(order => 
            order.items.some(item => categoryProducts.some(p => p.id === item.productId))
          ).length
        };
      }).sort((a, b) => b.revenue - a.revenue).slice(0, 5)
    };

    res.json({
      success: true,
      data: stats
    });
  } catch (error) {
    console.error('Get stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor'
    });
  }
});

module.exports = router;