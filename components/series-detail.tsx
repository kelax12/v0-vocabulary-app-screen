"use client"

import { useState, useCallback, useMemo } from "react"
import { useRouter } from "next/navigation"
import { SeriesHeader } from "@/components/series-header"
import { ChangeSeriesButton } from "@/components/change-series-button"
import { ProgressBar } from "@/components/progress-bar"
import { VocabList } from "@/components/vocab-list"
import { mockSeries } from "@/lib/data"
import type { VocabWord } from "@/lib/data"
import { Play } from "lucide-react"

export function SeriesDetail() {
  const router = useRouter()
  const [words, setWords] = useState<VocabWord[]>(mockSeries.words)
  const favoriteCount = useMemo(() => words.filter((w) => w.isFavorite).length, [words])

  const handleToggleFavorite = useCallback((id: number) => {
    setWords((prev) =>
      prev.map((w) =>
        w.id === id ? { ...w, isFavorite: !w.isFavorite } : w
      )
    )
  }, [])

  const handleTapWord = useCallback((id: number) => {
    // Future: navigate to word detail or flip card
    console.log("Tapped word", id)
  }, [])

  const handleEdit = useCallback(() => {
    // Future: navigate to edit series screen
    console.log("Edit series")
  }, [])

  const handleChangeSeries = useCallback(() => {
    // Future: navigate to series picker
    console.log("Change series")
  }, [])

  return (
    <div className="mx-auto flex min-h-dvh max-w-md flex-col bg-background shadow-[0_0_40px_rgba(0,0,0,0.06)]">
      <SeriesHeader
        seriesNumber={mockSeries.id}
        seriesName={mockSeries.name}
        onEdit={handleEdit}
      />

      <ChangeSeriesButton onClick={handleChangeSeries} />

      <div className="px-5 pb-2">
        <button
          onClick={() => router.push("/train")}
          className="flex w-full items-center justify-center gap-2.5 rounded-2xl bg-primary px-6 py-4 text-primary-foreground shadow-[0_2px_12px_rgba(29,60,255,0.25)] transition-all hover:bg-accent active:scale-[0.98]"
        >
          <Play className="h-[18px] w-[18px]" fill="currentColor" />
          <span className="text-[15px] font-semibold tracking-wide">
            {"Commencer l'entrainement"}
          </span>
        </button>
      </div>

      <ProgressBar current={favoriteCount} total={words.length} />

      <main className="flex-1">
        <VocabList
          words={words}
          onToggleFavorite={handleToggleFavorite}
          onTapWord={handleTapWord}
        />
      </main>

      {/* Bottom safe area for mobile */}
      <div className="h-8" />
    </div>
  )
}
