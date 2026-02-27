"use client"

import { useState } from "react"
import Link from "next/link"
import {
    Building2,
    Globe,
    Mail,
    Phone,
    FileText,
    Target,
    Handshake,
    CheckCircle2,
    ArrowRight,
    ArrowLeft,
    Sparkles,
    IndianRupee,
    Users,
    CalendarClock,
    ClipboardList,
    MonitorSmartphone,
    ChevronRight,
} from "lucide-react"

import { supabase } from "@/lib/supabase"

const industries = [
    "Fashion", "Tech", "Beauty", "Food", "Fitness",
    "Travel", "Wellness", "Finance", "Education", "Entertainment",
    "Home & Lifestyle", "Automotive", "Healthcare", "Gaming",
]

const collabTypes = [
    { id: "sponsored", label: "Sponsored Posts", icon: "📢" },
    { id: "reviews", label: "Product Reviews", icon: "⭐" },
    { id: "ambassador", label: "Brand Ambassador", icon: "🤝" },
    { id: "giveaways", label: "Giveaways & Contests", icon: "🎁" },
    { id: "events", label: "Event Appearances", icon: "🎤" },
    { id: "affiliate", label: "Affiliate Marketing", icon: "💰" },
    { id: "ugc", label: "Content Creation (UGC)", icon: "🎬" },
    { id: "takeover", label: "Story/Reel Takeover", icon: "📱" },
]

const platformOptions = [
    { id: "instagram", label: "Instagram", color: "from-pink-500 to-purple-500" },
    { id: "youtube", label: "YouTube", color: "from-red-500 to-red-600" },
    { id: "twitter", label: "Twitter / X", color: "from-zinc-400 to-zinc-600" },
    { id: "linkedin", label: "LinkedIn", color: "from-blue-500 to-blue-700" },
    { id: "snapchat", label: "Snapchat", color: "from-yellow-400 to-yellow-500" },
]

const budgetRanges = [
    "₹5,000 – ₹25,000",
    "₹25,000 – ₹1,00,000",
    "₹1,00,000 – ₹5,00,000",
    "₹5,00,000+",
]

const influencerTiers = [
    { id: "nano", label: "Nano", desc: "1K – 10K followers" },
    { id: "micro", label: "Micro", desc: "10K – 100K followers" },
    { id: "macro", label: "Macro", desc: "100K – 1M followers" },
    { id: "mega", label: "Mega", desc: "1M+ followers" },
]

const frequencyOptions = ["One-time", "Monthly", "Quarterly", "Ongoing"]

type FormData = {
    brandName: string
    website: string
    industry: string
    description: string
    email: string
    phone: string
    collabTypes: string[]
    platforms: string[]
    budgetRange: string
    influencerTiers: string[]
    frequency: string
    guidelines: string
}

const initialForm: FormData = {
    brandName: "",
    website: "",
    industry: "",
    description: "",
    email: "",
    phone: "",
    collabTypes: [],
    platforms: [],
    budgetRange: "",
    influencerTiers: [],
    frequency: "",
    guidelines: "",
}

