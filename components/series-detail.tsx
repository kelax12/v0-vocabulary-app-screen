"use client"

import { useState, useCallback, useMemo } from "react"
import { SeriesHeader } from "@/components/series-header"
import { ChangeSeriesButton } from "@/components/change-series-button"
import { ProgressBar } from "@/components/progress-bar"
import { VocabList } from "@/components/vocab-list"
import { mockSeries } from "@/lib/data"
import type { VocabWord } from "@/lib/data"

export function SeriesDetail() {
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
