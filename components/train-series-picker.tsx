"use client"

import { useState, useCallback, useMemo } from "react"
import { useRouter } from "next/navigation"
import { SearchBar } from "@/components/search-bar"
import { GraduationCap, Play } from "lucide-react"
import { cn } from "@/lib/utils"
import {
  mockAllSeries,
  getSeriesProgress,
  getGlobalProgress,
} from "@/lib/data"
import type { VocabSeries } from "@/lib/data"

export function TrainSeriesPicker() {
  const router = useRouter()
  const [series] = useState<VocabSeries[]>(mockAllSeries)
  const [searchQuery, setSearchQuery] = useState("")

  const globalProgress = useMemo(() => getGlobalProgress(series), [series])

  const filteredSeries = useMemo(() => {
    if (!searchQuery.trim()) return series
    const q = searchQuery.toLowerCase().trim()
    return series.filter((s) => s.name.toLowerCase().includes(q))
  }, [series, searchQuery])

  const handleSelectSeries = useCallback(
    (id: number) => {
      router.push(`/train/session?series=${id}`)
    },
    [router]
  )

  return (
    <div className="relative mx-auto flex min-h-dvh max-w-md flex-col bg-background shadow-[0_0_40px_rgba(0,0,0,0.06)]">
      {/* Header */}
      <div className="px-5 pt-14 pb-2">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10">
            <GraduationCap className="h-[22px] w-[22px] text-primary" />
          </div>
          <div className="flex-1">
            <h1 className="text-[20px] font-bold leading-tight text-foreground text-balance">
              Entrainement
            </h1>
            <p className="mt-0.5 text-[13px] font-medium text-muted-foreground">
              Choisissez une serie
            </p>
          </div>
          <span className="text-[13px] font-semibold tabular-nums text-primary">
            {globalProgress}%
          </span>
        </div>
      </div>

      <SearchBar value={searchQuery} onChange={setSearchQuery} />

      {/* Series list */}
      <main className="flex-1 px-5 pb-28">
        <div className="flex flex-col gap-2.5">
          {filteredSeries.map((s) => {
            const progress = getSeriesProgress(s)
            const wordCount = s.words.length

            return (
              <button
                key={s.id}
                onClick={() => handleSelectSeries(s.id)}
                className="group flex items-center gap-4 rounded-[18px] bg-card p-4 text-left shadow-[0_1px_6px_rgba(0,0,0,0.04)] transition-all active:scale-[0.98] hover:shadow-[0_2px_12px_rgba(0,0,0,0.06)]"
              >
                {/* Progress circle */}
                <div className="relative flex h-12 w-12 shrink-0 items-center justify-center">
                  <svg className="h-12 w-12 -rotate-90" viewBox="0 0 48 48">
                    <circle
                      cx="24"
                      cy="24"
                      r="20"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      className="text-secondary"
                    />
                    <circle
                      cx="24"
                      cy="24"
                      r="20"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeDasharray={`${(progress / 100) * 125.66} 125.66`}
                      className={cn(
                        "transition-all duration-500",
                        progress === 100
                          ? "text-emerald-500"
                          : "text-primary"
                      )}
                    />
                  </svg>
                  <span
                    className={cn(
                      "absolute text-[11px] font-bold tabular-nums",
                      progress === 100
                        ? "text-emerald-500"
                        : "text-foreground"
                    )}
                  >
                    {progress}%
                  </span>
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-[15px] font-semibold leading-snug text-foreground truncate">
                    {s.name}
                  </h3>
                  <p className="mt-0.5 text-[12px] font-medium text-muted-foreground">
                    {wordCount} {wordCount > 1 ? "mots" : "mot"}
                  </p>
                </div>

                {/* Play icon */}
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/10 transition-colors group-hover:bg-primary/15">
                  <Play
                    className="h-4 w-4 text-primary"
                    fill="currentColor"
                  />
                </div>
              </button>
            )
          })}

          {filteredSeries.length === 0 && (
            <div className="flex flex-col items-center justify-center py-16">
              <p className="text-[15px] font-medium text-muted-foreground">
                Aucune serie trouvee
              </p>
              <p className="mt-1 text-[13px] text-muted-foreground/60">
                Essayez un autre terme de recherche
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
