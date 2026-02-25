"use client"

import { ArrowLeft } from "lucide-react"

interface TrainingHeaderProps {
  currentIndex: number
  total: number
  onBack: () => void
}

export function TrainingHeader({
  currentIndex,
  total,
  onBack,
}: TrainingHeaderProps) {
  const percentage = total > 0 ? Math.round((currentIndex / total) * 100) : 0

  return (
    <header className="flex items-center gap-3 px-5 pb-4 pt-14">
      <button
        onClick={onBack}
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-colors hover:bg-secondary active:scale-95"
        aria-label="Retour"
      >
        <ArrowLeft className="h-5 w-5 text-foreground" />
      </button>

      <div className="flex flex-1 items-center gap-3">
        <div className="h-2 flex-1 overflow-hidden rounded-full bg-secondary">
          <div
            className="h-full rounded-full bg-primary transition-all duration-500 ease-out"
            style={{ width: `${percentage}%` }}
            role="progressbar"
            aria-valuenow={currentIndex}
            aria-valuemin={0}
            aria-valuemax={total}
          />
        </div>
        <span className="shrink-0 text-sm font-semibold tabular-nums text-muted-foreground">
          {percentage}%
        </span>
      </div>
    </header>
  )
}
