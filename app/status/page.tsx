"use client"

import { useState, useMemo } from "react"
import { sampleRequests } from "@/lib/data"
import {
  LayoutDashboard,
  Clock,
  CheckCircle2,
  XCircle,
  Inbox,
  CalendarDays,
  IndianRupee,
  User,
  Megaphone,
  Building2,
} from "lucide-react"

const statusConfig = {
  Accepted: {
    color: "bg-[#10B981]/10 text-[#10B981] border-[#10B981]/20",
    dotColor: "bg-[#10B981]",
    icon: CheckCircle2,
  },
  Pending: {
    color: "bg-[#F59E0B]/10 text-[#F59E0B] border-[#F59E0B]/20",
    dotColor: "bg-[#F59E0B]",
    icon: Clock,
  },
  Declined: {
    color: "bg-[#EF4444]/10 text-[#EF4444] border-[#EF4444]/20",
    dotColor: "bg-[#EF4444]",
    icon: XCircle,
  },
}

type FilterStatus = "All" | "Pending" | "Accepted" | "Declined"

export default function StatusPage() {
  const [activeFilter, setActiveFilter] = useState<FilterStatus>("All")

  const counts = useMemo(() => ({
    All: sampleRequests.length,
    Pending: sampleRequests.filter((r) => r.status === "Pending").length,
    Accepted: sampleRequests.filter((r) => r.status === "Accepted").length,
    Declined: sampleRequests.filter((r) => r.status === "Declined").length,
  }), [])

  const filtered = useMemo(() => {
    if (activeFilter === "All") return sampleRequests
    return sampleRequests.filter((r) => r.status === activeFilter)
  }, [activeFilter])

  const summaryCards: {
    label: FilterStatus
    count: number
    icon: typeof Inbox
    color: string
    activeColor: string
  }[] = [
    { label: "All", count: counts.All, icon: Inbox, color: "text-brand", activeColor: "border-brand/30 bg-brand/10" },
    { label: "Pending", count: counts.Pending, icon: Clock, color: "text-[#F59E0B]", activeColor: "border-[#F59E0B]/30 bg-[#F59E0B]/10" },
    { label: "Accepted", count: counts.Accepted, icon: CheckCircle2, color: "text-[#10B981]", activeColor: "border-[#10B981]/30 bg-[#10B981]/10" },
    { label: "Declined", count: counts.Declined, icon: XCircle, color: "text-[#EF4444]", activeColor: "border-[#EF4444]/30 bg-[#EF4444]/10" },
  ]

  return (
    <div className="min-h-screen py-10 lg:py-16">
      <div className="mx-auto max-w-5xl px-5 lg:px-8">
        {/* Header */}
        <div className="mb-10">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-brand/10 text-brand">
            <LayoutDashboard className="h-5 w-5" />
          </div>
          <h1 className="text-3xl font-bold text-foreground md:text-4xl">
            Request Dashboard
          </h1>
          <p className="mt-2 text-base text-muted-foreground">
            Track all your collaboration requests in one place
          </p>
        </div>

        {/* Summary Cards */}
        <div className="mb-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {summaryCards.map((card) => (
            <button
              key={card.label}
              onClick={() => setActiveFilter(card.label)}
              className={`group rounded-2xl border p-5 text-left transition-all hover:-translate-y-0.5 ${
                activeFilter === card.label
                  ? card.activeColor
                  : "border-border/40 bg-card/50 hover:border-brand/20"
              }`}
            >
              <div className="flex items-center justify-between">
                <card.icon className={`h-5 w-5 ${card.color}`} />
                <span className={`text-2xl font-bold ${card.color}`}>{card.count}</span>
              </div>
              <p className="mt-2 text-sm font-medium text-muted-foreground">
                {card.label} Requests
              </p>
            </button>
          ))}
        </div>

        {/* Request List */}
        <div className="flex flex-col gap-4">
          {filtered.length > 0 ? (
            filtered.map((req) => {
              const config = statusConfig[req.status]
              return (
                <div
                  key={req.id}
                  className="group rounded-2xl border border-border/40 bg-card/50 p-5 transition-all hover:border-brand/20 hover:bg-card hover:shadow-lg hover:shadow-brand/5 md:p-6"
                >
                  <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <Megaphone className="h-5 w-5 text-brand" />
                        <h3 className="font-bold text-foreground">{req.campaignName}</h3>
                        <span className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold ${config.color}`}>
                          <span className={`h-1.5 w-1.5 rounded-full ${config.dotColor}`} />
                          {req.status}
                        </span>
                      </div>

                      <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1.5">
                          <Building2 className="h-3.5 w-3.5" />
                          {req.brand}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <User className="h-3.5 w-3.5" />
                          {req.influencer}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <IndianRupee className="h-3.5 w-3.5" />
                          {req.budget}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <CalendarDays className="h-3.5 w-3.5" />
                          {new Date(req.date).toLocaleDateString("en-IN", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })
          ) : (
            <div className="flex flex-col items-center justify-center rounded-2xl border border-border/40 bg-card/50 py-16 text-center">
              <Inbox className="mb-4 h-10 w-10 text-muted-foreground/30" />
              <h3 className="text-lg font-bold text-foreground">No Requests Found</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                No {activeFilter.toLowerCase()} requests to display
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
