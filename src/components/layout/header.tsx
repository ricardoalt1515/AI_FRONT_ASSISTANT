"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import DropletAvatar from "@/components/chat/droplet-avatar";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { apiService } from "@/lib/api-client";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { LogOut, User, Settings, FileText, Plus } from "lucide-react";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userData, setUserData] = useState<any>(null);
  const pathname = usePathname();
  const router = useRouter();

  // Detect scroll for visual effects
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Verify authentication on load
  useEffect(() => {
    const checkAuth = () => {
      const isAuth = apiService.isAuthenticated();
      setIsAuthenticated(isAuth);

      if (isAuth) {
        try {
          const userDataStr = localStorage.getItem("userData");
          if (userDataStr) {
            setUserData(JSON.parse(userDataStr));
          }
        } catch (e) {
          console.error("Error loading user data:", e);
        }
      }
    };

    checkAuth();

    // Listen for storage changes (to sync between tabs)
    window.addEventListener("storage", checkAuth);
    return () => window.removeEventListener("storage", checkAuth);
  }, []);

  // Handle logout
  const handleLogout = () => {
    apiService.logoutUser();
    setIsAuthenticated(false);
    setUserData(null);
    router.push("/");
  };

  // Get user initials for avatar
  const getUserInitials = () => {
    if (!userData) return "U";
    let initials = "";
    if (userData.first_name)
      initials += userData.first_name.charAt(0).toUpperCase();
    if (userData.last_name)
      initials += userData.last_name.charAt(0).toUpperCase();
    return initials || "U";
  };

  // Create new consultation
  const handleNewConsultation = () => {
    if (pathname === "/chat") {
      // If we're already in chat, emit event for new conversation
      window.dispatchEvent(new CustomEvent("newConversationStarted"));
    } else {
      // If not, navigate to chat
      router.push("/chat");
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
          ? "bg-white/60 backdrop-blur-2xl border-b-2 border-cyan-300/40 shadow-xl py-2"
          : "bg-white/40 backdrop-blur-xl border-b border-cyan-200/30 shadow-md py-4",
      )}
    >
      <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent blur-sm"></div>

      <div className="container max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Logo and title */}
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
                  "absolute inset-0 rounded-full bg-cyan-400/30 filter blur-lg scale-150 opacity-0 group-hover:opacity-100 transition-opacity duration-300",
                  scrolled ? "scale-125" : "scale-150",
                )}
              ></div>

              <DropletAvatar
                size={scrolled ? "sm" : "md"}
                mood="default"
                pulse={true}
                className={cn(
                  "transition-all duration-300 relative z-10 animate-pulse group-hover:animate-bounce",
                  scrolled ? "h-9 w-9" : "h-12 w-12",
                )}
              />
            </div>

            <div>
              <h1
                className={cn(
                  "font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-cyan-700 to-blue-500 transition-all duration-300 drop-shadow-md",
                  scrolled ? "text-xl" : "text-2xl",
                )}
              >
                H₂O Allegiant
                <span className="ml-1 font-light text-cyan-700 bg-cyan-100/80 px-2 py-0.5 rounded-full text-sm shadow-sm">
                  AI
                </span>
              </h1>
            </div>
          </Link>
        </motion.div>

        {/* Navigation for medium and large screens */}
        <div className="hidden md:flex items-center gap-4">
          <div className="flex space-x-1">
            <Link
              href="/"
              className={cn(
                "px-4 py-2 rounded-full text-sm font-semibold text-cyan-800 hover:bg-cyan-100/60 transition-colors shadow-sm",
                pathname === "/" && "bg-cyan-100/80",
              )}
            >
              Home
            </Link>

            {/* Show AI Assistant only if authenticated */}
            {isAuthenticated && (
              <Link
                href="/chat"
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-semibold text-cyan-800 hover:bg-cyan-100/60 transition-colors shadow-sm",
                  pathname === "/chat" && "bg-cyan-100/80",
                )}
              >
                AI Assistant
              </Link>
            )}
          </div>

          {/* Authentication buttons or user profile */}
          <div className="flex items-center gap-2 ml-2">
            {isAuthenticated ? (
              <>
                {/* New Conversation Button */}
                <Button
                  onClick={handleNewConsultation}
                  className="rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-700 text-white shadow-lg hover:shadow-xl transition-all px-5 py-2"
                  size="sm"
                >
                  <Plus className="h-4 w-4 mr-1" />
                  New Conversation
                </Button>

                {/* User menu */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="relative h-10 w-10 rounded-full p-0 bg-white/60 shadow-md border-2 border-cyan-200 hover:border-cyan-400"
                    >
                      <Avatar className="h-10 w-10 border-2 border-cyan-200">
                        <AvatarFallback className="bg-gradient-to-br from-cyan-400 to-blue-600 text-white">
                          {getUserInitials()}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    className="w-60 bg-white/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-cyan-100/60 p-2"
                    align="end"
                    forceMount
                  >
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
                      <Link
                        href="/chat"
                        className="cursor-pointer flex items-center"
                      >
                        <User className="mr-2 h-4 w-4" />
                        <span>AI Chat</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link
                        href="/proposals"
                        className="cursor-pointer flex items-center"
                      >
                        <FileText className="mr-2 h-4 w-4" />
                        <span>My Proposals</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link
                        href="/settings"
                        className="cursor-pointer flex items-center"
                      >
                        <Settings className="mr-2 h-4 w-4" />
                        <span>Settings</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      className="cursor-pointer text-red-600 focus:text-red-700"
                      onClick={handleLogout}
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
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
                  <Link href="/auth/login">Sign in</Link>
                </Button>

                <Button
                  className="bg-gradient-to-r from-blue-500 to-blue-600 
                    hover:from-blue-600 hover:to-blue-700 text-white
                    shadow-sm hover:shadow-md transition-all"
                  size="sm"
                  asChild
                >
                  <Link href="/auth/register">Sign up</Link>
                </Button>
              </>
            )}
          </div>
        </div>

        {/* Mobile menu */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9 text-blue-700"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
                <span className="sr-only">Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent className="w-[280px] bg-white">
              <div className="flex flex-col h-full py-6">
                <div className="flex items-center gap-2 mb-6">
                  <DropletAvatar size="sm" className="h-8 w-8" />
                  <h2 className="text-xl font-bold text-blue-800">
                    H₂O Allegiant
                  </h2>
                </div>

                {/* User information on mobile */}
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
                  <Link
                    href="/"
                    className={cn(
                      "py-2 px-3 rounded-md text-blue-700 hover:bg-blue-50 transition-colors",
                      pathname === "/" && "bg-blue-50 font-medium",
                    )}
                  >
                    Home
                  </Link>

                  {isAuthenticated && (
                    <>
                      <Link
                        href="/chat"
                        className={cn(
                          "py-2 px-3 rounded-md text-blue-700 hover:bg-blue-50 transition-colors",
                          pathname === "/chat" && "bg-blue-50 font-medium",
                        )}
                      >
                        AI Assistant
                      </Link>
                      <Link
                        href="/proposals"
                        className={cn(
                          "py-2 px-3 rounded-md text-blue-700 hover:bg-blue-50 transition-colors",
                          pathname === "/proposals" && "bg-blue-50 font-medium",
                        )}
                      >
                        My Proposals
                      </Link>
                      <Link
                        href="/settings"
                        className={cn(
                          "py-2 px-3 rounded-md text-blue-700 hover:bg-blue-50 transition-colors",
                          pathname === "/settings" && "bg-blue-50 font-medium",
                        )}
                      >
                        Settings
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
                        New Conversation
                      </Button>
                      <Button
                        onClick={handleLogout}
                        variant="outline"
                        className="w-full border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700"
                      >
                        <LogOut className="mr-2 h-4 w-4" />
                        Log out
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button
                        variant="outline"
                        className="w-full border-blue-200 text-blue-700"
                        asChild
                      >
                        <Link href="/auth/login">Sign in</Link>
                      </Button>

                      <Button
                        className="w-full bg-gradient-to-r from-blue-500 to-blue-600 
                          hover:from-blue-600 hover:to-blue-700 text-white"
                        asChild
                      >
                        <Link href="/auth/register">Sign up</Link>
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
  );
}
