'use client';

import { useState } from 'react';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Star, ShoppingCart, Heart, Minus, Plus, Truck, Shield, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { products } from '@/lib/mock-data';
import { useCart } from '@/hooks/use-cart.tsx';
import { useLanguage } from '@/hooks/use-language.tsx';

interface ProductPageProps {
  params: {
    id: string;
  };
}

export default function ProductPage({ params }: ProductPageProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const { addItem } = useCart();
  const { t } = useLanguage();

  const product = products.find(p => p.id === params.id);

  if (!product) {
    notFound();
  }

  const handleAddToCart = () => {
    addItem(product, quantity);
  };

  const discountPercentage = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Product Images */}
        <div className="space-y-4">
          {/* Main Image */}
          <div className="aspect-square relative overflow-hidden rounded-lg bg-gray-100">
            <Image
              src={product.images[currentImageIndex]}
              alt={product.name}
              fill
              className="object-cover"
            />
            
            {/* Badges */}
            <div className="absolute top-4 left-4 space-y-2">
              {product.featured && (
                <Badge className="bg-blue-600 text-white">Destacado</Badge>
              )}
              {discountPercentage > 0 && (
                <Badge variant="destructive">-{discountPercentage}%</Badge>
              )}
            </div>

            {/* Favorite Button */}
            <Button
              variant="ghost"
              size="sm"
              className="absolute top-4 right-4 h-10 w-10 p-0 bg-white/80 hover:bg-white"
              onClick={() => setIsFavorite(!isFavorite)}
            >
              <Heart 
                className={`h-5 w-5 ${
                  isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-600'
                }`} 
              />
            </Button>
          </div>

          {/* Thumbnail Images */}
          <div className="flex space-x-2">
            {product.images.map((image, index) => (
              <button
                key={index}
                className={`relative aspect-square w-20 h-20 rounded-lg overflow-hidden border-2 ${
                  index === currentImageIndex ? 'border-blue-600' : 'border-gray-200'
                }`}
                onClick={() => setCurrentImageIndex(index)}
              >
                <Image
                  src={image}
                  alt={`${product.name} ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {product.name}
            </h1>
            
            {/* Rating */}
            {product.rating && (
              <div className="flex items-center mb-4">
                <div className="flex items-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`h-5 w-5 ${
                        star <= product.rating! 
                          ? 'text-yellow-400 fill-current' 
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="ml-2 text-gray-600">
                  {product.rating} ({product.reviews} {t('product.reviews')})
                </span>
              </div>
            )}
          </div>

          {/* Price */}
          <div className="space-y-2">
            <div className="flex items-center space-x-4">
              <span className="text-4xl font-bold text-gray-900">
                ${product.price.toFixed(2)}
              </span>
              {product.originalPrice && (
                <span className="text-xl text-gray-500 line-through">
                  ${product.originalPrice.toFixed(2)}
                </span>
              )}
            </div>
            
            {/* Stock */}
            <div>
              {product.stock > 0 ? (
                <span className="text-green-600 font-medium">
                  ✓ En stock ({product.stock} disponibles)
                </span>
              ) : (
                <span className="text-red-600 font-medium">
                  ✗ {t('product.outOfStock')}
                </span>
              )}
            </div>
          </div>

          <Separator />

          {/* Quantity and Add to Cart */}
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <span className="font-medium">Cantidad:</span>
              <div className="flex items-center border rounded-md">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="px-4 py-2 min-w-[3rem] text-center">{quantity}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  disabled={quantity >= product.stock}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="flex space-x-4">
              <Button 
                size="lg" 
                className="flex-1" 
                onClick={handleAddToCart}
                disabled={product.stock === 0}
              >
                <ShoppingCart className="h-5 w-5 mr-2" />
                {t('product.addToCart')}
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="flex-1"
                disabled={product.stock === 0}
              >
                {t('product.buyNow')}
              </Button>
            </div>
          </div>

          <Separator />

          {/* Features */}
          <div className="space-y-3">
            <div className="flex items-center text-gray-600">
              <Truck className="h-5 w-5 mr-3" />
              <span>Envío gratis en pedidos superiores a $100</span>
            </div>
            <div className="flex items-center text-gray-600">
              <Shield className="h-5 w-5 mr-3" />
              <span>Garantía de 1 año</span>
            </div>
            <div className="flex items-center text-gray-600">
              <RotateCcw className="h-5 w-5 mr-3" />
              <span>Devoluciones en 30 días</span>
            </div>
          </div>
        </div>
      </div>

      {/* Product Details Tabs */}
      <div className="mt-12">
        <Tabs defaultValue="description" className="w-full">
          <TabsList>
            <TabsTrigger value="description">{t('product.description')}</TabsTrigger>
            <TabsTrigger value="specifications">Especificaciones</TabsTrigger>
            <TabsTrigger value="reviews">{t('product.reviews')}</TabsTrigger>
          </TabsList>
          
          <TabsContent value="description" className="mt-6">
            <div className="prose max-w-none">
              <p className="text-gray-600 leading-relaxed">
                {product.description}
              </p>
            </div>
          </TabsContent>
          
          <TabsContent value="specifications" className="mt-6">
            <div className="space-y-4">
              <h3 className="font-semibold">Especificaciones Técnicas</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <span className="font-medium">Categoría:</span>
                  <span className="ml-2 text-gray-600">{product.category}</span>
                </div>
                <div>
                  <span className="font-medium">SKU:</span>
                  <span className="ml-2 text-gray-600">{product.id}</span>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="reviews" className="mt-6">
            <div className="space-y-6">
              <h3 className="font-semibold">Reseñas de Clientes</h3>
              <p className="text-gray-600">
                Las reseñas de clientes estarán disponibles próximamente.
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}