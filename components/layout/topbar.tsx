"use client"

import Link from "next/link"
import { ModeToggle } from "@/components/ui/mode-toggle"

export function Topbar() {
  return (
    <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto h-14 px-4 flex items-center justify-between">
        <Link href="/" className="font-semibold gradient-text">
          H2O Allegiant
        </Link>
        <div className="flex items-center gap-2">
          <ModeToggle />
        </div>
      </div>
    </header>
  )
}
