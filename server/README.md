# E-commerce Backend API

Backend API para el e-commerce desarrollado con Node.js, Express y datos mock.

## 🚀 Características

- **Autenticación JWT**: Login, registro y protección de rutas
- **Control de roles**: Admin y cliente con permisos diferenciados
- **CRUD completo**: Productos, categorías, usuarios y pedidos
- **Carrito de compras**: Gestión completa del carrito con persistencia
- **Sistema de pedidos**: Creación, seguimiento y gestión de estados
- **Panel administrativo**: Métricas, estadísticas y gestión
- **Validaciones**: Validación de datos con express-validator
- **Manejo de errores**: Sistema centralizado de manejo de errores
- **Seguridad**: Helmet, CORS y validaciones de entrada

## 📁 Estructura del Proyecto

```
server/
├── data/
│   └── mockData.js          # Datos mock (usuarios, productos, etc.)
├── middleware/
│   ├── auth.js              # Autenticación y autorización
│   ├── errorHandler.js      # Manejo global de errores
│   ├── notFound.js          # Middleware 404
│   └── validation.js        # Validaciones de entrada
├── routes/
│   ├── auth.js              # Rutas de autenticación
│   ├── users.js             # Rutas de usuarios
│   ├── products.js          # Rutas de productos
│   ├── categories.js        # Rutas de categorías
│   ├── cart.js              # Rutas del carrito
│   ├── orders.js            # Rutas de pedidos
│   └── admin.js             # Rutas administrativas
├── index.js                 # Servidor principal
└── README.md               # Documentación
```

## 🛠️ Instalación y Configuración

1. **Instalar dependencias** (ya instaladas):
   ```bash
   npm install
   ```

2. **Configurar variables de entorno**:
   El archivo `.env` ya está configurado con valores por defecto.

3. **Ejecutar el servidor**:
   ```bash
   # Desarrollo con auto-reload
   npm run server:dev
   
   # Producción
   npm run server
   ```

## 📚 API Endpoints

### Autenticación
- `POST /api/auth/register` - Registrar usuario
- `POST /api/auth/login` - Iniciar sesión
- `GET /api/auth/me` - Obtener usuario actual
- `POST /api/auth/logout` - Cerrar sesión

### Usuarios
- `GET /api/users` - Listar usuarios (Admin)
- `GET /api/users/:id` - Obtener usuario
- `PUT /api/users/:id` - Actualizar perfil
- `PUT /api/users/:id/password` - Cambiar contraseña
- `PUT /api/users/:id/role` - Cambiar rol (Admin)
- `DELETE /api/users/:id` - Eliminar usuario (Admin)

### Productos
- `GET /api/products` - Listar productos (con filtros)
- `GET /api/products/:id` - Obtener producto
- `POST /api/products` - Crear producto (Admin)
- `PUT /api/products/:id` - Actualizar producto (Admin)
- `DELETE /api/products/:id` - Eliminar producto (Admin)

### Categorías
- `GET /api/categories` - Listar categorías
- `GET /api/categories/:id` - Obtener categoría
- `GET /api/categories/:id/products` - Productos por categoría
- `POST /api/categories` - Crear categoría (Admin)
- `PUT /api/categories/:id` - Actualizar categoría (Admin)
- `DELETE /api/categories/:id` - Eliminar categoría (Admin)

### Carrito
- `GET /api/cart` - Obtener carrito del usuario
- `POST /api/cart/items` - Agregar producto al carrito
- `PUT /api/cart/items/:productId` - Actualizar cantidad
- `DELETE /api/cart/items/:productId` - Eliminar producto
- `DELETE /api/cart` - Vaciar carrito

### Pedidos
- `GET /api/orders` - Listar pedidos del usuario
- `GET /api/orders/:id` - Obtener pedido específico
- `POST /api/orders` - Crear nuevo pedido
- `PUT /api/orders/:id/status` - Actualizar estado (Admin)
- `GET /api/orders/:id/tracking` - Información de seguimiento

### Administración
- `GET /api/admin/dashboard` - Métricas del dashboard
- `GET /api/admin/stats` - Estadísticas detalladas

## 🔐 Autenticación

El API utiliza JWT (JSON Web Tokens) para la autenticación. Incluye el token en el header:

```
Authorization: Bearer <token>
```

### Usuarios por defecto:
- **Admin**: `admin@tiendahub.com` / `password`
- **Cliente**: `cliente@example.com` / `password`

## 📊 Datos Mock

Los datos se almacenan en memoria usando arrays JavaScript. Incluye:

- **Usuarios**: Admin y clientes con roles diferenciados
- **Productos**: 6 productos de ejemplo con imágenes, precios y stock
- **Categorías**: 5 categorías principales
- **Pedidos**: Pedidos de ejemplo con diferentes estados
- **Carritos**: Almacenamiento temporal de carritos por usuario

## 🔄 Migración a Base de Datos

El código está preparado para migrar fácilmente a una base de datos real:

1. **Comentarios TODO**: Indican dónde reemplazar código mock
2. **Estructura modular**: Fácil separación en modelos/controladores
3. **Validaciones**: Ya implementadas y listas para usar
4. **Relaciones**: Estructura de datos preparada para relaciones DB

### Ejemplo de migración:
```javascript
// Actual (Mock)
const user = users.find(u => u.id === userId);

// Futuro (Database)
const user = await User.findById(userId);
```

## 🛡️ Seguridad

- **Helmet**: Headers de seguridad HTTP
- **CORS**: Configurado para el frontend
- **Validación**: Sanitización de entrada con express-validator
- **Hashing**: Contraseñas hasheadas con bcrypt
- **JWT**: Tokens seguros con expiración

## 📝 Validaciones

Validaciones implementadas para:
- Registro y login de usuarios
- Creación y actualización de productos
- Gestión de categorías
- Procesamiento de pedidos
- Operaciones del carrito

## 🚀 Próximos Pasos

1. **Base de datos**: Integrar MongoDB o PostgreSQL
2. **Upload de archivos**: Cloudinary o AWS S3
3. **Email**: Nodemailer para confirmaciones
4. **Pagos**: Stripe o MercadoPago
5. **Cache**: Redis para sesiones y cache
6. **Tests**: Jest para testing automatizado
7. **Documentación**: Swagger/OpenAPI

## 🤝 Integración con Frontend

El backend está diseñado para integrarse perfectamente con el frontend Next.js existente. Solo necesitas:

1. Actualizar las URLs de API en el frontend
2. Implementar el manejo de tokens JWT
3. Conectar los formularios con los endpoints

¡El backend está listo para soportar todas las funcionalidades del frontend!