import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { Toaster } from "@/components/ui/toaster"
import { Suspense } from "react"
import { ThemeProvider } from "@/components/ui/theme-provider"
import { Topbar } from "@/components/layout/topbar"
import "./globals.css"

export const metadata: Metadata = {
  title: "H2O Allegiant - Water Treatment Project Hub",
  description: "Hub central de gestión de proyectos de tratamiento de aguas para ingenieros y consultoras ambientales",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <ThemeProvider>
          <Suspense fallback={null}>
            <Topbar />
            {children}
            <Toaster />
          </Suspense>
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  )
}
