const express = require('express');
const { products, categories, generateId } = require('../data/mockData');
const { authenticateToken, requireAdmin, optionalAuth } = require('../middleware/auth');
const { validateProduct, validateId, validatePagination } = require('../middleware/validation');

const router = express.Router();

// @route   GET /api/products
// @desc    Get all products with filtering and pagination
// @access  Public
router.get('/', validatePagination, optionalAuth, (req, res) => {
  try {
    const {
      page = 1,
      limit = 12,
      category,
      search,
      featured,
      minPrice,
      maxPrice,
      sortBy = 'createdAt',
      sortOrder = 'desc'
    } = req.query;

    let filteredProducts = [...products];

    // Filter by active status (hide inactive products for non-admin users)
    if (!req.user || req.user.role !== 'admin') {
      filteredProducts = filteredProducts.filter(product => product.active);
    }

    // Filter by category
    if (category) {
      filteredProducts = filteredProducts.filter(product => 
        product.categoryId === category
      );
    }

    // Filter by search term
    if (search) {
      const searchTerm = search.toLowerCase();
      filteredProducts = filteredProducts.filter(product =>
        product.name.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm) ||
        (product.tags && product.tags.some(tag => tag.toLowerCase().includes(searchTerm)))
      );
    }

    // Filter by featured
    if (featured === 'true') {
      filteredProducts = filteredProducts.filter(product => product.featured);
    }

    // Filter by price range
    if (minPrice) {
      filteredProducts = filteredProducts.filter(product => product.price >= parseFloat(minPrice));
    }
    if (maxPrice) {
      filteredProducts = filteredProducts.filter(product => product.price <= parseFloat(maxPrice));
    }

    // Sort products
    filteredProducts.sort((a, b) => {
      let aValue = a[sortBy];
      let bValue = b[sortBy];

      // Handle special sorting cases
      if (sortBy === 'price') {
        aValue = parseFloat(aValue);
        bValue = parseFloat(bValue);
      } else if (sortBy === 'name') {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      } else if (sortBy === 'rating') {
        aValue = aValue || 0;
        bValue = bValue || 0;
      }

      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    // Pagination
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + parseInt(limit);
    const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

    // Add category information to products
    const productsWithCategory = paginatedProducts.map(product => {
      const category = categories.find(cat => cat.id === product.categoryId);
      return {
        ...product,
        category: category ? { id: category.id, name: category.name, slug: category.slug } : null
      };
    });

    res.json({
      success: true,
      data: {
        products: productsWithCategory,
        pagination: {
          currentPage: parseInt(page),
          totalPages: Math.ceil(filteredProducts.length / limit),
          totalProducts: filteredProducts.length,
          hasNextPage: endIndex < filteredProducts.length,
          hasPrevPage: page > 1
        }
      }
    });
  } catch (error) {
    console.error('Get products error:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor'
    });
  }
});

// @route   GET /api/products/:id
// @desc    Get single product
// @access  Public
router.get('/:id', validateId, optionalAuth, (req, res) => {
  try {
    const { id } = req.params;

    // Find product
    // TODO: Replace with database query
    const product = products.find(p => p.id === id);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Producto no encontrado'
      });
    }

    // Check if product is active (hide inactive products for non-admin users)
    if (!product.active && (!req.user || req.user.role !== 'admin')) {
      return res.status(404).json({
        success: false,
        message: 'Producto no encontrado'
      });
    }

    // Add category information
    const category = categories.find(cat => cat.id === product.categoryId);
    const productWithCategory = {
      ...product,
      category: category ? { id: category.id, name: category.name, slug: category.slug } : null
    };

    res.json({
      success: true,
      data: {
        product: productWithCategory
      }
    });
  } catch (error) {
    console.error('Get product error:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor'
    });
  }
});

// @route   POST /api/products
// @desc    Create new product
// @access  Private (Admin only)
router.post('/', authenticateToken, requireAdmin, validateProduct, (req, res) => {
  try {
    const {
      name,
      description,
      price,
      originalPrice,
      images,
      categoryId,
      stock,
      featured = false,
      tags = [],
      variants = []
    } = req.body;

    // Check if category exists
    const category = categories.find(cat => cat.id === categoryId);
    if (!category) {
      return res.status(400).json({
        success: false,
        message: 'Categoría no encontrada'
      });
    }

    // Create new product
    const newProduct = {
      id: generateId(),
      name,
      description,
      price: parseFloat(price),
      originalPrice: originalPrice ? parseFloat(originalPrice) : null,
      images,
      categoryId,
      stock: parseInt(stock),
      featured,
      active: true,
      rating: 0,
      reviews: 0,
      tags,
      variants,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    // Save product to mock data
    // TODO: Replace with database save
    products.push(newProduct);

    // Add category information to response
    const productWithCategory = {
      ...newProduct,
      category: { id: category.id, name: category.name, slug: category.slug }
    };

    res.status(201).json({
      success: true,
      message: 'Producto creado exitosamente',
      data: {
        product: productWithCategory
      }
    });
  } catch (error) {
    console.error('Create product error:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor'
    });
  }
});

// @route   PUT /api/products/:id
// @desc    Update product
// @access  Private (Admin only)
router.put('/:id', authenticateToken, requireAdmin, validateId, validateProduct, (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      description,
      price,
      originalPrice,
      images,
      categoryId,
      stock,
      featured,
      active,
      tags,
      variants
    } = req.body;

    // Find product
    const productIndex = products.findIndex(p => p.id === id);
    if (productIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Producto no encontrado'
      });
    }

    // Check if category exists
    const category = categories.find(cat => cat.id === categoryId);
    if (!category) {
      return res.status(400).json({
        success: false,
        message: 'Categoría no encontrada'
      });
    }

    // Update product
    products[productIndex] = {
      ...products[productIndex],
      name,
      description,
      price: parseFloat(price),
      originalPrice: originalPrice ? parseFloat(originalPrice) : null,
      images,
      categoryId,
      stock: parseInt(stock),
      featured: featured !== undefined ? featured : products[productIndex].featured,
      active: active !== undefined ? active : products[productIndex].active,
      tags: tags || products[productIndex].tags,
      variants: variants || products[productIndex].variants,
      updatedAt: new Date().toISOString()
    };

    // Add category information to response
    const productWithCategory = {
      ...products[productIndex],
      category: { id: category.id, name: category.name, slug: category.slug }
    };

    res.json({
      success: true,
      message: 'Producto actualizado exitosamente',
      data: {
        product: productWithCategory
      }
    });
  } catch (error) {
    console.error('Update product error:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor'
    });
  }
});

// @route   DELETE /api/products/:id
// @desc    Delete product
// @access  Private (Admin only)
router.delete('/:id', authenticateToken, requireAdmin, validateId, (req, res) => {
  try {
    const { id } = req.params;

    // Find product
    const productIndex = products.findIndex(p => p.id === id);
    if (productIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Producto no encontrado'
      });
    }

    // Remove product from mock data
    // TODO: In production, consider soft delete (set active: false) instead
    products.splice(productIndex, 1);

    res.json({
      success: true,
      message: 'Producto eliminado exitosamente'
    });
  } catch (error) {
    console.error('Delete product error:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor'
    });
  }
});

module.exports = router;