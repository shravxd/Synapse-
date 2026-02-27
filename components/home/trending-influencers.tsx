"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { influencers } from "@/lib/data"
import { useAnimateOnScroll } from "@/hooks/use-animate-on-scroll"
import { BadgeCheck, MapPin, TrendingUp, ArrowUpRight, Crown } from "lucide-react"

const platformTabs = [
  { label: "All Platforms", value: "All" },
  { label: "Instagram", value: "Instagram", color: "#E4405F" },
  { label: "YouTube", value: "YouTube", color: "#FF0000" },
  { label: "TikTok", value: "TikTok", color: "#00F2EA" },
  { label: "Facebook", value: "Facebook", color: "#1877F2" },
]

export function TrendingInfluencers() {
  const [activePlatform, setActivePlatform] = useState("All")
  const { ref: headerRef, isVisible: headerVisible } = useAnimateOnScroll()
  const { ref: gridRef, isVisible: gridVisible } = useAnimateOnScroll(0.05)

  const trending = influencers.filter((inf) => {
    const isTrending = inf.trending
    const matchesPlatform = activePlatform === "All" || inf.platform === activePlatform
    return isTrending && matchesPlatform
  })

  return (
    <section className="relative border-t border-border/30 py-20 lg:py-28 overflow-hidden">
      {/* Decorative orb */}
      <div className="pointer-events-none absolute -left-32 top-1/3 h-[400px] w-[400px] rounded-full bg-coral/3 blur-[120px]" />

      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div
          ref={headerRef}
          className={`mb-12 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end transition-all duration-700 ${headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
        >
          <div>
            <p className="mb-3 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-coral">
              <span className="h-1 w-6 rounded-full bg-gradient-to-r from-coral to-coral-light" />
              Trending
            </p>
            <h2 className="text-balance text-3xl font-bold text-foreground md:text-4xl lg:text-5xl">
              Most trending influencers
            </h2>
            <p className="mt-4 max-w-xl text-base text-muted-foreground">
              Discover the hottest creators across Instagram, YouTube, TikTok, and Facebook.
            </p>
          </div>
          <Link
            href="/directory"
            className="group flex shrink-0 items-center gap-2 text-sm font-semibold text-coral transition-colors hover:text-coral-light"
          >
            View All
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </div>

        {/* Platform Tabs */}
        <div className="mb-10 flex flex-wrap gap-2">
          {platformTabs.map((tab) => (
            <button
              key={tab.value}
              onClick={() => setActivePlatform(tab.value)}
              className={`flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-medium transition-all duration-300 ${activePlatform === tab.value
                  ? "bg-gradient-to-r from-coral to-coral-dark text-foreground shadow-lg shadow-coral/20"
                  : "border border-border/30 bg-card/30 text-muted-foreground hover:border-coral/20 hover:text-foreground"
                }`}
            >
              {tab.color && (
                <span
                  className="h-2 w-2 rounded-full transition-colors"
                  style={{ backgroundColor: activePlatform === tab.value ? "#fff" : tab.color }}
                />
              )}
              {tab.label}
            </button>
          ))}
        </div>

        {/* Grid */}
        {trending.length > 0 ? (
          <div ref={gridRef} className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {trending.slice(0, 6).map((inf, index) => (
              <div
                key={inf.id}
                className={`group relative flex flex-col rounded-2xl border border-border/30 bg-card/40 p-6 transition-all duration-500 hover:border-transparent hover:bg-card hover:shadow-2xl hover:-translate-y-2 ${gridVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-10 scale-95"
                  }`}
                style={{ transitionDelay: gridVisible ? `${index * 100}ms` : "0ms" }}
              >
                {/* Rank badge for top 3 */}
                {index < 3 && (
                  <div className="absolute -right-2 -top-2 z-10">
                    <div className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold text-foreground shadow-lg ${index === 0 ? "bg-gradient-to-br from-[#FFD700] to-[#FFA500] shadow-[#FFD700]/30" :
                        index === 1 ? "bg-gradient-to-br from-[#C0C0C0] to-[#A0A0A0] shadow-[#C0C0C0]/30" :
                          "bg-gradient-to-br from-[#CD7F32] to-[#A0522D] shadow-[#CD7F32]/30"
                      }`}>
                      <Crown className="h-3.5 w-3.5" />
                    </div>
                  </div>
                )}

                <div className="flex items-start gap-4">
                  <div className="relative">
                    <div
                      className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl text-base font-bold text-foreground transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg overflow-hidden"
                      style={{ backgroundColor: inf.avatarBg }}
                    >
                      {inf.profileImage ? (
                        <Image
                          src={inf.profileImage}
                          alt={inf.name}
                          fill
                          className="object-cover"
                          sizes="56px"
                          unoptimized
                        />
                      ) : (
                        inf.avatar
                      )}
                    </div>
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5">
                      <h3 className="truncate text-base font-bold text-foreground">{inf.name}</h3>
                      {inf.verified && (
                        <BadgeCheck className="h-4 w-4 shrink-0 text-teal" />
                      )}
                    </div>
                    <div className="mt-1.5 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                      <span
                        className="rounded-md px-2 py-0.5 font-medium"
                        style={{
                          backgroundColor: `${inf.avatarBg}15`,
                          color: inf.avatarBg,
                        }}
                      >
                        {inf.niche}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {inf.location}
                      </span>
                    </div>
                  </div>
                </div>

                <p className="mt-4 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                  {inf.bio}
                </p>

                <div className="mt-auto flex items-center gap-4 border-t border-border/30 pt-4 mt-5">
                  <div className="flex items-center gap-1.5">
                    <span className="text-sm font-bold text-foreground">{inf.followers}</span>
                    <span className="text-xs text-muted-foreground">followers</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-teal">
                    <TrendingUp className="h-3.5 w-3.5" />
                    <span className="text-sm font-bold">{inf.engagement}</span>
                  </div>
                  <span className="ml-auto rounded-lg border border-border/30 bg-secondary/30 px-2.5 py-1 text-xs font-medium text-muted-foreground transition-colors group-hover:border-coral/20 group-hover:text-coral">
                    {inf.platform}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-border/30 bg-card/30 py-16 text-center">
            <TrendingUp className="mb-3 h-10 w-10 text-muted-foreground/30" />
            <h3 className="text-lg font-bold text-foreground">No trending influencers</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              No trending creators found for this platform yet.
            </p>
          </div>
        )}
      </div>
    </section>
  )
}