export default function RegisterPage() {
    const [step, setStep] = useState(1)
    const [form, setForm] = useState<FormData>(initialForm)
    const [submitted, setSubmitted] = useState(false)

    const inputClass =
        "w-full rounded-xl border border-border/40 bg-input/50 px-4 py-3.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-teal/50 focus:outline-none focus:ring-2 focus:ring-teal/10 transition-all duration-200"

    const toggleArrayItem = (key: keyof FormData, value: string) => {
        const arr = form[key] as string[]
        setForm({
            ...form,
            [key]: arr.includes(value)
                ? arr.filter((v) => v !== value)
                : [...arr, value],
        })
    }

    const [isSubmitting, setIsSubmitting] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const handleSubmit = async () => {
        if (!supabase) {
            // If no credentials, just show success (demo mode)
            setSubmitted(true)
            return
        }

        setIsSubmitting(true)
        setError(null)

        try {
            const { error: submitError } = await supabase
                .from('brand_registrations')
                .insert([{
                    brand_name: form.brandName,
                    website: form.website,
                    industry: form.industry,
                    description: form.description,
                    email: form.email,
                    phone: form.phone,
                    collab_types: form.collabTypes,
                    platforms: form.platforms,
                    budget_range: form.budgetRange,
                    influencer_tiers: form.influencerTiers,
                    frequency: form.frequency,
                    guidelines: form.guidelines
                }])

            if (submitError) throw submitError

            setSubmitted(true)
        } catch (err: any) {
            console.error("Error submitting form:", err)
            setError(err.message || "Something went wrong. Please try again.")
        } finally {
            setIsSubmitting(false)
        }
    }

    const canAdvance = () => {
        if (step === 1) {
            return form.brandName && form.industry && form.email
        }
        if (step === 2) {
            return form.collabTypes.length > 0 && form.platforms.length > 0 && form.budgetRange
        }
        return true
    }

    // ─── SUCCESS SCREEN ────────────────────────────────────────────────
    if (submitted) {
        return (
            <div className="flex min-h-[80vh] items-center justify-center px-5">
                <div className="mx-auto max-w-lg text-center animate-scale-in">
                    {/* Animated success icon */}
                    <div className="relative mx-auto mb-8 flex h-24 w-24 items-center justify-center">
                        <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-mint/20 to-teal/20 animate-pulse-glow" />
                        <div className="relative flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-mint to-teal shadow-2xl shadow-mint/20">
                            <CheckCircle2 className="h-10 w-10 text-white" />
                        </div>
                    </div>

                    <h2 className="text-3xl font-bold text-foreground md:text-4xl">
                        Welcome to <span className="text-teal">Synapse</span>!
                    </h2>
                    <p className="mt-4 text-base text-muted-foreground leading-relaxed">
                        Your brand <span className="font-semibold text-foreground">&quot;{form.brandName}&quot;</span> has been
                        registered successfully. You&apos;re now ready to connect with top Indian influencers
                        and launch impactful campaigns.
                    </p>

                    {/* Quick summary */}
                    <div className="mt-8 rounded-2xl border border-border/40 bg-card/50 p-5 text-left">
                        <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Registration Summary</p>
                        <div className="flex flex-col gap-2 text-sm">
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Industry</span>
                                <span className="font-medium text-foreground">{form.industry}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Collab Types</span>
                                <span className="font-medium text-foreground">{form.collabTypes.length} selected</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Platforms</span>
                                <span className="font-medium text-foreground">{form.platforms.length} selected</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Budget</span>
                                <span className="font-medium text-foreground">{form.budgetRange}</span>
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
                        <Link
                            href="/directory"
                            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-teal to-teal-dark px-8 py-4 text-sm font-semibold text-primary-foreground shadow-2xl shadow-teal/20 transition-all hover:shadow-teal/30 hover:-translate-y-0.5"
                        >
                            Browse Influencers
                            <ArrowRight className="h-4 w-4" />
                        </Link>
                        <Link
                            href="/campaign"
                            className="inline-flex items-center justify-center gap-2 rounded-2xl border border-border/40 bg-card/50 px-8 py-4 text-sm font-semibold text-foreground transition-all hover:bg-secondary/50 hover:-translate-y-0.5"
                        >
                            Post a Campaign
                        </Link>
                    </div>
                </div>
            </div>
        )
    }

    // ─── STEP INDICATOR ────────────────────────────────────────────────
    const steps = [
        { num: 1, label: "Brand Details" },
        { num: 2, label: "Collaboration" },
        { num: 3, label: "Confirm" },
    ]

    return (
        <div className="min-h-screen py-10 lg:py-16">
            <div className="mx-auto max-w-3xl px-5 lg:px-8">
                {/* Header */}
                <div className="mb-8">
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-teal/10 text-teal">
                        <Handshake className="h-5 w-5" />
                    </div>
                    <h1 className="text-3xl font-bold text-foreground md:text-4xl">
                        Register Your Brand
                    </h1>
                    <p className="mt-2 text-base text-muted-foreground">
                        Set up your brand profile and define the collaborations you&apos;re looking for
                    </p>
                </div>

                {/* Step Indicator */}
                <div className="mb-10 flex items-center gap-2">
                    {steps.map((s, i) => (
                        <div key={s.num} className="flex items-center gap-2">
                            <button
                                onClick={() => { if (s.num < step) setStep(s.num) }}
                                className={`flex items-center gap-2.5 rounded-xl px-4 py-2.5 text-sm font-medium transition-all duration-300 ${step === s.num
                                        ? "bg-gradient-to-r from-teal to-teal-dark text-primary-foreground shadow-md shadow-teal/25"
                                        : step > s.num
                                            ? "bg-teal/10 text-teal cursor-pointer hover:bg-teal/15"
                                            : "bg-secondary/30 text-muted-foreground"
                                    }`}
                            >
                                <span className={`flex h-6 w-6 items-center justify-center rounded-lg text-xs font-bold ${step > s.num ? "bg-teal/20" : step === s.num ? "bg-white/20" : "bg-secondary"
                                    }`}>
                                    {step > s.num ? "✓" : s.num}
                                </span>
                                <span className="hidden sm:inline">{s.label}</span>
                            </button>
                            {i < steps.length - 1 && (
                                <ChevronRight className={`h-4 w-4 ${step > s.num ? "text-teal" : "text-muted-foreground/30"}`} />
                            )}
                        </div>
                    ))}
                </div>

                {/* ─── STEP 1: BRAND DETAILS ─────────────────────────────── */}
                {step === 1 && (
                    <div className="animate-slide-up rounded-2xl border border-border/40 bg-card/50 p-6 md:p-8">
                        <div className="mb-6">
                            <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
                                <Building2 className="h-5 w-5 text-teal" />
                                Brand Details
                            </h2>
                            <p className="mt-1 text-sm text-muted-foreground">Tell us about your brand</p>
                        </div>

                        <div className="flex flex-col gap-6">
                            {/* Brand Name */}
                            <div>
                                <label className="mb-2 flex items-center gap-2 text-sm font-medium text-foreground">
                                    <Building2 className="h-4 w-4 text-teal" />
                                    Brand Name <span className="text-coral">*</span>
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={form.brandName}
                                    onChange={(e) => setForm({ ...form, brandName: e.target.value })}
                                    className={inputClass}
                                    placeholder="e.g., Urban Style Co."
                                />
                            </div>

                            {/* Website + Industry */}
                            <div className="grid gap-6 sm:grid-cols-2">
                                <div>
                                    <label className="mb-2 flex items-center gap-2 text-sm font-medium text-foreground">
                                        <Globe className="h-4 w-4 text-teal" />
                                        Website
                                    </label>
                                    <input
                                        type="url"
                                        value={form.website}
                                        onChange={(e) => setForm({ ...form, website: e.target.value })}
                                        className={inputClass}
                                        placeholder="https://yourbrand.com"
                                    />
                                </div>
                                <div>
                                    <label className="mb-2 flex items-center gap-2 text-sm font-medium text-foreground">
                                        <Target className="h-4 w-4 text-teal" />
                                        Industry <span className="text-coral">*</span>
                                    </label>
                                    <select
                                        required
                                        value={form.industry}
                                        onChange={(e) => setForm({ ...form, industry: e.target.value })}
                                        className={inputClass}
                                    >
                                        <option value="">Select industry...</option>
                                        {industries.map((ind) => (
                                            <option key={ind} value={ind}>{ind}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            {/* Description */}
                            <div>
                                <label className="mb-2 flex items-center gap-2 text-sm font-medium text-foreground">
                                    <FileText className="h-4 w-4 text-teal" />
                                    Brand Description
                                </label>
                                <textarea
                                    rows={3}
                                    value={form.description}
                                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                                    className={`${inputClass} resize-none`}
                                    placeholder="Briefly describe your brand and what you do..."
                                />
                            </div>

                            {/* Email + Phone */}
                            <div className="grid gap-6 sm:grid-cols-2">
                                <div>
                                    <label className="mb-2 flex items-center gap-2 text-sm font-medium text-foreground">
                                        <Mail className="h-4 w-4 text-teal" />
                                        Contact Email <span className="text-coral">*</span>
                                    </label>
                                    <input
                                        type="email"
                                        required
                                        value={form.email}
                                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                                        className={inputClass}
                                        placeholder="brand@example.com"
                                    />
                                </div>
                                <div>
                                    <label className="mb-2 flex items-center gap-2 text-sm font-medium text-foreground">
                                        <Phone className="h-4 w-4 text-teal" />
                                        Contact Phone
                                    </label>
                                    <input
                                        type="tel"
                                        value={form.phone}
                                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                                        className={inputClass}
                                        placeholder="+91 98765 43210"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Next Button */}
                        <div className="mt-8 flex justify-end">
                            <button
                                onClick={() => canAdvance() && setStep(2)}
                                disabled={!canAdvance()}
                                className="group flex items-center gap-2 rounded-2xl bg-gradient-to-r from-teal to-teal-dark px-8 py-3.5 text-sm font-semibold text-primary-foreground shadow-xl shadow-teal/20 transition-all hover:shadow-teal/30 hover:-translate-y-0.5 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                            >
                                Continue
                                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                            </button>
                        </div>
                    </div>
                )}

                {/* ─── STEP 2: COLLABORATION PREFERENCES ─────────────────── */}
                {step === 2 && (
                    <div className="animate-slide-up rounded-2xl border border-border/40 bg-card/50 p-6 md:p-8">
                        <div className="mb-6">
                            <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
                                <Sparkles className="h-5 w-5 text-coral" />
                                Collaboration Preferences
                            </h2>
                            <p className="mt-1 text-sm text-muted-foreground">
                                Define the types of collaborations you&apos;re offering — influencers will see this when browsing
                            </p>
                        </div>

                        <div className="flex flex-col gap-8">
                            {/* Collaboration Types */}
                            <div>
                                <label className="mb-3 flex items-center gap-2 text-sm font-medium text-foreground">
                                    <Handshake className="h-4 w-4 text-coral" />
                                    Collaboration Types <span className="text-coral">*</span>
                                </label>
                                <div className="grid gap-3 sm:grid-cols-2">
                                    {collabTypes.map((ct) => {
                                        const selected = form.collabTypes.includes(ct.id)
                                        return (
                                            <button
                                                key={ct.id}
                                                type="button"
                                                onClick={() => toggleArrayItem("collabTypes", ct.id)}
                                                className={`flex items-center gap-3 rounded-xl border px-4 py-3.5 text-left text-sm font-medium transition-all duration-200 ${selected
                                                        ? "border-coral/40 bg-coral/10 text-foreground shadow-sm shadow-coral/10"
                                                        : "border-border/40 bg-input/30 text-muted-foreground hover:border-border/60 hover:text-foreground"
                                                    }`}
                                            >
                                                <span className="text-lg">{ct.icon}</span>
                                                <span>{ct.label}</span>
                                                {selected && (
                                                    <CheckCircle2 className="ml-auto h-4 w-4 text-coral" />
                                                )}
                                            </button>
                                        )
                                    })}
                                </div>
                            </div>

                            {/* Preferred Platforms */}
                            <div>
                                <label className="mb-3 flex items-center gap-2 text-sm font-medium text-foreground">
                                    <MonitorSmartphone className="h-4 w-4 text-coral" />
                                    Preferred Platforms <span className="text-coral">*</span>
                                </label>
                                <div className="flex flex-wrap gap-3">
                                    {platformOptions.map((pl) => {
                                        const selected = form.platforms.includes(pl.id)
                                        return (
                                            <button
                                                key={pl.id}
                                                type="button"
                                                onClick={() => toggleArrayItem("platforms", pl.id)}
                                                className={`flex items-center gap-2 rounded-xl border px-5 py-3 text-sm font-medium transition-all duration-200 ${selected
                                                        ? "border-teal/40 bg-teal/10 text-foreground shadow-sm shadow-teal/10"
                                                        : "border-border/40 bg-input/30 text-muted-foreground hover:border-border/60 hover:text-foreground"
                                                    }`}
                                            >
                                                <div className={`h-2.5 w-2.5 rounded-full bg-gradient-to-r ${pl.color}`} />
                                                {pl.label}
                                                {selected && <CheckCircle2 className="h-3.5 w-3.5 text-teal" />}
                                            </button>
                                        )
                                    })}
                                </div>
                            </div>

                            {/* Budget + Frequency */}
                            <div className="grid gap-6 sm:grid-cols-2">
                                <div>
                                    <label className="mb-2 flex items-center gap-2 text-sm font-medium text-foreground">
                                        <IndianRupee className="h-4 w-4 text-coral" />
                                        Budget Range <span className="text-coral">*</span>
                                    </label>
                                    <select
                                        value={form.budgetRange}
                                        onChange={(e) => setForm({ ...form, budgetRange: e.target.value })}
                                        className={inputClass}
                                    >
                                        <option value="">Select budget range...</option>
                                        {budgetRanges.map((b) => (
                                            <option key={b} value={b}>{b}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="mb-2 flex items-center gap-2 text-sm font-medium text-foreground">
                                        <CalendarClock className="h-4 w-4 text-coral" />
                                        Campaign Frequency
                                    </label>
                                    <select
                                        value={form.frequency}
                                        onChange={(e) => setForm({ ...form, frequency: e.target.value })}
                                        className={inputClass}
                                    >
                                        <option value="">Select frequency...</option>
                                        {frequencyOptions.map((f) => (
                                            <option key={f} value={f}>{f}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            {/* Influencer Tiers */}
                            <div>
                                <label className="mb-3 flex items-center gap-2 text-sm font-medium text-foreground">
                                    <Users className="h-4 w-4 text-coral" />
                                    Preferred Influencer Tier
                                </label>
                                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                                    {influencerTiers.map((tier) => {
                                        const selected = form.influencerTiers.includes(tier.id)
                                        return (
                                            <button
                                                key={tier.id}
                                                type="button"
                                                onClick={() => toggleArrayItem("influencerTiers", tier.id)}
                                                className={`flex flex-col items-center gap-1 rounded-xl border px-4 py-4 text-center transition-all duration-200 ${selected
                                                        ? "border-teal/40 bg-teal/10 shadow-sm shadow-teal/10"
                                                        : "border-border/40 bg-input/30 hover:border-border/60"
                                                    }`}
                                            >
                                                <span className={`text-sm font-semibold ${selected ? "text-teal" : "text-foreground"}`}>
                                                    {tier.label}
                                                </span>
                                                <span className="text-xs text-muted-foreground">{tier.desc}</span>
                                            </button>
                                        )
                                    })}
                                </div>
                            </div>

                            {/* Content Guidelines */}
                            <div>
                                <label className="mb-2 flex items-center gap-2 text-sm font-medium text-foreground">
                                    <ClipboardList className="h-4 w-4 text-coral" />
                                    Content Guidelines / Notes
                                </label>
                                <textarea
                                    rows={3}
                                    value={form.guidelines}
                                    onChange={(e) => setForm({ ...form, guidelines: e.target.value })}
                                    className={`${inputClass} resize-none`}
                                    placeholder="Any specific requirements, do's and don'ts, or notes for influencers..."
                                />
                            </div>
                        </div>

                        {/* Navigation */}
                        <div className="mt-8 flex items-center justify-between">
                            <button
                                onClick={() => setStep(1)}
                                className="flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-medium text-muted-foreground transition-all hover:text-foreground hover:bg-secondary/40"
                            >
                                <ArrowLeft className="h-4 w-4" />
                                Back
                            </button>
                            <button
                                onClick={() => canAdvance() && setStep(3)}
                                disabled={!canAdvance()}
                                className="group flex items-center gap-2 rounded-2xl bg-gradient-to-r from-teal to-teal-dark px-8 py-3.5 text-sm font-semibold text-primary-foreground shadow-xl shadow-teal/20 transition-all hover:shadow-teal/30 hover:-translate-y-0.5 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                            >
                                Continue
                                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                            </button>
                        </div>
                    </div>
                )}

                {/* ─── STEP 3: CONFIRMATION ──────────────────────────────── */}
                {step === 3 && (
                    <div className="animate-slide-up rounded-2xl border border-border/40 bg-card/50 p-6 md:p-8">
                        <div className="mb-6">
                            <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
                                <ClipboardList className="h-5 w-5 text-mint" />
                                Review &amp; Confirm
                            </h2>
                            <p className="mt-1 text-sm text-muted-foreground">
                                Review your details before completing registration
                            </p>
                        </div>

                        <div className="flex flex-col gap-6">
                            {/* Brand Details Summary */}
                            <div className="rounded-xl border border-border/30 bg-secondary/20 p-5">
                                <div className="mb-4 flex items-center justify-between">
                                    <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Brand Details</h3>
                                    <button
                                        onClick={() => setStep(1)}
                                        className="text-xs font-medium text-teal hover:text-teal-light transition-colors"
                                    >
                                        Edit
                                    </button>
                                </div>
                                <div className="grid gap-3 sm:grid-cols-2">
                                    <SummaryItem label="Brand Name" value={form.brandName} />
                                    <SummaryItem label="Website" value={form.website || "—"} />
                                    <SummaryItem label="Industry" value={form.industry} />
                                    <SummaryItem label="Email" value={form.email} />
                                    <SummaryItem label="Phone" value={form.phone || "—"} />
                                    {form.description && (
                                        <div className="sm:col-span-2">
                                            <SummaryItem label="Description" value={form.description} />
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Collaboration Preferences Summary */}
                            <div className="rounded-xl border border-border/30 bg-secondary/20 p-5">
                                <div className="mb-4 flex items-center justify-between">
                                    <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Collaboration Preferences</h3>
                                    <button
                                        onClick={() => setStep(2)}
                                        className="text-xs font-medium text-teal hover:text-teal-light transition-colors"
                                    >
                                        Edit
                                    </button>
                                </div>
                                <div className="grid gap-3 sm:grid-cols-2">
                                    <SummaryItem
                                        label="Collaboration Types"
                                        value={form.collabTypes.map((id) => collabTypes.find((c) => c.id === id)?.label).join(", ")}
                                    />
                                    <SummaryItem
                                        label="Platforms"
                                        value={form.platforms.map((id) => platformOptions.find((p) => p.id === id)?.label).join(", ")}
                                    />
                                    <SummaryItem label="Budget Range" value={form.budgetRange} />
                                    <SummaryItem label="Frequency" value={form.frequency || "—"} />
                                    <SummaryItem
                                        label="Influencer Tiers"
                                        value={
                                            form.influencerTiers.length > 0
                                                ? form.influencerTiers.map((id) => influencerTiers.find((t) => t.id === id)?.label).join(", ")
                                                : "—"
                                        }
                                    />
                                    {form.guidelines && (
                                        <div className="sm:col-span-2">
                                            <SummaryItem label="Guidelines" value={form.guidelines} />
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Navigation */}
                        {error && (
                            <div className="mt-4 rounded-xl bg-red-500/10 p-4 text-sm text-red-500 border border-red-500/20">
                                {error}
                            </div>
                        )}
                        <div className="mt-8 flex items-center justify-between">
                            <button
                                onClick={() => setStep(2)}
                                className="flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-medium text-muted-foreground transition-all hover:text-foreground hover:bg-secondary/40"
                            >
                                <ArrowLeft className="h-4 w-4" />
                                Back
                            </button>
                            <button
                                onClick={handleSubmit}
                                disabled={isSubmitting}
                                className="group flex items-center gap-2 rounded-2xl bg-gradient-to-r from-coral to-coral-dark px-10 py-4 text-base font-semibold text-foreground shadow-2xl shadow-coral/20 transition-all hover:shadow-coral/30 hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isSubmitting ? "Submitting..." : (
                                    <>
                                        Complete Registration
                                        <Sparkles className="h-4 w-4 transition-transform group-hover:scale-110" />
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

// ─── HELPER COMPONENT ────────────────────────────────────
function SummaryItem({ label, value }: { label: string; value: string }) {
    return (
        <div>
            <p className="text-xs font-medium text-muted-foreground">{label}</p>
            <p className="mt-0.5 text-sm text-foreground">{value}</p>
        </div>
    )
}
