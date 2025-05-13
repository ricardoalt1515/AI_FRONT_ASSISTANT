"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import DropletAvatar from "@/components/chat/droplet-avatar"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"
import { apiService } from "@/lib/api-client"
import { cn } from "@/lib/utils"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { LogOut, User, Settings, FileText, Plus } from "lucide-react"

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userData, setUserData] = useState<any>(null)
  const pathname = usePathname()
  const router = useRouter()

  // Detectar scroll para efectos visuales
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Verificar autenticación al cargar
  useEffect(() => {
    const checkAuth = () => {
      const isAuth = apiService.isAuthenticated();
      setIsAuthenticated(isAuth);

      if (isAuth) {
        try {
          const userDataStr = localStorage.getItem('userData');
          if (userDataStr) {
            setUserData(JSON.parse(userDataStr));
          }
        } catch (e) {
          console.error("Error cargando datos de usuario:", e);
        }
      }
    };

    checkAuth();

    // Escuchar cambios en el almacenamiento (para sincronizar entre pestañas)
    window.addEventListener('storage', checkAuth);
    return () => window.removeEventListener('storage', checkAuth);
  }, []);

  // Manejar cierre de sesión
  const handleLogout = () => {
    apiService.logoutUser();
    setIsAuthenticated(false);
    setUserData(null);
    router.push('/');
  };

  // Obtener iniciales del usuario para el avatar
  const getUserInitials = () => {
    if (!userData) return 'U';
    let initials = '';
    if (userData.first_name) initials += userData.first_name.charAt(0).toUpperCase();
    if (userData.last_name) initials += userData.last_name.charAt(0).toUpperCase();
    return initials || 'U';
  };

  // Crear nueva consulta
  const handleNewConsultation = () => {
    if (pathname === '/chat') {
      // Si ya estamos en el chat, emitir evento para nueva conversación
      window.dispatchEvent(new CustomEvent('newConversationStarted'));
    } else {
      // Si no, navegar al chat
      router.push('/chat');
    }
  };

  return (
    <motion.header
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={cn(
        "sticky top-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-white/95 backdrop-blur-md border-b border-blue-100/50 shadow-sm py-2"
          : "bg-transparent border-b border-blue-100/10 py-4"
      )}
    >
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-blue-300/30 to-transparent"></div>

      <div className="container max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Logo y título */}
        <motion.div
          className="flex items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Link href="/" className="flex items-center gap-2 group">
            <div className="relative">
              <div
                className={cn(
                  "absolute inset-0 rounded-full bg-blue-400/20 filter blur-md scale-150 opacity-0 group-hover:opacity-100 transition-opacity duration-300",
                  scrolled ? "scale-125" : "scale-150"
                )}
              ></div>

              <DropletAvatar
                size={scrolled ? "sm" : "md"}
                mood="default"
                pulse={false}
                className={cn(
                  "transition-all duration-300 relative z-10",
                  scrolled ? "h-8 w-8" : "h-10 w-10"
                )}
              />
            </div>

            <div>
              <h1
                className={cn(
                  "font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-800 to-blue-500 transition-all duration-300",
                  scrolled ? "text-xl" : "text-2xl"
                )}
              >
                H₂O Allegiant
                <span className="ml-1 font-light text-blue-600 bg-blue-50/80 px-1.5 py-0.5 rounded-sm text-sm">AI</span>
              </h1>
            </div>
          </Link>
        </motion.div>

        {/* Navegación para pantallas medianas y grandes */}
        <div className="hidden md:flex items-center gap-4">
          <div className="flex space-x-1">
            <Link href="/" className={cn(
              "px-3 py-2 rounded-md text-sm font-medium text-blue-700 hover:bg-blue-50 transition-colors",
              pathname === "/" && "bg-blue-50"
            )}>
              Inicio
            </Link>

            {/* Mostrar AI Asistente solo si está autenticado */}
            {isAuthenticated && (
              <Link href="/chat" className={cn(
                "px-3 py-2 rounded-md text-sm font-medium text-blue-700 hover:bg-blue-50 transition-colors",
                pathname === "/chat" && "bg-blue-50"
              )}>
                AI Asistente
              </Link>
            )}
          </div>

          {/* Botones de autenticación o perfil de usuario */}
          <div className="flex items-center gap-2 ml-2">
            {isAuthenticated ? (
              <>
                {/* Botón Nueva Consulta */}
                <Button
                  onClick={handleNewConsultation}
                  className="bg-gradient-to-r from-blue-500 to-blue-600 
                    hover:from-blue-600 hover:to-blue-700 text-white
                    shadow-sm hover:shadow-md transition-all"
                  size="sm"
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Nueva Consulta
                </Button>

                {/* Menú de usuario */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                      <Avatar className="h-8 w-8 border-2 border-blue-100">
                        <AvatarFallback className="bg-gradient-to-br from-blue-400 to-blue-600 text-white">
                          {getUserInitials()}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end" forceMount>
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">
                          {userData?.first_name} {userData?.last_name}
                        </p>
                        <p className="text-xs leading-none text-muted-foreground">
                          {userData?.email}
                        </p>
                        {userData?.company_name && (
                          <p className="text-xs leading-none text-blue-600">
                            {userData.company_name}
                          </p>
                        )}
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/chat" className="cursor-pointer flex items-center">
                        <User className="mr-2 h-4 w-4" />
                        <span>Chat IA</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/proposals" className="cursor-pointer flex items-center">
                        <FileText className="mr-2 h-4 w-4" />
                        <span>Mis Propuestas</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/settings" className="cursor-pointer flex items-center">
                        <Settings className="mr-2 h-4 w-4" />
                        <span>Configuración</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      className="cursor-pointer text-red-600 focus:text-red-700"
                      onClick={handleLogout}
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Cerrar sesión</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  asChild
                  className="text-blue-700 hover:text-blue-800 hover:bg-blue-50"
                >
                  <Link href="/auth/login">
                    Iniciar sesión
                  </Link>
                </Button>

                <Button
                  className="bg-gradient-to-r from-blue-500 to-blue-600 
                    hover:from-blue-600 hover:to-blue-700 text-white
                    shadow-sm hover:shadow-md transition-all"
                  size="sm"
                  asChild
                >
                  <Link href="/auth/register">
                    Registrarse
                  </Link>
                </Button>
              </>
            )}
          </div>
        </div>

        {/* Menú móvil */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="h-9 w-9 text-blue-700">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
                <span className="sr-only">Menú</span>
              </Button>
            </SheetTrigger>
            <SheetContent className="w-[280px] bg-white">
              <div className="flex flex-col h-full py-6">
                <div className="flex items-center gap-2 mb-6">
                  <DropletAvatar size="sm" className="h-8 w-8" />
                  <h2 className="text-xl font-bold text-blue-800">H₂O Allegiant</h2>
                </div>

                {/* Información de usuario en móvil */}
                {isAuthenticated && userData && (
                  <div className="mb-4 p-4 bg-blue-50/50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10 border-2 border-blue-100">
                        <AvatarFallback className="bg-gradient-to-br from-blue-400 to-blue-600 text-white">
                          {getUserInitials()}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-blue-800">
                          {userData.first_name} {userData.last_name}
                        </p>
                        <p className="text-xs text-blue-600 truncate max-w-[180px]">
                          {userData.email}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                <nav className="flex flex-col gap-2">
                  <Link href="/" className={cn(
                    "py-2 px-3 rounded-md text-blue-700 hover:bg-blue-50 transition-colors",
                    pathname === "/" && "bg-blue-50 font-medium"
                  )}>
                    Inicio
                  </Link>

                  {isAuthenticated && (
                    <>
                      <Link href="/chat" className={cn(
                        "py-2 px-3 rounded-md text-blue-700 hover:bg-blue-50 transition-colors",
                        pathname === "/chat" && "bg-blue-50 font-medium"
                      )}>
                        AI Asistente
                      </Link>
                      <Link href="/proposals" className={cn(
                        "py-2 px-3 rounded-md text-blue-700 hover:bg-blue-50 transition-colors",
                        pathname === "/proposals" && "bg-blue-50 font-medium"
                      )}>
                        Mis Propuestas
                      </Link>
                      <Link href="/settings" className={cn(
                        "py-2 px-3 rounded-md text-blue-700 hover:bg-blue-50 transition-colors",
                        pathname === "/settings" && "bg-blue-50 font-medium"
                      )}>
                        Configuración
                      </Link>
                    </>
                  )}
                </nav>

                <div className="mt-auto space-y-3">
                  {isAuthenticated ? (
                    <>
                      <Button
                        onClick={handleNewConsultation}
                        className="w-full bg-gradient-to-r from-blue-500 to-blue-600 
                          hover:from-blue-600 hover:to-blue-700 text-white"
                      >
                        <Plus className="h-4 w-4 mr-1" />
                        Nueva Consulta
                      </Button>
                      <Button
                        onClick={handleLogout}
                        variant="outline"
                        className="w-full border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700"
                      >
                        <LogOut className="mr-2 h-4 w-4" />
                        Cerrar sesión
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button
                        variant="outline"
                        className="w-full border-blue-200 text-blue-700"
                        asChild
                      >
                        <Link href="/auth/login">
                          Iniciar sesión
                        </Link>
                      </Button>

                      <Button
                        className="w-full bg-gradient-to-r from-blue-500 to-blue-600 
                          hover:from-blue-600 hover:to-blue-700 text-white"
                        asChild
                      >
                        <Link href="/auth/register">
                          Registrarse
                        </Link>
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </motion.header>
  )
}
