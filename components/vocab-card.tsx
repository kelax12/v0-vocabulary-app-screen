"use client"

import { Star } from "lucide-react"
import { cn } from "@/lib/utils"

interface VocabCardProps {
  index: number
  source: string
  translation: string
  isFavorite: boolean
  onToggleFavorite: () => void
  onTap: () => void
}

export function VocabCard({
  index,
  source,
  translation,
  isFavorite,
  onToggleFavorite,
  onTap,
}: VocabCardProps) {
  const isEven = index % 2 === 0

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onTap}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") onTap()
      }}
      className={cn(
        "group flex cursor-pointer items-center gap-4 px-5 py-4 transition-all active:scale-[0.98]",
        isEven ? "bg-background" : "bg-secondary"
      )}
    >
      {/* Number */}
      <span className="min-w-[28px] text-[13px] font-medium text-muted-foreground">
        {"#"}{index + 1}
      </span>

      {/* Word pair */}
      <div className="flex flex-1 items-baseline gap-2 overflow-hidden">
        <span className="text-[15px] font-semibold text-foreground truncate">
          {source}
        </span>
        <span className="text-[13px] text-muted-foreground">=</span>
        <span className="text-[15px] font-normal text-foreground truncate">
          {translation}
        </span>
      </div>

      {/* Favorite star */}
      <button
        onClick={(e) => {
          e.stopPropagation()
          onToggleFavorite()
        }}
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg transition-all hover:bg-muted active:scale-90"
        aria-label={isFavorite ? "Retirer des favoris" : "Ajouter aux favoris"}
      >
        <Star
          className={cn(
            "h-[18px] w-[18px] transition-all",
            isFavorite
              ? "fill-primary text-primary"
              : "fill-none text-muted-foreground/40"
          )}
        />
      </button>
    </div>
  )
}
