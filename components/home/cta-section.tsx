import Link from "next/link"
import { ArrowRight } from "lucide-react"

export function CtaSection() {
  return (
    <section className="border-t border-border/40 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl border border-brand/20 bg-card p-12 text-center md:p-20">
          {/* Background pattern */}
          <div className="pointer-events-none absolute inset-0 opacity-[0.03]" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />

          {/* Glow */}
          <div className="pointer-events-none absolute left-1/2 top-0 h-[300px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand/10 blur-[100px]" />

          <div className="relative">
            <p className="mb-4 text-sm font-semibold uppercase tracking-wider text-brand">Ready to start?</p>
            <h2 className="mx-auto max-w-2xl text-balance text-3xl font-bold text-foreground md:text-4xl lg:text-5xl">
              Grow your brand with the right creators today
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-base leading-relaxed text-muted-foreground">
              Join 1,200+ Indian brands already using Synapse to find, connect,
              and collaborate with influencers that matter.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/campaign"
                className="group flex items-center gap-2.5 rounded-2xl bg-brand px-8 py-4 text-base font-semibold text-primary-foreground shadow-2xl shadow-brand/20 transition-all hover:shadow-brand/30 hover:-translate-y-0.5"
              >
                Post Your First Campaign
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/directory"
                className="flex items-center gap-2 rounded-2xl border border-border/60 bg-secondary/50 px-8 py-4 text-base font-semibold text-foreground transition-all hover:border-brand/30 hover:-translate-y-0.5"
              >
                Explore Influencers
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
