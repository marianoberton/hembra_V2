import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from "./context/CartContext";
import Header from "./components/Header";
import DynamicBackground from "./components/DynamicBackground";

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
  description: "HEMBRA es una marca de diseño industrial en una misión para ayudar a las empresas a construir un futuro regenerativo. Descubre productos innovadores y sostenibles.",
  keywords: "diseño industrial, sostenible, regenerativo, productos ecológicos, HEMBRA",
  authors: [{ name: "HEMBRA Studio" }],
  robots: "index, follow",
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
        <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;700&display=swap" rel="stylesheet" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} antialiased overflow-x-hidden`}
      >
        <CartProvider>
          <DynamicBackground />
          <Header />
          <div>
            {children}
          </div>
        </CartProvider>
      </body>
    </html>
  );
}
