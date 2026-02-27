"use client"

import { Search, Handshake, BarChart3 } from "lucide-react"
import { useAnimateOnScroll } from "@/hooks/use-animate-on-scroll"

const steps = [
  {
    icon: Search,
    title: "Discover",
    description: "Browse 500+ verified Indian influencers. Filter by niche, platform, followers, and engagement rate.",
    step: "01",
    color: "#0EA5E9",
    gradient: "from-teal to-teal-dark",
  },
  {
    icon: Handshake,
    title: "Collaborate",
    description: "Send requests directly to creators. Define goals, budget, and expectations seamlessly.",
    step: "02",
    color: "#F97316",
    gradient: "from-coral to-coral-dark",
  },
  {
    icon: BarChart3,
    title: "Track & Grow",
    description: "Monitor campaigns in real-time. Track requests, measure impact, and optimize your strategy.",
    step: "03",
    color: "#10B981",
    gradient: "from-mint to-[#059669]",
  },
]

export function HowItWorks() {
  const { ref: headerRef, isVisible: headerVisible } = useAnimateOnScroll()
  const { ref: cardsRef, isVisible: cardsVisible } = useAnimateOnScroll(0.1)

  return (
    <section className="relative py-20 lg:py-28 overflow-hidden">
      {/* Background orb */}
      <div className="pointer-events-none absolute right-0 top-0 h-[500px] w-[500px] rounded-full bg-mint/3 blur-[140px]" />

      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div
          ref={headerRef}
          className={`mx-auto mb-16 max-w-2xl text-center transition-all duration-700 ${
            headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <p className="mb-3 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-mint">
            <span className="h-1 w-6 rounded-full bg-gradient-to-r from-mint to-[#34D399]" />
            How it works
          </p>
          <h2 className="text-balance text-3xl font-bold text-foreground md:text-4xl lg:text-5xl">
            Three steps to launch your campaign
          </h2>
        </div>

        <div ref={cardsRef} className="grid gap-6 md:grid-cols-3">
          {steps.map((step, i) => (
            <div
              key={step.title}
              className={`group relative transition-all duration-700 ${
                cardsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
              }`}
              style={{ transitionDelay: cardsVisible ? `${i * 150}ms` : "0ms" }}
            >
              <div className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-border/30 bg-card/40 p-8 transition-all duration-500 hover:border-transparent hover:bg-card hover:shadow-2xl hover:-translate-y-2 lg:p-10">
                {/* Top gradient line */}
                <div
                  className="absolute inset-x-0 top-0 h-[2px] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{ background: `linear-gradient(90deg, transparent, ${step.color}, transparent)` }}
                />

                <span className="mb-6 text-7xl font-bold text-border/20 transition-colors duration-500" style={{ color: undefined }}>
                  {step.step}
                </span>
                <div
                  className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl transition-all duration-500 group-hover:scale-110 group-hover:shadow-lg`}
                  style={{
                    backgroundColor: `${step.color}12`,
                    color: step.color,
                  }}
                >
                  <step.icon className="h-5 w-5 transition-transform duration-500 group-hover:scale-110" />
                </div>
                <h3 className="mb-3 text-xl font-bold text-foreground">{step.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{step.description}</p>

                {/* Connecting line (not on last card) */}
                {i < 2 && (
                  <div className="pointer-events-none absolute -right-3 top-1/2 hidden h-[2px] w-6 md:block" style={{ backgroundColor: `${step.color}30` }} />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
