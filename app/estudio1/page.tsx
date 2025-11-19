'use client'

import { useState } from 'react'
import Image from 'next/image'
import Footer from '../components/Footer'
import Section from '../components/Section'

// FAQ Accordion Component
function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const faqs = [
    {
      question: "¿Qué es el diseño circular y cómo se diferencia del diseño tradicional?",
      answer: "El diseño circular es un enfoque que considera todo el ciclo de vida de un producto desde su concepción, priorizando la durabilidad, reparabilidad y reciclabilidad. A diferencia del diseño tradicional lineal (extraer-producir-desechar), el diseño circular busca mantener los materiales en uso el mayor tiempo posible, extrayendo su máximo valor y regenerando los sistemas naturales al final de su vida útil."
    },
    {
      question: "¿Cómo pueden las empresas implementar principios de diseño circular en sus productos existentes?",
      answer: "Las empresas pueden comenzar evaluando sus productos actuales para identificar oportunidades de mejora en materiales, procesos de fabricación y fin de vida útil. Esto incluye seleccionar materiales sostenibles, diseñar para el desensamblaje, crear sistemas de retorno de productos, y establecer alianzas con proveedores comprometidos con la sostenibilidad. También es crucial involucrar a los usuarios finales en el proceso circular a través de educación y incentivos."
    },
    {
      question: "¿Cuáles son los beneficios económicos del diseño circular para las empresas?",
      answer: "El diseño circular ofrece múltiples beneficios económicos: reducción de costos de materiales a través del reuso y reciclaje, nuevas fuentes de ingresos mediante modelos de servicio y leasing, mayor eficiencia operativa, reducción de riesgos regulatorios, y ventaja competitiva en mercados cada vez más conscientes ambientalmente. Además, puede generar innovación en productos y servicios, abriendo nuevos mercados y oportunidades de negocio."
    },
    {
      question: "¿Qué papel juega la tecnología en el diseño circular?",
      answer: "La tecnología es fundamental para habilitar el diseño circular: desde materiales innovadores y procesos de fabricación más eficientes, hasta sistemas de trazabilidad que permiten seguir los productos a lo largo de su ciclo de vida. Las tecnologías digitales como IoT, blockchain y AI facilitan la optimización de recursos, la predicción de mantenimiento, y la creación de plataformas de intercambio de materiales. También permiten nuevos modelos de negocio basados en datos y servicios."
    }
  ]

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <div className="space-y-4">
      {faqs.map((faq, index) => (
        <div key={index} className="border-b border-gray-200">
          <button
            className="w-full text-left py-6 focus:outline-none"
            onClick={() => toggleFAQ(index)}
          >
            <div className="flex justify-between items-start">
              <h3 
                className="text-black pr-8"
                style={{
                  fontFamily: 'var(--font-helvetica)',
                  fontSize: '36px',
                  lineHeight: '37px',
                  fontWeight: 400
                }}
              >
                {faq.question}
              </h3>
              <span 
                className="text-black text-2xl flex-shrink-0"
                style={{
                  fontFamily: 'var(--font-helvetica)',
                  fontSize: '36px',
                  lineHeight: '37px'
                }}
              >
                {openIndex === index ? '−' : '+'}
              </span>
            </div>
          </button>
          {openIndex === index && (
            <div className="pb-6">
              <p 
                className="text-black leading-relaxed"
                style={{
                  fontFamily: 'var(--font-helvetica)',
                  fontSize: '36px',
                  lineHeight: '37px',
                  fontWeight: 400
                }}
              >
                {faq.answer}
              </p>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

export default function EstudioPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Main container with modern layout */}
      <div className="max-w-[1440px] mx-auto px-8 lg:px-16 py-20">
        
        {/* Header Section */}
        <Section 
          title="Hembra"
          spacing="large"
          layout="two-column"
        >
          <div>
            <h2 
              className="text-black mb-8"
              style={{
                fontFamily: 'Inter, var(--font-inter)',
                fontStyle: 'normal',
                fontWeight: 800,
                fontSize: '36px',
                lineHeight: '37px'
              }}
            >
              Diseño para un futuro circular.
            </h2>
            
            <p 
              className="text-black"
              style={{
                fontFamily: 'Helvetica Neue LT Pro, var(--font-helvetica)',
                fontStyle: 'normal',
                fontWeight: 400,
                fontSize: '20px',
                lineHeight: '28px'
              }}
            >
              Hembra es un estudio de diseño industrial que se dedica a crear proyectos con un profundo enfoque en la sustentabilidad. Ofrecemos soluciones estratégicas creativas e innovadoras a empresas, instituciones y organizaciones, ayudándolas a comunicar su compromiso con un futuro sostenible.
            </p>
          </div>
        </Section>

        {/* ¿A qué nos dedicamos? Section */}
        <Section 
          title="¿A qué nos dedicamos?"
          spacing="large"
          layout="two-column"
        >
          <p 
            className="text-black"
            style={{
              fontFamily: 'Helvetica Neue LT Pro, var(--font-helvetica)',
              fontStyle: 'normal',
              fontWeight: 400,
              fontSize: '20px',
              lineHeight: '28px'
            }}
          >
            Nuestra misión es ayudar a nuestros clientes a transmitir su compromiso con la sostenibilidad, integrando este concepto desde la concepción de cada proyecto. Cada propuesta de diseño está pensada para ser parte de un sistema circular, donde los materiales extienden su durabilidad y se ahorran recursos. Desde la fase inicial de conceptualización hasta la materialización, consideramos cómo cada pieza y cada etapa del proceso se alinean con una estrategia circular, buscando la eficiencia y la regeneración.
          </p>
        </Section>

        {/* Nuestro Diferencial Section */}
        <Section 
          title="Nuestro Diferencial"
          spacing="large"
          layout="two-column"
        >
          <p 
            className="text-black"
            style={{
              fontFamily: 'Helvetica Neue LT Pro, var(--font-helvetica)',
              fontStyle: 'normal',
              fontWeight: 400,
              fontSize: '20px',
              lineHeight: '28px'
            }}
          >
            Nuestro valor distintivo radica en crear soluciones de impacto positivo medible. Consideramos el pensamiento circular como urgencia, no opción. Reconocemos el reciclaje, pero trascendemos hacia la &ldquo;etapa cero&rdquo; para erradicar residuos desde la raíz. En Hembra, reeducamos, inspiramos y asumimos el compromiso ineludible con el futuro.
          </p>
        </Section>

    

      </div>

      {/* FAQ Section */}
      <Section 
        title="FAQ"
        spacing="large"
        className="max-w-[1440px] mx-auto px-8 lg:px-16"
        layout="two-column"
      >
        <FAQAccordion />
      </Section>

      {/* Footer */}
      <Footer />
    </div>
  )
}