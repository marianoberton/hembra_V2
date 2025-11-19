'use client';

import { useState } from 'react';
import Footer from '../components/Footer';
import HeaderContacto from '../components/HeaderContacto';

export default function ContactoPage() {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    empresa: '',
    mensaje: '',
    tipoProyecto: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simular envío del formulario
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setSubmitStatus('success');
      setFormData({
        nombre: '',
        email: '',
        telefono: '',
        empresa: '',
        mensaje: '',
        tipoProyecto: ''
      });
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen" style={{backgroundColor: '#f2f2f2'}}>
      {/* Header */}
      <HeaderContacto />
      
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Formulario */}
          <div className="bg-white rounded-xl p-8 shadow-sm">
            <h2 className="text-2xl font-light mb-6" style={{color: '#3D4A3D', fontFamily: 'Helvetica Neue LT Pro'}}>
              Cuéntanos sobre tu proyecto
            </h2>
            
            {submitStatus === 'success' && (
              <div className="mb-6 p-4 rounded-lg" style={{backgroundColor: '#d0ddc3', color: '#3D4A3D'}}>
                ¡Gracias por contactarnos! Te responderemos pronto.
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="mb-6 p-4 bg-red-100 text-red-700 rounded-lg">
                Hubo un error al enviar el mensaje. Por favor, intenta nuevamente.
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="nombre" className="block text-sm font-medium mb-2" style={{color: '#3D4A3D', fontFamily: 'Helvetica Neue LT Pro'}}>
                    Nombre *
                  </label>
                  <input
                    type="text"
                    id="nombre"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-opacity-50 focus:border-transparent"
                    style={{fontFamily: 'Helvetica Neue LT Pro'}}
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2" style={{color: '#3D4A3D', fontFamily: 'Helvetica Neue LT Pro'}}>
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-opacity-50 focus:border-transparent"
                    style={{fontFamily: 'Helvetica Neue LT Pro'}}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="telefono" className="block text-sm font-medium mb-2" style={{color: '#3D4A3D', fontFamily: 'Helvetica Neue LT Pro'}}>
                    Teléfono
                  </label>
                  <input
                    type="tel"
                    id="telefono"
                    name="telefono"
                    value={formData.telefono}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-opacity-50 focus:border-transparent"
                    style={{fontFamily: 'Helvetica Neue LT Pro'}}
                  />
                </div>
                <div>
                  <label htmlFor="empresa" className="block text-sm font-medium mb-2" style={{color: '#3D4A3D', fontFamily: 'Helvetica Neue LT Pro'}}>
                    Empresa
                  </label>
                  <input
                    type="text"
                    id="empresa"
                    name="empresa"
                    value={formData.empresa}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-opacity-50 focus:border-transparent"
                    style={{fontFamily: 'Helvetica Neue LT Pro'}}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="tipoProyecto" className="block text-sm font-medium mb-2" style={{color: '#3D4A3D', fontFamily: 'Helvetica Neue LT Pro'}}>
                  Tipo de Proyecto
                </label>
                <select
                  id="tipoProyecto"
                  name="tipoProyecto"
                  value={formData.tipoProyecto}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-opacity-50 focus:border-transparent"
                  style={{fontFamily: 'Helvetica Neue LT Pro'}}
                >
                  <option value="">Selecciona una opción</option>
                  <option value="diseño-producto">Diseño de Producto</option>
                  <option value="estrategia-circular">Estrategia Circular</option>
                  <option value="consultoria">Consultoría en Sustentabilidad</option>
                  <option value="desarrollo-marca">Desarrollo de Marca</option>
                  <option value="otro">Otro</option>
                </select>
              </div>

              <div>
                <label htmlFor="mensaje" className="block text-sm font-medium mb-2" style={{color: '#3D4A3D', fontFamily: 'Helvetica Neue LT Pro'}}>
                  Mensaje *
                </label>
                <textarea
                  id="mensaje"
                  name="mensaje"
                  value={formData.mensaje}
                  onChange={handleInputChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-opacity-50 focus:border-transparent resize-vertical"
                  style={{fontFamily: 'Helvetica Neue LT Pro'}}
                  placeholder="Cuéntanos sobre tu proyecto, objetivos y cómo podemos ayudarte..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 px-6 rounded-lg font-medium transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                style={{
                  backgroundColor: '#d0ddc3',
                  color: '#3D4A3D',
                  fontFamily: 'Helvetica Neue LT Pro'
                }}
              >
                {isSubmitting ? 'Enviando...' : 'Enviar Mensaje'}
              </button>
            </form>
          </div>

          {/* Información de contacto */}
          <div className="space-y-8">
            <div className="bg-white rounded-xl p-8 shadow-sm">
              <h3 className="text-xl font-light mb-6" style={{color: '#3D4A3D', fontFamily: 'Helvetica Neue LT Pro'}}>
                Información de Contacto
              </h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{backgroundColor: '#d0ddc3'}}>
                    <span style={{color: '#3D4A3D'}}>📧</span>
                  </div>
                  <div>
                    <p className="font-medium" style={{color: '#3D4A3D', fontFamily: 'Helvetica Neue LT Pro'}}>Email</p>
                    <p style={{color: '#7c8e60', fontFamily: 'Helvetica Neue LT Pro'}}>hello@hembra.studio</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{backgroundColor: '#d0ddc3'}}>
                    <span style={{color: '#3D4A3D'}}>📱</span>
                  </div>
                  <div>
                    <p className="font-medium" style={{color: '#3D4A3D', fontFamily: 'Helvetica Neue LT Pro'}}>Teléfono</p>
                    <p style={{color: '#7c8e60', fontFamily: 'Helvetica Neue LT Pro'}}>+54 11 1234-5678</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{backgroundColor: '#d0ddc3'}}>
                    <span style={{color: '#3D4A3D'}}>📍</span>
                  </div>
                  <div>
                    <p className="font-medium" style={{color: '#3D4A3D', fontFamily: 'Helvetica Neue LT Pro'}}>Ubicación</p>
                    <p style={{color: '#7c8e60', fontFamily: 'Helvetica Neue LT Pro'}}>Villa Crespo, Buenos Aires</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-sm">
              <h3 className="text-xl font-light mb-4" style={{color: '#3D4A3D', fontFamily: 'Helvetica Neue LT Pro'}}>
                Horarios de Atención
              </h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span style={{color: '#7c8e60', fontFamily: 'Helvetica Neue LT Pro'}}>Lunes - Viernes</span>
                  <span style={{color: '#3D4A3D', fontFamily: 'Helvetica Neue LT Pro'}}>9:00 - 18:00</span>
                </div>
                <div className="flex justify-between">
                  <span style={{color: '#7c8e60', fontFamily: 'Helvetica Neue LT Pro'}}>Sábados</span>
                  <span style={{color: '#3D4A3D', fontFamily: 'Helvetica Neue LT Pro'}}>10:00 - 14:00</span>
                </div>
                <div className="flex justify-between">
                  <span style={{color: '#7c8e60', fontFamily: 'Helvetica Neue LT Pro'}}>Domingos</span>
                  <span style={{color: '#3D4A3D', fontFamily: 'Helvetica Neue LT Pro'}}>Cerrado</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer con logo gigante */}
      <Footer />
    </div>
  );
}