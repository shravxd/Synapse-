"use client"

import Link from "next/link"
import { categories } from "@/lib/data"
import { useAnimateOnScroll } from "@/hooks/use-animate-on-scroll"
import {
  Smartphone,
  Sparkles,
  Dumbbell,
  UtensilsCrossed,
  Plane,
  Shirt,
  Heart,
  Landmark,
  ArrowUpRight,
} from "lucide-react"

const iconMap: Record<string, React.ElementType> = {
  Tech: Smartphone,
  Beauty: Sparkles,
  Fitness: Dumbbell,
  Food: UtensilsCrossed,
  Travel: Plane,
  Fashion: Shirt,
  Wellness: Heart,
  Finance: Landmark,
}

export function CategoriesSection() {
  const { ref: headerRef, isVisible: headerVisible } = useAnimateOnScroll()
  const { ref: gridRef, isVisible: gridVisible } = useAnimateOnScroll(0.1)

  return (
    <section className="relative border-t border-border/30 py-20 lg:py-28 overflow-hidden">
      {/* Decorative orb */}
      <div className="pointer-events-none absolute -right-32 top-1/2 h-[400px] w-[400px] -translate-y-1/2 rounded-full bg-teal/3 blur-[120px]" />

      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div
          ref={headerRef}
          className={`mb-16 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end transition-all duration-700 ${
            headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div>
            <p className="mb-3 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-teal">
              <span className="h-1 w-6 rounded-full bg-gradient-to-r from-teal to-teal-light" />
              Categories
            </p>
            <h2 className="text-balance text-3xl font-bold text-foreground md:text-4xl lg:text-5xl">
              Explore across different fields
            </h2>
            <p className="mt-4 max-w-xl text-base text-muted-foreground">
              Find the perfect influencer in the category that aligns with your brand&apos;s vision and audience.
            </p>
          </div>
          <Link
            href="/directory"
            className="group flex shrink-0 items-center gap-2 text-sm font-semibold text-teal transition-colors hover:text-teal-light"
          >
            View All Categories
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </div>

        <div ref={gridRef} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category, i) => {
            const Icon = iconMap[category.shortName] || Smartphone
            return (
              <Link
                key={category.name}
                href="/directory"
                className={`group relative flex flex-col rounded-2xl border border-border/30 bg-card/40 p-6 transition-all duration-500 hover:border-transparent hover:bg-card hover:shadow-2xl hover:-translate-y-2 ${
                  gridVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: gridVisible ? `${i * 80}ms` : "0ms" }}
              >
                {/* Hover gradient border effect */}
                <div
                  className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{
                    background: `linear-gradient(135deg, ${category.color}15, transparent, ${category.color}10)`,
                  }}
                />

                <div className="relative flex items-center justify-between">
                  <div
                    className="flex h-12 w-12 items-center justify-center rounded-xl transition-all duration-500 group-hover:scale-110 group-hover:shadow-lg"
                    style={{
                      backgroundColor: `${category.color}12`,
                      color: category.color,
                    }}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                  <ArrowUpRight
                    className="h-4 w-4 text-muted-foreground/30 transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
                    style={{ color: undefined }}
                  />
                </div>
                <h3 className="relative mt-4 mb-1 text-base font-bold text-foreground">{category.name}</h3>
                <p className="relative mb-4 text-sm text-muted-foreground">{category.description}</p>
                <div className="relative mt-auto">
                  <div className="mb-2 h-1 w-full overflow-hidden rounded-full bg-secondary/50">
                    <div
                      className="h-full rounded-full transition-all duration-1000"
                      style={{
                        width: gridVisible ? `${Math.min((category.count / 120) * 100, 100)}%` : "0%",
                        backgroundColor: category.color,
                        transitionDelay: `${i * 80 + 400}ms`,
                      }}
                    />
                  </div>
                  <span className="text-xs font-semibold text-muted-foreground">
                    <span className="text-foreground">{category.count}</span> influencers
                  </span>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
