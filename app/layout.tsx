import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from "./context/CartContext";
import Header from "./components/Header";
import DynamicBackground from "./components/DynamicBackground";
import Footer from "./components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "HEMBRA - Diseño Industrial Regenerativo",
  description: "HEMBRA es una marca de diseño industrial en una misión para ayudar a las empresas a construir un futuro regenerativo.",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Helvetica+Neue:wght@300;400;500;700&display=swap" rel="stylesheet" />
      </head>
      {/* El body tiene el color del footer para dar continuidad visual si hay rebote de scroll */}
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} antialiased overflow-x-hidden bg-[#d0ddc3]`}
      >
        <CartProvider>
          <DynamicBackground />
          
          {/* CORRECCIÓN: 
             1. Quitamos 'min-h-screen' -> Ahora la altura depende del contenido.
             2. Quitamos 'flex', 'flex-col' -> No necesitamos estirar el main.
             3. Agregamos 'pb-12' o 'pb-16' -> Espacio de seguridad antes del borde redondeado.
          */}
          <div className="relative z-10 bg-[#f2f2f2] shadow-2xl rounded-b-[40px] overflow-hidden pb-4">
            <Header />
            <main>
              {children}
            </main>
          </div>

          {/* Footer fijo detrás */}
          <Footer />
          
        </CartProvider>
      </body>
    </html>
  );
}
