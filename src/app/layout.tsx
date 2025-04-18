import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "./water-effects.css";
import "./extras.css";
import "./enhanced-theme.css"; // Nuevo tema mejorado

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "H₂O Allegiant AI | Soluciones Inteligentes de Agua",
  description: "Chatbot inteligente especializado en ingeniería y diseño de soluciones avanzadas de tratamiento de agua",
  icons: {
    icon: '/favicon.svg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <meta name="theme-color" content="#0ea5e9" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-water-subtle`}
      >
        {children}
      </body>
    </html>
  );
}
