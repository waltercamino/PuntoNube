const { body, param, query, validationResult } = require('express-validator');

// Handle validation errors
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Errores de validación',
      errors: errors.array()
    });
  }
  next();
};

// User validation rules
const validateRegister = [
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Email válido es requerido'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('La contraseña debe tener al menos 6 caracteres'),
  body('firstName')
    .trim()
    .isLength({ min: 2 })
    .withMessage('El nombre debe tener al menos 2 caracteres'),
  body('lastName')
    .trim()
    .isLength({ min: 2 })
    .withMessage('El apellido debe tener al menos 2 caracteres'),
  body('phone')
    .optional()
    .isMobilePhone()
    .withMessage('Número de teléfono válido'),
  handleValidationErrors
];

const validateLogin = [
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Email válido es requerido'),
  body('password')
    .notEmpty()
    .withMessage('Contraseña es requerida'),
  handleValidationErrors
];

// Product validation rules
const validateProduct = [
  body('name')
    .trim()
    .isLength({ min: 2 })
    .withMessage('El nombre del producto debe tener al menos 2 caracteres'),
  body('description')
    .trim()
    .isLength({ min: 10 })
    .withMessage('La descripción debe tener al menos 10 caracteres'),
  body('price')
    .isFloat({ min: 0 })
    .withMessage('El precio debe ser un número positivo'),
  body('categoryId')
    .notEmpty()
    .withMessage('La categoría es requerida'),
  body('stock')
    .isInt({ min: 0 })
    .withMessage('El stock debe ser un número entero positivo'),
  body('images')
    .isArray({ min: 1 })
    .withMessage('Al menos una imagen es requerida'),
  handleValidationErrors
];

// Category validation rules
const validateCategory = [
  body('name')
    .trim()
    .isLength({ min: 2 })
    .withMessage('El nombre de la categoría debe tener al menos 2 caracteres'),
  body('slug')
    .trim()
    .isLength({ min: 2 })
    .matches(/^[a-z0-9-]+$/)
    .withMessage('El slug debe contener solo letras minúsculas, números y guiones'),
  body('description')
    .optional()
    .trim()
    .isLength({ min: 10 })
    .withMessage('La descripción debe tener al menos 10 caracteres'),
  handleValidationErrors
];

// Order validation rules
const validateOrder = [
  body('customerInfo.firstName')
    .trim()
    .isLength({ min: 2 })
    .withMessage('El nombre es requerido'),
  body('customerInfo.lastName')
    .trim()
    .isLength({ min: 2 })
    .withMessage('El apellido es requerido'),
  body('customerInfo.email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Email válido es requerido'),
  body('customerInfo.phone')
    .isMobilePhone()
    .withMessage('Teléfono válido es requerido'),
  body('customerInfo.address')
    .trim()
    .isLength({ min: 10 })
    .withMessage('Dirección completa es requerida'),
  body('customerInfo.city')
    .trim()
    .isLength({ min: 2 })
    .withMessage('Ciudad es requerida'),
  body('customerInfo.zipCode')
    .trim()
    .isLength({ min: 4 })
    .withMessage('Código postal es requerido'),
  body('paymentMethod')
    .isIn(['credit-card', 'bank-transfer', 'cash-on-delivery'])
    .withMessage('Método de pago inválido'),
  body('items')
    .isArray({ min: 1 })
    .withMessage('Al menos un producto es requerido'),
  handleValidationErrors
];

// Cart validation rules
const validateCartItem = [
  body('productId')
    .notEmpty()
    .withMessage('ID del producto es requerido'),
  body('quantity')
    .isInt({ min: 1 })
    .withMessage('La cantidad debe ser un número entero positivo'),
  handleValidationErrors
];

// Parameter validation
const validateId = [
  param('id')
    .notEmpty()
    .withMessage('ID es requerido'),
  handleValidationErrors
];

// Query validation
const validatePagination = [
  query('page')
    .optional()
    .isInt({ min: 1 })
    .withMessage('La página debe ser un número entero positivo'),
  query('limit')
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage('El límite debe ser un número entre 1 y 100'),
  handleValidationErrors
];

module.exports = {
  validateRegister,
  validateLogin,
  validateProduct,
  validateCategory,
  validateOrder,
  validateCartItem,
  validateId,
  validatePagination,
  handleValidationErrors
};