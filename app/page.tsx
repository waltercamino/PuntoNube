import HeroCarousel from '@/components/home/hero-carousel';
import ProductCarousel from '@/components/product/product-carousel';
import { products } from '@/lib/mock-data';

export default function Home() {
  const featuredProducts = products.filter(p => p.featured);
  const favoriteProducts = products.filter(p => p.favorite);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="mb-12">
        <HeroCarousel />
      </section>

      {/* Featured Products */}
      <section className="mb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ProductCarousel 
            products={featuredProducts}
            title="Productos Destacados"
            autoPlay={true}
          />
        </div>
      </section>

      {/* Favorite Products */}
      <section className="mb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ProductCarousel 
            products={favoriteProducts}
            title="Productos Favoritos"
          />
        </div>
      </section>

      {/* Categories Preview */}
      <section className="mb-12 bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Explora Nuestras Categorías
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {[
              { name: 'Electrónicos', icon: '📱', color: 'bg-blue-100' },
              { name: 'Ropa', icon: '👕', color: 'bg-purple-100' },
              { name: 'Hogar', icon: '🏠', color: 'bg-green-100' },
              { name: 'Deportes', icon: '⚽', color: 'bg-orange-100' },
              { name: 'Libros', icon: '📚', color: 'bg-red-100' }
            ].map((category) => (
              <div
                key={category.name}
                className={`${category.color} rounded-lg p-6 text-center cursor-pointer hover:shadow-md transition-shadow`}
              >
                <div className="text-3xl mb-3">{category.icon}</div>
                <h3 className="font-semibold text-gray-900">{category.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}