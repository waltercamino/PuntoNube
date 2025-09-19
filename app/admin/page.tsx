import Link from 'next/link';
import { 
  Package, 
  Users, 
  ShoppingCart, 
  DollarSign,
  TrendingUp,
  Eye
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { dashboardMetrics } from '@/lib/mock-data';

export default function AdminDashboard() {
  const { totalSales, totalOrders, totalProducts, totalCustomers } = dashboardMetrics;

  const statsCards = [
    {
      title: 'Ventas Totales',
      value: `$${totalSales.toLocaleString()}`,
      icon: DollarSign,
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      title: 'Pedidos',
      value: totalOrders.toString(),
      icon: ShoppingCart,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      title: 'Productos',
      value: totalProducts.toString(),
      icon: Package,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    },
    {
      title: 'Clientes',
      value: totalCustomers.toString(),
      icon: Users,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100'
    }
  ];

  const quickActions = [
    {
      title: 'Gestionar Productos',
      description: 'Agregar, editar o eliminar productos',
      href: '/admin/products',
      icon: Package,
      color: 'bg-blue-600 hover:bg-blue-700'
    },
    {
      title: 'Ver Pedidos',
      description: 'Administrar pedidos y estados',
      href: '/admin/orders',
      icon: ShoppingCart,
      color: 'bg-green-600 hover:bg-green-700'
    },
    {
      title: 'Categorías',
      description: 'Organizar productos por categorías',
      href: '/admin/categories',
      icon: Eye,
      color: 'bg-purple-600 hover:bg-purple-700'
    },
    {
      title: 'Clientes',
      description: 'Gestionar información de clientes',
      href: '/admin/customers',
      icon: Users,
      color: 'bg-orange-600 hover:bg-orange-700'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Panel de Administración</h1>
        <p className="text-gray-600 mt-2">
          Gestiona tu tienda desde este panel de control
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statsCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <div className={`${stat.bgColor} p-2 rounded-md`}>
                  <Icon className={`h-4 w-4 ${stat.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <TrendingUp className="h-3 w-3 mr-1 text-green-600" />
                  <span>+8.2% desde el mes pasado</span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Acciones Rápidas</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <Card key={action.title} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className={`${action.color} p-3 rounded-lg`}>
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-1">
                        {action.title}
                      </h3>
                      <p className="text-gray-600 mb-3">
                        {action.description}
                      </p>
                      <Link href={action.href}>
                        <Button variant="outline" size="sm">
                          Ir al módulo
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Recent Activity */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Actividad Reciente</h2>
        <Card>
          <CardContent className="p-6">
            <div className="space-y-4">
              {[
                { action: 'Nuevo pedido recibido', details: 'Pedido #ORD-003 por $299.99', time: 'Hace 5 minutos' },
                { action: 'Producto actualizado', details: 'iPhone 15 Pro Max - Stock actualizado', time: 'Hace 1 hora' },
                { action: 'Cliente registrado', details: 'Nueva cuenta: carlos@example.com', time: 'Hace 2 horas' },
                { action: 'Pedido enviado', details: 'Pedido #ORD-002 en camino', time: 'Hace 4 horas' }
              ].map((activity, index) => (
                <div key={index} className="flex items-center justify-between py-2 border-b last:border-b-0">
                  <div>
                    <p className="font-medium text-gray-900">{activity.action}</p>
                    <p className="text-sm text-gray-600">{activity.details}</p>
                  </div>
                  <span className="text-sm text-gray-500">{activity.time}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}