"use client"

import type { TrainingStats } from "@/lib/data"

interface TrainingStatsDisplayProps {
  stats: TrainingStats
}

export function TrainingStatsDisplay({ stats }: TrainingStatsDisplayProps) {
  return (
    <div className="flex items-center justify-center gap-6 px-5 pb-6">
      <div className="flex items-center gap-1.5">
        <span className="text-xs font-medium text-muted-foreground">
          {"Reussi :"}
        </span>
        <span className="text-xs font-semibold tabular-nums text-emerald-500">
          {stats.correct}
        </span>
      </div>
      <div className="flex items-center gap-1.5">
        <span className="text-xs font-medium text-muted-foreground">
          {"Erreurs :"}
        </span>
        <span className="text-xs font-semibold tabular-nums text-red-500">
          {stats.incorrect}
        </span>
      </div>
      <div className="flex items-center gap-1.5">
        <span className="text-xs font-medium text-muted-foreground">
          {"Passes :"}
        </span>
        <span className="text-xs font-semibold tabular-nums text-muted-foreground">
          {stats.skipped}
        </span>
      </div>
    </div>
  )
}
