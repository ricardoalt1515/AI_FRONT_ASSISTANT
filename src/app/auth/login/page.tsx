"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { apiService } from "@/lib/api-client"

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  })

  // Verificar si el usuario ya está autenticado
  useEffect(() => {
    // Si el usuario ya está autenticado, redirigir al chat
    if (apiService.isAuthenticated()) {
      router.push('/chat');
    }
  }, [router]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
    // Limpiar mensaje de error al editar
    if (errorMessage) setErrorMessage(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setErrorMessage(null)

    try {
      // Llamar a la API de login
      await apiService.loginUser(formData.email, formData.password);

      // Redireccionar al chat en caso de éxito
      router.push('/chat');
    } catch (error: any) {
      console.error("Error durante el inicio de sesión:", error);
      // Manejar error de login
      if (error.response) {
        if (error.response.status === 401) {
          setErrorMessage("Correo electrónico o contraseña incorrectos.");
        } else if (error.response.data && error.response.data.detail) {
          setErrorMessage(error.response.data.detail);
        } else {
          setErrorMessage("Error en el inicio de sesión. Inténtalo de nuevo.");
        }
      } else {
        setErrorMessage("Error de conexión. Verifica tu internet e inténtalo de nuevo.");
      }
      setIsLoading(false);
    }
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <Card className="border-blue-100 shadow-lg">
        {/* Banda decorativa superior */}
        <div className="h-1.5 bg-gradient-to-r from-blue-400 to-blue-600 w-full"></div>

        <CardHeader className="space-y-1">
          <div className="flex justify-center mb-4">
            <motion.div
              className="relative"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="absolute inset-0 bg-blue-300/20 rounded-full blur-xl scale-150"></div>
              <div className="h-16 w-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white shadow-lg relative">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
              </div>
            </motion.div>
          </div>

          <CardTitle className="text-center text-2xl text-blue-800">Iniciar Sesión</CardTitle>
          <CardDescription className="text-center">
            Ingresa tus credenciales para acceder a H₂O Allegiant
          </CardDescription>
        </CardHeader>

        <CardContent>
          {/* Mensaje de error */}
          {errorMessage && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md text-red-600 text-sm">
              {errorMessage}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Correo electrónico</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="tu@correo.com"
                required
                autoComplete="email"
                className="focus-visible:ring-blue-500/30"
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Contraseña</Label>
                <Link
                  href="#"
                  className="text-xs text-blue-600 hover:text-blue-800 hover:underline"
                >
                  ¿Olvidaste tu contraseña?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                value={formData.password}
                onChange={handleInputChange}
                required
                autoComplete="current-password"
                className="focus-visible:ring-blue-500/30"
              />
            </div>

            <Button
              type="submit"
              className="w-full h-10 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-md"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Iniciando sesión...
                </div>
              ) : "Iniciar Sesión"}
            </Button>
          </form>
        </CardContent>

        <CardFooter className="flex justify-center border-t border-blue-50 pt-4">
          <p className="text-sm">
            ¿No tienes una cuenta?{" "}
            <Link
              href="/auth/register"
              className="text-blue-700 font-medium hover:text-blue-800 hover:underline"
            >
              Sign up
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}
