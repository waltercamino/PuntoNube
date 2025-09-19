const express = require('express');
const { categories, products, generateId } = require('../data/mockData');
const { authenticateToken, requireAdmin, optionalAuth } = require('../middleware/auth');
const { validateCategory, validateId } = require('../middleware/validation');

const router = express.Router();

// @route   GET /api/categories
// @desc    Get all categories
// @access  Public
router.get('/', optionalAuth, (req, res) => {
  try {
    let filteredCategories = [...categories];

    // Filter by active status (hide inactive categories for non-admin users)
    if (!req.user || req.user.role !== 'admin') {
      filteredCategories = filteredCategories.filter(category => category.active);
    }

    // Add product count to each category
    const categoriesWithCount = filteredCategories.map(category => {
      const productCount = products.filter(product => 
        product.categoryId === category.id && product.active
      ).length;

      return {
        ...category,
        productCount
      };
    });

    res.json({
      success: true,
      data: {
        categories: categoriesWithCount
      }
    });
  } catch (error) {
    console.error('Get categories error:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor'
    });
  }
});

// @route   GET /api/categories/:id
// @desc    Get single category
// @access  Public
router.get('/:id', validateId, optionalAuth, (req, res) => {
  try {
    const { id } = req.params;

    // Find category
    const category = categories.find(c => c.id === id);
    if (!category) {
      return res.status(404).json({
        success: false,
        message: 'Categoría no encontrada'
      });
    }

    // Check if category is active (hide inactive categories for non-admin users)
    if (!category.active && (!req.user || req.user.role !== 'admin')) {
      return res.status(404).json({
        success: false,
        message: 'Categoría no encontrada'
      });
    }

    // Add product count
    const productCount = products.filter(product => 
      product.categoryId === category.id && product.active
    ).length;

    const categoryWithCount = {
      ...category,
      productCount
    };

    res.json({
      success: true,
      data: {
        category: categoryWithCount
      }
    });
  } catch (error) {
    console.error('Get category error:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor'
    });
  }
});

// @route   GET /api/categories/:id/products
// @desc    Get products by category
// @access  Public
router.get('/:id/products', validateId, optionalAuth, (req, res) => {
  try {
    const { id } = req.params;
    const { page = 1, limit = 12 } = req.query;

    // Find category
    const category = categories.find(c => c.id === id);
    if (!category) {
      return res.status(404).json({
        success: false,
        message: 'Categoría no encontrada'
      });
    }

    // Check if category is active
    if (!category.active && (!req.user || req.user.role !== 'admin')) {
      return res.status(404).json({
        success: false,
        message: 'Categoría no encontrada'
      });
    }

    // Get products in this category
    let categoryProducts = products.filter(product => product.categoryId === id);

    // Filter by active status for non-admin users
    if (!req.user || req.user.role !== 'admin') {
      categoryProducts = categoryProducts.filter(product => product.active);
    }

    // Pagination
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + parseInt(limit);
    const paginatedProducts = categoryProducts.slice(startIndex, endIndex);

    res.json({
      success: true,
      data: {
        category: {
          id: category.id,
          name: category.name,
          slug: category.slug
        },
        products: paginatedProducts,
        pagination: {
          currentPage: parseInt(page),
          totalPages: Math.ceil(categoryProducts.length / limit),
          totalProducts: categoryProducts.length,
          hasNextPage: endIndex < categoryProducts.length,
          hasPrevPage: page > 1
        }
      }
    });
  } catch (error) {
    console.error('Get category products error:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor'
    });
  }
});

// @route   POST /api/categories
// @desc    Create new category
// @access  Private (Admin only)
router.post('/', authenticateToken, requireAdmin, validateCategory, (req, res) => {
  try {
    const { name, slug, description, image } = req.body;

    // Check if slug already exists
    const existingCategory = categories.find(cat => cat.slug === slug);
    if (existingCategory) {
      return res.status(400).json({
        success: false,
        message: 'Ya existe una categoría con este slug'
      });
    }

    // Create new category
    const newCategory = {
      id: generateId(),
      name,
      slug,
      description: description || '',
      image: image || '',
      active: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    // Save category to mock data
    categories.push(newCategory);

    res.status(201).json({
      success: true,
      message: 'Categoría creada exitosamente',
      data: {
        category: {
          ...newCategory,
          productCount: 0
        }
      }
    });
  } catch (error) {
    console.error('Create category error:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor'
    });
  }
});

// @route   PUT /api/categories/:id
// @desc    Update category
// @access  Private (Admin only)
router.put('/:id', authenticateToken, requireAdmin, validateId, validateCategory, (req, res) => {
  try {
    const { id } = req.params;
    const { name, slug, description, image, active } = req.body;

    // Find category
    const categoryIndex = categories.findIndex(c => c.id === id);
    if (categoryIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Categoría no encontrada'
      });
    }

    // Check if slug already exists (excluding current category)
    const existingCategory = categories.find(cat => cat.slug === slug && cat.id !== id);
    if (existingCategory) {
      return res.status(400).json({
        success: false,
        message: 'Ya existe una categoría con este slug'
      });
    }

    // Update category
    categories[categoryIndex] = {
      ...categories[categoryIndex],
      name,
      slug,
      description: description || categories[categoryIndex].description,
      image: image || categories[categoryIndex].image,
      active: active !== undefined ? active : categories[categoryIndex].active,
      updatedAt: new Date().toISOString()
    };

    // Add product count
    const productCount = products.filter(product => 
      product.categoryId === id && product.active
    ).length;

    res.json({
      success: true,
      message: 'Categoría actualizada exitosamente',
      data: {
        category: {
          ...categories[categoryIndex],
          productCount
        }
      }
    });
  } catch (error) {
    console.error('Update category error:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor'
    });
  }
});

// @route   DELETE /api/categories/:id
// @desc    Delete category
// @access  Private (Admin only)
router.delete('/:id', authenticateToken, requireAdmin, validateId, (req, res) => {
  try {
    const { id } = req.params;

    // Find category
    const categoryIndex = categories.findIndex(c => c.id === id);
    if (categoryIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Categoría no encontrada'
      });
    }

    // Check if category has products
    const categoryProducts = products.filter(product => product.categoryId === id);
    if (categoryProducts.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'No se puede eliminar una categoría que tiene productos asociados'
      });
    }

    // Remove category from mock data
    categories.splice(categoryIndex, 1);

    res.json({
      success: true,
      message: 'Categoría eliminada exitosamente'
    });
  } catch (error) {
    console.error('Delete category error:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor'
    });
  }
});

module.exports = router;