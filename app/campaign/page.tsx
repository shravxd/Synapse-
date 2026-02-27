"use client"

import { useState } from "react"
import Link from "next/link"
import {
  Megaphone,
  CheckCircle2,
  ArrowRight,
  Target,
  IndianRupee,
  Calendar,
  Users,
  FileText,
  Lightbulb,
} from "lucide-react"
import { supabase } from "@/lib/supabase"

export default function CampaignPage() {
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({
    title: "",
    brandName: "",
    targetNiche: "",
    budget: "",
    timeline: "",
    goal: "",
    deliverables: "",
    targetAudience: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!supabase) {
      // If no credentials, just show success (demo mode)
      setSubmitted(true)
      return
    }

    setIsSubmitting(true)
    setError(null)

    try {
      const { error: submitError } = await supabase
        .from('campaigns')
        .insert([{
          title: form.title,
          brand_name: form.brandName,
          target_niche: form.targetNiche,
          budget: form.budget,
          timeline: form.timeline,
          goal: form.goal,
          deliverables: form.deliverables,
          target_audience: form.targetAudience
        }])

      if (submitError) throw submitError

      setSubmitted(true)
    } catch (err: any) {
      console.error("Error creating campaign:", err)
      setError(err.message || "Failed to create campaign. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const inputClass = "w-full rounded-xl border border-border/40 bg-input/50 px-4 py-3.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-brand/50 focus:outline-none focus:ring-2 focus:ring-brand/10"

  if (submitted) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center px-5">
        <div className="mx-auto max-w-md text-center">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-[#10B981]/10">
            <CheckCircle2 className="h-10 w-10 text-[#10B981]" />
          </div>
          <h2 className="text-2xl font-bold text-foreground md:text-3xl">
            Campaign Created!
          </h2>
          <p className="mt-3 text-muted-foreground">
            Your campaign{" "}
            <span className="font-semibold text-foreground">
              &quot;{form.title}&quot;
            </span>{" "}
            has been published. Start finding the perfect influencers to collaborate with.
          </p>
          <Link
            href="/directory"
            className="mt-8 inline-flex items-center gap-2 rounded-2xl bg-brand px-8 py-4 text-sm font-semibold text-primary-foreground shadow-2xl shadow-brand/20 transition-all hover:shadow-brand/30 hover:-translate-y-0.5"
          >
            Browse Influencers
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-10 lg:py-16">
      <div className="mx-auto max-w-3xl px-5 lg:px-8">
        {/* Header */}
        <div className="mb-10">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-brand/10 text-brand">
            <Megaphone className="h-5 w-5" />
          </div>
          <h1 className="text-3xl font-bold text-foreground md:text-4xl">
            Create a Campaign
          </h1>
          <p className="mt-2 text-base text-muted-foreground">
            Define your campaign to attract the right influencers
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border border-border/40 bg-card/50 p-6 md:p-8"
        >
          <div className="flex flex-col gap-6">
            <div>
              <label className="mb-2 flex items-center gap-2 text-sm font-medium text-foreground">
                <FileText className="h-4 w-4 text-brand" />
                Campaign Title
              </label>
              <input
                type="text"
                required
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className={inputClass}
                placeholder="e.g., Summer Product Launch 2026"
              />
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <label className="mb-2 flex items-center gap-2 text-sm font-medium text-foreground">
                  <Users className="h-4 w-4 text-brand" />
                  Brand Name
                </label>
                <input
                  type="text"
                  required
                  value={form.brandName}
                  onChange={(e) => setForm({ ...form, brandName: e.target.value })}
                  className={inputClass}
                  placeholder="Your brand name"
                />
              </div>
              <div>
                <label className="mb-2 flex items-center gap-2 text-sm font-medium text-foreground">
                  <Target className="h-4 w-4 text-brand" />
                  Target Niche
                </label>
                <select
                  required
                  value={form.targetNiche}
                  onChange={(e) => setForm({ ...form, targetNiche: e.target.value })}
                  className={inputClass}
                >
                  <option value="">Select niche...</option>
                  {["Tech", "Beauty", "Fitness", "Food", "Travel", "Fashion", "Wellness", "Finance"].map((n) => (
                    <option key={n} value={n}>{n}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <label className="mb-2 flex items-center gap-2 text-sm font-medium text-foreground">
                  <IndianRupee className="h-4 w-4 text-brand" />
                  {"Total Budget (\u20B9)"}
                </label>
                <input
                  type="text"
                  required
                  value={form.budget}
                  onChange={(e) => setForm({ ...form, budget: e.target.value })}
                  className={inputClass}
                  placeholder="e.g., 1,00,000"
                />
              </div>
              <div>
                <label className="mb-2 flex items-center gap-2 text-sm font-medium text-foreground">
                  <Calendar className="h-4 w-4 text-brand" />
                  Timeline
                </label>
                <input
                  type="text"
                  required
                  value={form.timeline}
                  onChange={(e) => setForm({ ...form, timeline: e.target.value })}
                  className={inputClass}
                  placeholder="e.g., March - April 2026"
                />
              </div>
            </div>

            <div>
              <label className="mb-2 flex items-center gap-2 text-sm font-medium text-foreground">
                <Lightbulb className="h-4 w-4 text-brand" />
                Campaign Goal
              </label>
              <textarea
                required
                rows={3}
                value={form.goal}
                onChange={(e) => setForm({ ...form, goal: e.target.value })}
                className={`${inputClass} resize-none`}
                placeholder="What do you want to achieve with this campaign?"
              />
            </div>

            <div>
              <label className="mb-2 flex items-center gap-2 text-sm font-medium text-foreground">
                <FileText className="h-4 w-4 text-brand" />
                Deliverables Expected
              </label>
              <textarea
                required
                rows={3}
                value={form.deliverables}
                onChange={(e) => setForm({ ...form, deliverables: e.target.value })}
                className={`${inputClass} resize-none`}
                placeholder="e.g., 2 Instagram reels, 3 stories, 1 YouTube video"
              />
            </div>

            <div>
              <label className="mb-2 flex items-center gap-2 text-sm font-medium text-foreground">
                <Users className="h-4 w-4 text-brand" />
                Target Audience
              </label>
              <input
                type="text"
                required
                value={form.targetAudience}
                onChange={(e) => setForm({ ...form, targetAudience: e.target.value })}
                className={inputClass}
                placeholder="e.g., 18-35 year olds in metro cities"
              />
            </div>

            {error && (
              <div className="rounded-xl bg-red-500/10 p-4 text-sm text-red-500 border border-red-500/20">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-2 w-full rounded-2xl bg-brand py-4 text-base font-semibold text-primary-foreground shadow-2xl shadow-brand/20 transition-all hover:shadow-brand/30 hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Publishing..." : "Publish Campaign"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
