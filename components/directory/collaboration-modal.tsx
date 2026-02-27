"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import type { Influencer } from "@/lib/data"
import { X, BadgeCheck, CheckCircle2, MapPin } from "lucide-react"

interface CollaborationModalProps {
  influencer: Influencer | null
  open: boolean
  onClose: () => void
}

export function CollaborationModal({ influencer, open, onClose }: CollaborationModalProps) {
  const router = useRouter()
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({
    brandName: "",
    email: "",
    campaignName: "",
    budget: "",
    campaignType: "",
    message: "",
  })

  if (!open || !influencer) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => {
      onClose()
      setSubmitted(false)
      setForm({ brandName: "", email: "", campaignName: "", budget: "", campaignType: "", message: "" })
      router.push("/status")
    }, 2000)
  }

  const inputClass = "w-full rounded-xl border border-border/40 bg-input/50 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-brand/50 focus:outline-none focus:ring-2 focus:ring-brand/10"

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={onClose} />

      <div className="relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl border border-border/40 bg-card p-6 shadow-2xl md:p-8">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-lg p-1.5 text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
          aria-label="Close modal"
        >
          <X className="h-5 w-5" />
        </button>

        {submitted ? (
          <div className="flex flex-col items-center py-10 text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#10B981]/10">
              <CheckCircle2 className="h-8 w-8 text-[#10B981]" />
            </div>
            <h3 className="text-xl font-bold text-foreground">Request Sent!</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Your collaboration request has been sent to{" "}
              <span className="font-semibold text-foreground">{influencer.name}</span>.
              Redirecting to dashboard...
            </p>
          </div>
        ) : (
          <>
            {/* Influencer Info */}
            <div className="mb-6 flex items-center gap-4 border-b border-border/40 pb-6">
              <div
                className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl text-base font-bold text-primary-foreground overflow-hidden"
                style={{ backgroundColor: influencer.avatarBg }}
              >
                {influencer.profileImage ? (
                  <Image
                    src={influencer.profileImage}
                    alt={influencer.name}
                    fill
                    className="object-cover"
                    sizes="56px"
                    unoptimized
                  />
                ) : (
                  influencer.avatar
                )}
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="font-bold text-foreground">{influencer.name}</h3>
                  {influencer.verified && <BadgeCheck className="h-4 w-4 text-brand" />}
                </div>
                <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
                  <span className="rounded-md bg-brand/10 px-2 py-0.5 font-medium text-brand">
                    {influencer.niche}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    {influencer.location}
                  </span>
                  <span>{influencer.followers} followers</span>
                </div>
              </div>
            </div>

            <h3 className="mb-4 text-lg font-bold text-foreground">Send Collaboration Request</h3>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-foreground">Brand Name</label>
                  <input type="text" required value={form.brandName} onChange={(e) => setForm({ ...form, brandName: e.target.value })} className={inputClass} placeholder="Your brand name" />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-foreground">Email</label>
                  <input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className={inputClass} placeholder="you@brand.com" />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-foreground">Campaign Name</label>
                  <input type="text" required value={form.campaignName} onChange={(e) => setForm({ ...form, campaignName: e.target.value })} className={inputClass} placeholder="Campaign name" />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-foreground">{"\u20B9 Budget"}</label>
                  <input type="text" required value={form.budget} onChange={(e) => setForm({ ...form, budget: e.target.value })} className={inputClass} placeholder="e.g., 50,000" />
                </div>
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-foreground">Campaign Type</label>
                <select
                  required
                  value={form.campaignType}
                  onChange={(e) => setForm({ ...form, campaignType: e.target.value })}
                  className={inputClass}
                >
                  <option value="">Select type...</option>
                  <option value="sponsored">Sponsored Post</option>
                  <option value="review">Product Review</option>
                  <option value="unboxing">Unboxing Video</option>
                  <option value="giveaway">Giveaway</option>
                  <option value="ambassador">Brand Ambassador</option>
                  <option value="story">Story / Reel</option>
                </select>
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-foreground">Message</label>
                <textarea
                  required
                  rows={3}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className={`${inputClass} resize-none`}
                  placeholder="Tell the influencer about your campaign..."
                />
              </div>

              <button
                type="submit"
                className="mt-2 w-full rounded-xl bg-brand py-3.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-brand/15 transition-all hover:shadow-brand/25 hover:-translate-y-0.5"
              >
                Send Request
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  )
}
