"use client"

import { useState, useCallback, useMemo } from "react"
import { useRouter } from "next/navigation"
import { SeriesHeader } from "@/components/series-header"
import { ProgressBar } from "@/components/progress-bar"
import { VocabList } from "@/components/vocab-list"
import { getSeriesById } from "@/lib/data"
import type { VocabWord } from "@/lib/data"
import { Play, ArrowLeft } from "lucide-react"

interface SeriesDetailProps {
  seriesId: number
}

export function SeriesDetail({ seriesId }: SeriesDetailProps) {
  const router = useRouter()
  const seriesData = getSeriesById(seriesId)

  const [words, setWords] = useState<VocabWord[]>(seriesData?.words ?? [])
  const favoriteCount = useMemo(
    () => words.filter((w) => w.isFavorite).length,
    [words]
  )

  const handleToggleFavorite = useCallback((id: number) => {
    setWords((prev) =>
      prev.map((w) => (w.id === id ? { ...w, isFavorite: !w.isFavorite } : w))
    )
  }, [])

  const handleTapWord = useCallback((id: number) => {
    console.log("Tapped word", id)
  }, [])

  const handleEdit = useCallback(() => {
    console.log("Edit series")
  }, [])

  if (!seriesData) {
    return (
      <div className="mx-auto flex min-h-dvh max-w-md flex-col items-center justify-center bg-background shadow-[0_0_40px_rgba(0,0,0,0.06)]">
        <p className="text-[15px] text-muted-foreground">Serie introuvable</p>
        <button
          onClick={() => router.push("/")}
          className="mt-4 text-[14px] font-semibold text-primary"
        >
          Retour
        </button>
      </div>
    )
  }

  return (
    <div className="mx-auto flex min-h-dvh max-w-md flex-col bg-background shadow-[0_0_40px_rgba(0,0,0,0.06)]">
      {/* Back navigation */}
      <div className="sticky top-0 z-20 bg-background">
        <div className="flex items-center px-2 pt-12 pb-0">
          <button
            onClick={() => router.push("/")}
            className="flex h-10 w-10 items-center justify-center rounded-xl transition-colors hover:bg-secondary active:scale-95"
            aria-label="Retour aux series"
          >
            <ArrowLeft className="h-5 w-5 text-foreground" />
          </button>
        </div>
      </div>

      <SeriesHeader
        seriesNumber={seriesData.id}
        seriesName={seriesData.name}
        onEdit={handleEdit}
      />

      {/* Start training button */}
      <div className="px-5 pb-2">
        <button
          onClick={() => router.push(`/train?series=${seriesId}`)}
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

      <div className="h-8" />
    </div>
  )
}
