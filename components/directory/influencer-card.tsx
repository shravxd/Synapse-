import Image from "next/image"
import type { Influencer } from "@/lib/data"
import { BadgeCheck, MapPin, Users, TrendingUp, Briefcase } from "lucide-react"

interface InfluencerCardProps {
  influencer: Influencer
  onRequestCollab: () => void
}

export function InfluencerCard({ influencer, onRequestCollab }: InfluencerCardProps) {
  return (
    <div className="group flex flex-col rounded-2xl border border-border/40 bg-card/50 p-6 transition-all hover:border-brand/30 hover:bg-card hover:shadow-2xl hover:shadow-brand/5 hover:-translate-y-1">
      {/* Header */}
      <div className="flex items-start gap-4">
        <div
          className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl text-base font-bold text-primary-foreground transition-transform group-hover:scale-105 overflow-hidden"
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
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5">
            <h3 className="truncate font-bold text-foreground">{influencer.name}</h3>
            {influencer.verified && (
              <BadgeCheck className="h-4 w-4 shrink-0 text-brand" />
            )}
          </div>
          <div className="mt-1.5 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
            <span
              className="rounded-md px-2 py-0.5 font-medium"
              style={{
                backgroundColor: `${influencer.avatarBg}15`,
                color: influencer.avatarBg,
              }}
            >
              {influencer.niche}
            </span>
            <span className="rounded-md border border-border/40 bg-secondary/30 px-2 py-0.5">{influencer.platform}</span>
            <span className="flex items-center gap-1">
              <MapPin className="h-3 w-3" />
              {influencer.location}
            </span>
          </div>
        </div>
      </div>

      {/* Bio */}
      <p className="mt-4 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
        {influencer.bio}
      </p>

      {/* Tags */}
      <div className="mt-3 flex flex-wrap gap-1.5">
        {influencer.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-lg border border-border/30 bg-secondary/20 px-2 py-0.5 text-xs text-muted-foreground"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Stats */}
      <div className="mt-auto flex items-center gap-5 border-t border-border/40 pt-4 mt-5">
        <div className="flex items-center gap-1.5">
          <Users className="h-3.5 w-3.5 text-muted-foreground/60" />
          <span className="text-sm font-bold text-foreground">{influencer.followers}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <TrendingUp className="h-3.5 w-3.5 text-brand" />
          <span className="text-sm font-bold text-brand">{influencer.engagement}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Briefcase className="h-3.5 w-3.5 text-muted-foreground/60" />
          <span className="text-sm font-bold text-foreground">{influencer.campaigns}</span>
        </div>
      </div>

      {/* CTA */}
      <button
        onClick={onRequestCollab}
        className="mt-5 w-full rounded-xl bg-brand py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-brand/15 transition-all hover:shadow-brand/25 hover:-translate-y-0.5"
      >
        Request Collaboration
      </button>
    </div>
  )
}
