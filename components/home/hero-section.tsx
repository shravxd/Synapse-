"use client"

import Link from "next/link"
import { ArrowRight, Play, Sparkles } from "lucide-react"
import { useEffect, useState } from "react"

const rotatingWords = ["Influencer", "Creator", "Partner", "Voice"]
const rotatingColors = ["text-teal", "text-coral", "text-mint", "text-rose"]

export function HeroSection() {
  const [wordIndex, setWordIndex] = useState(0)
  const [fade, setFade] = useState(true)
  const [mounted, setMounted] = useState(false)

  useEffect(() => { setMounted(true) }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false)
      setTimeout(() => {
        setWordIndex((prev) => (prev + 1) % rotatingWords.length)
        setFade(true)
      }, 300)
    }, 2500)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative overflow-hidden pb-24 pt-16 lg:pb-36 lg:pt-28">
      {/* Animated background orbs */}
      <div className="pointer-events-none absolute -left-40 -top-20 h-[600px] w-[600px] rounded-full bg-teal/6 blur-[160px] animate-pulse-glow" />
      <div className="pointer-events-none absolute -right-40 top-40 h-[500px] w-[500px] rounded-full bg-coral/5 blur-[140px] animate-pulse-glow" style={{ animationDelay: "1.5s" }} />
      <div className="pointer-events-none absolute bottom-0 left-1/3 h-[400px] w-[400px] rounded-full bg-mint/4 blur-[120px] animate-pulse-glow" style={{ animationDelay: "3s" }} />

      {/* Floating geometric shapes */}
      <div className="pointer-events-none absolute left-[10%] top-[15%] h-3 w-3 rounded-full bg-teal/30 animate-float" style={{ animationDelay: "0s" }} />
      <div className="pointer-events-none absolute right-[15%] top-[25%] h-2 w-2 rounded-full bg-coral/40 animate-float" style={{ animationDelay: "1s" }} />
      <div className="pointer-events-none absolute left-[20%] bottom-[25%] h-4 w-4 rounded-sm bg-mint/20 rotate-45 animate-float-slow" style={{ animationDelay: "2s" }} />
      <div className="pointer-events-none absolute right-[25%] bottom-[30%] h-2.5 w-2.5 rounded-full bg-rose/25 animate-float" style={{ animationDelay: "0.5s" }} />
      <div className="pointer-events-none absolute left-[40%] top-[10%] h-2 w-2 rounded-sm bg-teal-light/20 rotate-12 animate-float-slow" style={{ animationDelay: "1.5s" }} />

      {/* Rotating ring decoration */}
      <div className="pointer-events-none absolute right-[5%] top-[20%] hidden lg:block">
        <div className="h-24 w-24 rounded-full border border-dashed border-teal/10 animate-spin-slow" />
      </div>
      <div className="pointer-events-none absolute left-[8%] bottom-[20%] hidden lg:block">
        <div className="h-16 w-16 rounded-full border border-dashed border-coral/10 animate-spin-slow" style={{ animationDirection: "reverse" }} />
      </div>

      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          {/* Animated badge */}
          <div
            className={`mb-8 inline-flex items-center gap-2 rounded-full border border-teal/20 bg-teal/5 px-5 py-2.5 text-sm backdrop-blur-sm transition-all duration-700 ${
              mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <Sparkles className="h-3.5 w-3.5 text-teal animate-pulse" />
            <span className="text-teal-light font-medium">India&apos;s #1 Influencer Platform</span>
          </div>

          <h1
            className={`text-balance text-4xl font-bold leading-[1.08] tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl transition-all duration-700 delay-100 ${
              mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            Find the Perfect{" "}
            <span
              className={`inline-block transition-all duration-400 ${rotatingColors[wordIndex]} ${
                fade ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-3 scale-95"
              }`}
            >
              {rotatingWords[wordIndex]}
            </span>{" "}
            <br className="hidden sm:block" />
            for Your Brand
          </h1>

          <p
            className={`mx-auto mt-6 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground md:text-lg transition-all duration-700 delay-200 ${
              mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            Connect with 500+ verified Indian influencers across every niche.
            Launch campaigns, track results, and grow your brand with the
            creators your audience already trusts.
          </p>

          <div
            className={`mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row transition-all duration-700 delay-300 ${
              mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            <Link
              href="/directory"
              className="group relative flex w-full items-center justify-center gap-2.5 overflow-hidden rounded-2xl bg-gradient-to-r from-teal to-teal-dark px-8 py-4 text-base font-semibold text-primary-foreground shadow-2xl shadow-teal/20 transition-all duration-300 hover:shadow-teal/40 hover:-translate-y-1 sm:w-auto"
            >
              <span className="relative z-10 flex items-center gap-2.5">
                Browse Influencers
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-teal-light to-teal opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </Link>
            <Link
              href="/campaign"
              className="group flex w-full items-center justify-center gap-2.5 rounded-2xl border border-border/50 bg-secondary/30 px-8 py-4 text-base font-semibold text-foreground backdrop-blur-sm transition-all duration-300 hover:border-coral/30 hover:bg-secondary/60 hover:-translate-y-1 hover:shadow-lg hover:shadow-coral/10 sm:w-auto"
            >
              <Play className="h-4 w-4 text-coral transition-transform duration-300 group-hover:scale-110" />
              Post a Campaign
            </Link>
          </div>

          {/* Social proof */}
          <div
            className={`mt-16 flex flex-col items-center gap-5 sm:flex-row sm:justify-center sm:gap-8 transition-all duration-700 delay-500 ${
              mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            <div className="flex -space-x-2.5">
              {[
                { bg: "bg-gradient-to-br from-teal to-teal-dark", letter: "A" },
                { bg: "bg-gradient-to-br from-coral to-coral-dark", letter: "B" },
                { bg: "bg-gradient-to-br from-mint to-[#059669]", letter: "C" },
                { bg: "bg-gradient-to-br from-rose to-[#E11D48]", letter: "D" },
                { bg: "bg-gradient-to-br from-[#8B5CF6] to-[#7C3AED]", letter: "E" },
              ].map((item, i) => (
                <div
                  key={i}
                  className={`flex h-10 w-10 items-center justify-center rounded-full border-2 border-background text-xs font-bold text-foreground ${item.bg} transition-transform duration-300 hover:scale-110 hover:-translate-y-1`}
                >
                  {item.letter}
                </div>
              ))}
            </div>
            <div className="text-sm text-muted-foreground">
              <span className="font-semibold text-foreground">1,200+</span> brands already growing with Synapse
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
