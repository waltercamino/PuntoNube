import Image from 'next/image';
import { Award, Users, Globe, Heart } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export default function AboutPage() {
  const values = [
    {
      icon: Heart,
      title: 'Pasión por la Calidad',
      description: 'Seleccionamos cuidadosamente cada producto para ofrecerte solo lo mejor.'
    },
    {
      icon: Users,
      title: 'Atención al Cliente',
      description: 'Tu satisfacción es nuestra prioridad. Estamos aquí para ayudarte en cada paso.'
    },
    {
      icon: Globe,
      title: 'Compromiso Ambiental',
      description: 'Trabajamos con proveedores que comparten nuestro compromiso con la sostenibilidad.'
    },
    {
      icon: Award,
      title: 'Innovación Constante',
      description: 'Siempre buscamos nuevas formas de mejorar tu experiencia de compra.'
    }
  ];

  const team = [
    {
      name: 'Ana García',
      role: 'CEO & Fundadora',
      image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&dpr=1',
      description: 'Con más de 10 años de experiencia en e-commerce, Ana lidera nuestra visión de democratizar el comercio online.'
    },
    {
      name: 'Carlos Rodríguez',
      role: 'Director de Tecnología',
      image: 'https://images.pexels.com/photos/697509/pexels-photo-697509.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&dpr=1',
      description: 'Carlos se encarga de mantener nuestra plataforma a la vanguardia de la tecnología.'
    },
    {
      name: 'María López',
      role: 'Directora de Marketing',
      image: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&dpr=1',
      description: 'María conecta nuestros productos con los clientes que los necesitan.'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
          Acerca de TiendaHub
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Somos una empresa comprometida con ofrecer la mejor experiencia de compra online, 
          conectando productos excepcionales con clientes que valoran la calidad y el servicio.
        </p>
      </div>

      {/* Story Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Nuestra Historia</h2>
          <div className="space-y-4 text-gray-600">
            <p>
              TiendaHub nació en 2020 con una simple idea: hacer que las compras online 
              sean más accesibles, confiables y satisfactorias para todos.
            </p>
            <p>
              Lo que comenzó como un pequeño proyecto entre amigos, se ha convertido en 
              una plataforma que conecta a miles de clientes con productos de calidad 
              de proveedores confiables.
            </p>
            <p>
              Hoy, seguimos creciendo con el mismo compromiso: ofrecerte la mejor 
              experiencia de compra, con productos cuidadosamente seleccionados y 
              un servicio al cliente excepcional.
            </p>
          </div>
        </div>
        <div className="relative aspect-square lg:aspect-auto lg:h-96 rounded-lg overflow-hidden">
          <Image
            src="https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1"
            alt="Nuestro equipo trabajando"
            fill
            className="object-cover"
          />
        </div>
      </div>

      {/* Values Section */}
      <div className="mb-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Nuestros Valores</h2>
          <p className="text-xl text-gray-600">
            Los principios que guían cada decisión que tomamos
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => {
            const Icon = value.icon;
            return (
              <Card key={index} className="text-center">
                <CardContent className="p-6">
                  <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {value.title}
                  </h3>
                  <p className="text-gray-600">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Team Section */}
      <div className="mb-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Nuestro Equipo</h2>
          <p className="text-xl text-gray-600">
            Conoce a las personas que hacen posible TiendaHub
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {team.map((member, index) => (
            <Card key={index} className="text-center">
              <CardContent className="p-6">
                <div className="relative w-32 h-32 mx-auto mb-4">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover rounded-full"
                  />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-1">
                  {member.name}
                </h3>
                <p className="text-blue-600 font-medium mb-3">
                  {member.role}
                </p>
                <p className="text-gray-600 text-sm">
                  {member.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-gray-50 rounded-2xl p-8 md:p-12 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">TiendaHub en Números</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="text-4xl font-bold text-blue-600 mb-2">10K+</div>
            <div className="text-gray-600">Clientes Satisfechos</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-blue-600 mb-2">500+</div>
            <div className="text-gray-600">Productos</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-blue-600 mb-2">50+</div>
            <div className="text-gray-600">Marcas Partner</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-blue-600 mb-2">99%</div>
            <div className="text-gray-600">Satisfacción</div>
          </div>
        </div>
      </div>
    </div>
  );
}