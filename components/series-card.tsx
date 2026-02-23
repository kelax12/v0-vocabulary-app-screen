"use client"

import { Star, Pencil } from "lucide-react"
import { cn } from "@/lib/utils"

interface SeriesCardProps {
  id: number
  name: string
  wordCount: number
  progress: number
  isFavorite: boolean
  onTap: () => void
  onToggleFavorite: () => void
  onEdit: () => void
}

export function SeriesCard({
  name,
  wordCount,
  progress,
  isFavorite,
  onTap,
  onToggleFavorite,
  onEdit,
}: SeriesCardProps) {
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onTap}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") onTap()
      }}
      className="group relative cursor-pointer rounded-[20px] bg-card p-5 shadow-[0_1px_8px_rgba(0,0,0,0.04),0_4px_24px_rgba(0,0,0,0.03)] transition-all active:scale-[0.98] hover:shadow-[0_2px_12px_rgba(0,0,0,0.06),0_8px_32px_rgba(0,0,0,0.04)]"
    >
      {/* Row 1: title + star + edit */}
      <div className="flex items-start gap-2">
        <button
          onClick={(e) => {
            e.stopPropagation()
            onToggleFavorite()
          }}
          className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg transition-all active:scale-90"
          aria-label={isFavorite ? "Retirer des favoris" : "Ajouter aux favoris"}
        >
          <Star
            className={cn(
              "h-[16px] w-[16px] transition-all",
              isFavorite
                ? "fill-primary text-primary"
                : "fill-none text-muted-foreground/40"
            )}
          />
        </button>

        <div className="flex-1 min-w-0">
          <h3 className="text-[15px] font-semibold leading-snug text-foreground truncate">
            {name}
          </h3>
          <p className="text-[12px] font-medium text-muted-foreground mt-0.5">
            {wordCount} {wordCount > 1 ? "mots" : "mot"}
          </p>
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation()
            onEdit()
          }}
          className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg transition-colors hover:bg-secondary active:scale-95"
          aria-label="Modifier la serie"
        >
          <Pencil className="h-[14px] w-[14px] text-muted-foreground/50" />
        </button>
      </div>

      {/* Row 2: progress bar + percentage */}
      <div className="mt-3.5 flex items-center gap-3">
        <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-secondary">
          <div
            className="h-full rounded-full bg-primary transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
            role="progressbar"
            aria-valuenow={progress}
            aria-valuemin={0}
            aria-valuemax={100}
          />
        </div>
        <span
          className={cn(
            "text-[13px] font-semibold tabular-nums",
            progress === 100 ? "text-emerald-500" : "text-muted-foreground"
          )}
        >
          {progress}%
        </span>
      </div>
    </div>
  )
}
