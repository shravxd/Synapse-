import Link from "next/link"
import { Zap } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t border-border/40 bg-background">
      <div className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
        <div className="grid gap-10 md:grid-cols-5">
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-brand text-primary-foreground">
                <Zap className="h-4 w-4" />
              </div>
              <span className="text-lg font-bold text-foreground">Synapse</span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              India&apos;s premier platform connecting small brands with the
              perfect influencers for impactful, measurable collaborations.
            </p>
          </div>
          <div>
            <h4 className="mb-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Platform</h4>
            <div className="flex flex-col gap-3">
              <Link href="/directory" className="text-sm text-foreground/70 hover:text-foreground transition-colors">
                Browse Influencers
              </Link>
              <Link href="/campaign" className="text-sm text-foreground/70 hover:text-foreground transition-colors">
                Post a Campaign
              </Link>
              <Link href="/status" className="text-sm text-foreground/70 hover:text-foreground transition-colors">
                Request Dashboard
              </Link>
            </div>
          </div>
          <div>
            <h4 className="mb-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Categories</h4>
            <div className="flex flex-col gap-3">
              {["Tech", "Beauty", "Fitness", "Food", "Travel", "Fashion"].map((n) => (
                <Link key={n} href="/directory" className="text-sm text-foreground/70 hover:text-foreground transition-colors">
                  {n}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <h4 className="mb-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Company</h4>
            <div className="flex flex-col gap-3">
              <span className="text-sm text-foreground/70">About Us</span>
              <span className="text-sm text-foreground/70">Contact</span>
              <span className="text-sm text-foreground/70">Privacy Policy</span>
              <span className="text-sm text-foreground/70">Terms of Service</span>
            </div>
          </div>
        </div>
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border/40 pt-8 md:flex-row">
          <p className="text-sm text-muted-foreground">
            2026 Synapse. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground">
            Made with care for Indian brands.
          </p>
        </div>
      </div>
    </footer>
  )
}
