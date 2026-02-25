"use client"

import { useState, useCallback, useMemo } from "react"
import { useRouter } from "next/navigation"
import { DashboardHeader } from "@/features/dashboard/components/dashboard-header"
import { SearchBar } from "@/features/dashboard/components/search-bar"
import { SeriesCard } from "@/features/vocabulary/components/series-card"
import {
  mockAllSeries,
  getSeriesProgress,
  getGlobalProgress,
} from "@/lib/data"
import type { VocabSeries } from "@/lib/data"

export function MySeriesDashboard() {
  const router = useRouter()
  const [series, setSeries] = useState<VocabSeries[]>(mockAllSeries)
  const [searchQuery, setSearchQuery] = useState("")

  const globalProgress = useMemo(() => getGlobalProgress(series), [series])

  const filteredSeries = useMemo(() => {
    if (!searchQuery.trim()) return series
    const q = searchQuery.toLowerCase().trim()
    return series.filter((s) => s.name.toLowerCase().includes(q))
  }, [series, searchQuery])

  const handleTapSeries = useCallback(
    (id: number) => {
      router.push(`/series/${id}`)
    },
    [router]
  )

  const handleToggleFavorite = useCallback((id: number) => {
    setSeries((prev) =>
      prev.map((s) =>
        s.id === id ? { ...s, isFavorite: !s.isFavorite } : s
      )
    )
  }, [])

  const handleEditSeries = useCallback(
    (id: number) => {
      router.push(`/series/${id}/edit`)
    },
    [router]
  )

  return (
    <div className="relative mx-auto flex min-h-dvh max-w-md flex-col bg-background shadow-[0_0_40px_rgba(0,0,0,0.06)]">
      <DashboardHeader globalProgress={globalProgress} />

      <SearchBar value={searchQuery} onChange={setSearchQuery} onAdd={() => router.push("/create")} />

      <main className="flex-1 px-5 pb-28">
        <div className="flex flex-col gap-3">
          {filteredSeries.map((s) => (
            <SeriesCard
              key={s.id}
              id={s.id}
              name={s.name}
              wordCount={s.words.length}
              progress={getSeriesProgress(s)}
              isFavorite={s.isFavorite}
              onTap={() => handleTapSeries(s.id)}
              onToggleFavorite={() => handleToggleFavorite(s.id)}
              onEdit={() => handleEditSeries(s.id)}
            />
          ))}

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
