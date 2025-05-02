// src/app/auth/layout.tsx
import Link from "next/link"
import { Button } from "@/components/ui/button"
import DropletAvatar from "@/components/chat/droplet-avatar"

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navegación superior */}
      <header className="border-b border-blue-100/30 bg-white/60 backdrop-blur-sm z-10">
        <div className="container max-w-7xl mx-auto flex items-center justify-between p-4">
          <Link href="/" className="flex items-center gap-2">
            <DropletAvatar size="sm" className="h-8 w-8" />
            <span className="font-medium text-lg text-blue-700">H₂O Allegiant</span>
          </Link>

          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              asChild
              className="text-blue-600 hover:text-blue-800 hover:bg-blue-50"
            >
              <Link href="/">
                Volver a inicio
              </Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Fondo animado sutilmente */}
      <div className="fixed inset-0 -z-10 bg-gradient-to-b from-blue-50/80 via-white to-blue-50/50 pointer-events-none">
        <div className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'radial-gradient(circle, #38bdf8 1px, transparent 1px)',
            backgroundSize: '30px 30px'
          }}></div>
      </div>

      {/* Contenido principal */}
      <main className="flex-1 flex items-center justify-center p-4 sm:p-8">
        {children}
      </main>

      {/* Footer minimalista */}
      <footer className="text-center py-4 text-blue-600/70 text-sm border-t border-blue-100/30 bg-white/60 backdrop-blur-sm">
        <div className="container mx-auto">
          © {new Date().getFullYear()} H₂O Allegiant — Soluciones Avanzadas de Tratamiento de Agua
        </div>
      </footer>
    </div>
  )
}
