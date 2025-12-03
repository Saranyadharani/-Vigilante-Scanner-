"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

export function Navigation() {
  const pathname = usePathname()

  const handleLogout = () => {
    console.log("Logout action triggered")
  }

  return (
    <header className="glass-strong bg-card/50 border-b border-border/50 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/dashboard" className="text-2xl font-bold text-foreground">
            Vigilante Scanner
          </Link>

          <nav className="flex items-center space-x-6">
            <Link
              href="/dashboard"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                pathname === "/dashboard" ? "text-primary" : "text-muted-foreground"
              }`}
            >
              Dashboard
            </Link>
            <Link
              href="/awareness"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                pathname === "/awareness" ? "text-primary" : "text-muted-foreground"
              }`}
            >
              Scam Awareness
            </Link>
            <button
              onClick={handleLogout}
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              Logout
            </button>
          </nav>
        </div>
      </div>
    </header>
  )
}
