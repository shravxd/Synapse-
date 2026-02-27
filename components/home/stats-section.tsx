"use client"

import { useEffect, useState, useRef } from "react"
import { useAnimateOnScroll } from "@/hooks/use-animate-on-scroll"

const stats = [
  { value: 500, suffix: "+", label: "Active Influencers", prefix: "", color: "text-teal" },
  { value: 1200, suffix: "+", label: "Brands Onboarded", prefix: "", color: "text-coral" },
  { value: 5, suffix: "Cr+", label: "Campaign Value", prefix: "\u20B9", color: "text-mint" },
  { value: 92, suffix: "%", label: "Success Rate", prefix: "", color: "text-rose" },
]

function AnimatedNumber({ value, prefix, suffix, color }: { value: number; prefix: string; suffix: string; color: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const hasAnimated = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true
          const duration = 2000
          const steps = 60
          const increment = value / steps
          let current = 0
          const timer = setInterval(() => {
            current += increment
            if (current >= value) {
              setCount(value)
              clearInterval(timer)
            } else {
              setCount(Math.floor(current))
            }
          }, duration / steps)
        }
      },
      { threshold: 0.3 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [value])

  return (
    <div ref={ref} className={`text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl ${color}`}>
      {prefix}{count.toLocaleString()}{suffix}
    </div>
  )
}

export function StatsSection() {
  const { ref, isVisible } = useAnimateOnScroll()

  return (
    <section className="relative py-20 lg:py-24" ref={ref}>
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl border border-border/30 bg-gradient-to-br from-card via-card to-secondary/30 p-8 backdrop-blur-sm md:p-12">
          {/* Decorative gradient strip */}
          <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-teal via-coral to-mint" />

          <div className="grid grid-cols-2 gap-8 lg:grid-cols-4 lg:gap-0 lg:divide-x lg:divide-border/30">
            {stats.map((stat, i) => (
              <div
                key={stat.label}
                className={`flex flex-col items-center gap-2 text-center lg:px-8 transition-all duration-700 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${i * 150}ms` }}
              >
                <AnimatedNumber value={stat.value} prefix={stat.prefix} suffix={stat.suffix} color={stat.color} />
                <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
