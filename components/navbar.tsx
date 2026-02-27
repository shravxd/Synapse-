"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState, useEffect } from "react"
import { Menu, X, Zap } from "lucide-react"

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/directory", label: "Influencers" },
  { href: "/campaign", label: "Post Campaign" },
  { href: "/status", label: "Dashboard" },
]

export function Navbar() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-500 ${scrolled
          ? "border-b border-border/40 bg-background/80 shadow-lg shadow-teal/5 backdrop-blur-2xl"
          : "bg-transparent backdrop-blur-sm"
        }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3.5 lg:px-8">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-teal to-teal-dark text-primary-foreground transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-teal/40">
            <Zap className="h-4.5 w-4.5" />
            <div className="absolute inset-0 rounded-xl bg-teal-light/20 opacity-0 transition-opacity group-hover:opacity-100" />
          </div>
          <span className="text-lg font-bold tracking-tight text-foreground">
            Syn<span className="text-teal">apse</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden items-center gap-1 rounded-2xl border border-border/30 bg-secondary/30 p-1.5 backdrop-blur-sm md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`relative rounded-xl px-4 py-2 text-sm font-medium transition-all duration-300 ${pathname === link.href
                  ? "bg-gradient-to-r from-teal to-teal-dark text-primary-foreground shadow-md shadow-teal/25"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/register"
            className="group relative overflow-hidden rounded-xl bg-gradient-to-r from-coral to-coral-dark px-5 py-2.5 text-sm font-semibold text-foreground transition-all duration-300 hover:shadow-lg hover:shadow-coral/30 hover:-translate-y-0.5"
          >
            <span className="relative z-10">Get Started</span>
            <div className="absolute inset-0 bg-gradient-to-r from-coral-light to-coral opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden rounded-xl p-2 text-foreground hover:bg-secondary transition-colors"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile Nav */}
      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out md:hidden ${mobileOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
          }`}
      >
        <div className="border-t border-border/40 bg-background/95 backdrop-blur-2xl">
          <div className="flex flex-col gap-1 p-4">
            {navLinks.map((link, i) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`rounded-xl px-4 py-3 text-sm font-medium transition-all duration-300 ${pathname === link.href
                    ? "bg-teal/10 text-teal"
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                  }`}
                style={{ animationDelay: `${i * 0.05}s` }}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/register"
              onClick={() => setMobileOpen(false)}
              className="mt-2 rounded-xl bg-gradient-to-r from-coral to-coral-dark px-5 py-3 text-center text-sm font-semibold text-foreground"
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
