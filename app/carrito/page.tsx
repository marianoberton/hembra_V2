'use client';

import { useCart } from '../context/CartContext';
import Header from '../components/Header';
import Image from 'next/image';
import Link from 'next/link';

export default function CartPage() {
  const { state, removeFromCart, updateQuantity, clearCart, getItemPrice } = useCart();

  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS'
    }).format(price);
  };

  const getProductName = (product: unknown): string => {
    if (typeof product === 'object' && product !== null && 'name' in product) {
      const productObj = product as { name?: string | { es?: string; en?: string } };
      if (typeof productObj.name === 'string') {
        return productObj.name;
      }
      return (productObj.name as { es?: string; en?: string })?.es || 
             (productObj.name as { es?: string; en?: string })?.en || 
             'Producto sin nombre';
    }
    return 'Producto sin nombre';
  };

  const getMainImage = (product: unknown): string => {
    if (typeof product === 'object' && product !== null && 'images' in product) {
      const productObj = product as { images?: Array<{ src: string }> };
      if (productObj.images && productObj.images.length > 0) {
        return productObj.images[0].src;
      }
    }
    return '/placeholder-product.jpg';
  };

  if (state.items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="text-center py-12">
            <div className="w-24 h-24 mx-auto mb-4 bg-gray-200 rounded-full flex items-center justify-center">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 11-4 0v-6m4 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Tu carrito está vacío</h2>
            <p className="text-gray-600 mb-8">¡Agrega algunos productos para comenzar!</p>
            <Link 
              href="/"
              className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors"
            >
              Continuar comprando
            </Link>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">🛒 Carrito de Compras</h1>
          <p className="text-gray-600">
            {state.itemCount} {state.itemCount === 1 ? 'producto' : 'productos'} en tu carrito
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Lista de productos */}
          <div className="lg:col-span-2 space-y-4">
            {state.items.map((item) => (
              <div key={item.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center space-x-4">
                  {/* Imagen del producto */}
                  <div className="w-20 h-20 relative bg-gray-100 rounded-md overflow-hidden flex-shrink-0">
                    <Image
                      src={getMainImage(item.product)}
                      alt={getProductName(item.product)}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </div>

                  {/* Información del producto */}
                  <div className="flex-1 min-w-0">
                    <Link href={`/producto/${item.product.id}`}>
                      <h3 className="text-lg font-medium text-gray-900 hover:text-blue-600 transition-colors">
                        {getProductName(item.product)}
                      </h3>
                    </Link>
                    
                    <p className="text-sm text-gray-500 mt-1">
                      Precio unitario: {formatPrice(getItemPrice(item))}
                    </p>

                    {item.selectedVariant ? (
                      <p className="text-sm text-gray-500">
                        Variante: {JSON.stringify(item.selectedVariant)}
                      </p>
                    ) : null}
                  </div>

                  {/* Controles de cantidad */}
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                    >
                      -
                    </button>
                    
                    <span className="w-12 text-center font-medium">
                      {item.quantity}
                    </span>
                    
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                    >
                      +
                    </button>
                  </div>

                  {/* Precio total del item */}
                  <div className="text-right">
                    <p className="text-lg font-bold text-gray-900">
                      {formatPrice(getItemPrice(item) * item.quantity)}
                    </p>
                  </div>

                  {/* Botón eliminar */}
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-600 hover:text-red-800 p-2"
                    title="Eliminar producto"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}

            {/* Botón limpiar carrito */}
            <div className="text-center pt-4">
              <button
                onClick={clearCart}
                className="text-red-600 hover:text-red-800 text-sm underline"
              >
                Vaciar carrito
              </button>
            </div>
          </div>

          {/* Resumen del pedido */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sticky top-4">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Resumen del pedido</h2>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal ({state.itemCount} productos)</span>
                  <span className="font-medium">{formatPrice(state.total)}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Envío</span>
                  <span className="text-sm text-gray-500">Calculado en checkout</span>
                </div>
                
                <div className="border-t border-gray-200 pt-3">
                  <div className="flex justify-between">
                    <span className="text-lg font-semibold text-gray-900">Total</span>
                    <span className="text-lg font-bold text-gray-900">{formatPrice(state.total)}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <Link
                  href="/checkout"
                  className="w-full bg-blue-600 text-white py-3 px-4 rounded-md text-center font-medium hover:bg-blue-700 transition-colors block"
                >
                  Proceder al checkout
                </Link>
                
                <Link
                  href="/"
                  className="w-full bg-gray-100 text-gray-700 py-3 px-4 rounded-md text-center font-medium hover:bg-gray-200 transition-colors block"
                >
                  Continuar comprando
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}