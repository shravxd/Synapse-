"use client"

import { useState, useMemo } from "react"
import { influencers, niches, platforms, followerRanges, type Influencer } from "@/lib/data"
import { InfluencerCard } from "@/components/directory/influencer-card"
import { CollaborationModal } from "@/components/directory/collaboration-modal"
import { Search, SlidersHorizontal, X } from "lucide-react"

export default function DirectoryPage() {
  const [search, setSearch] = useState("")
  const [activeNiche, setActiveNiche] = useState("All")
  const [activePlatform, setActivePlatform] = useState("All")
  const [activeRange, setActiveRange] = useState("All")
  const [selectedInfluencer, setSelectedInfluencer] = useState<Influencer | null>(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [showFilters, setShowFilters] = useState(false)

  const filtered = useMemo(() => {
    return influencers.filter((inf) => {
      const matchesSearch =
        inf.name.toLowerCase().includes(search.toLowerCase()) ||
        inf.niche.toLowerCase().includes(search.toLowerCase()) ||
        inf.location.toLowerCase().includes(search.toLowerCase()) ||
        inf.platform.toLowerCase().includes(search.toLowerCase())

      const matchesNiche = activeNiche === "All" || inf.niche === activeNiche
      const matchesPlatform = activePlatform === "All" || inf.platform === activePlatform

      const range = followerRanges.find((r) => r.label === activeRange) || followerRanges[0]
      const matchesRange =
        activeRange === "All" || (inf.followersNum >= range.min && inf.followersNum < range.max)

      return matchesSearch && matchesNiche && matchesPlatform && matchesRange
    })
  }, [search, activeNiche, activePlatform, activeRange])

  const activeFilters = [activeNiche, activePlatform, activeRange].filter((f) => f !== "All").length

  return (
    <div className="min-h-screen py-10 lg:py-16">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        {/* Header */}
        <div className="mb-10">
          <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-brand">Directory</p>
          <h1 className="text-3xl font-bold text-foreground md:text-4xl lg:text-5xl">
            Influencer Directory
          </h1>
          <p className="mt-3 max-w-xl text-base text-muted-foreground">
            Discover and connect with the right creators for your brand
          </p>
        </div>

        {/* Search + Filter Toggle */}
        <div className="mb-6 flex gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 h-4.5 w-4.5 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, niche, platform, or city..."
              className="w-full rounded-2xl border border-border/40 bg-card/50 py-3.5 pl-11 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-brand/50 focus:outline-none focus:ring-2 focus:ring-brand/10"
            />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-2 rounded-2xl border px-5 py-3.5 text-sm font-medium transition-all ${
              showFilters || activeFilters > 0
                ? "border-brand/30 bg-brand/10 text-brand"
                : "border-border/40 bg-card/50 text-muted-foreground hover:text-foreground"
            }`}
          >
            <SlidersHorizontal className="h-4 w-4" />
            <span className="hidden sm:inline">Filters</span>
            {activeFilters > 0 && (
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-brand text-[10px] font-bold text-primary-foreground">
                {activeFilters}
              </span>
            )}
          </button>
        </div>

        {/* Filters Panel */}
        {showFilters && (
          <div className="mb-8 rounded-2xl border border-border/40 bg-card/50 p-6">
            <div className="flex flex-col gap-6">
              <div>
                <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Niche</p>
                <div className="flex flex-wrap gap-2">
                  {niches.map((niche) => (
                    <button
                      key={niche}
                      onClick={() => setActiveNiche(niche)}
                      className={`rounded-xl px-4 py-2 text-sm font-medium transition-all ${
                        activeNiche === niche
                          ? "bg-brand text-primary-foreground shadow-md shadow-brand/20"
                          : "border border-border/40 bg-secondary/30 text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {niche}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Platform</p>
                <div className="flex flex-wrap gap-2">
                  {platforms.map((platform) => (
                    <button
                      key={platform}
                      onClick={() => setActivePlatform(platform)}
                      className={`rounded-xl px-4 py-2 text-sm font-medium transition-all ${
                        activePlatform === platform
                          ? "bg-brand text-primary-foreground shadow-md shadow-brand/20"
                          : "border border-border/40 bg-secondary/30 text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {platform}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Followers</p>
                <div className="flex flex-wrap gap-2">
                  {followerRanges.map((range) => (
                    <button
                      key={range.label}
                      onClick={() => setActiveRange(range.label)}
                      className={`rounded-xl px-4 py-2 text-sm font-medium transition-all ${
                        activeRange === range.label
                          ? "bg-brand text-primary-foreground shadow-md shadow-brand/20"
                          : "border border-border/40 bg-secondary/30 text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {range.label}
                    </button>
                  ))}
                </div>
              </div>

              {activeFilters > 0 && (
                <button
                  onClick={() => {
                    setActiveNiche("All")
                    setActivePlatform("All")
                    setActiveRange("All")
                  }}
                  className="flex items-center gap-1.5 self-start text-sm font-medium text-brand hover:text-brand-light"
                >
                  <X className="h-3.5 w-3.5" />
                  Clear all filters
                </button>
              )}
            </div>
          </div>
        )}

        {/* Results count */}
        <p className="mb-6 text-sm text-muted-foreground">
          Showing <span className="font-semibold text-foreground">{filtered.length}</span>{" "}
          influencer{filtered.length !== 1 ? "s" : ""}
        </p>

        {/* Grid */}
        {filtered.length > 0 ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((inf) => (
              <InfluencerCard
                key={inf.id}
                influencer={inf}
                onRequestCollab={() => {
                  setSelectedInfluencer(inf)
                  setModalOpen(true)
                }}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-border/40 bg-card/50 py-20 text-center">
            <Search className="mb-4 h-10 w-10 text-muted-foreground/30" />
            <h3 className="text-lg font-bold text-foreground">No influencers found</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}
      </div>

      <CollaborationModal
        influencer={selectedInfluencer}
        open={modalOpen}
        onClose={() => {
          setModalOpen(false)
          setSelectedInfluencer(null)
        }}
      />
    </div>
  )
}
