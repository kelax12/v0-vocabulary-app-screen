"use client"

import { Pencil } from "lucide-react"

interface SeriesHeaderProps {
  seriesNumber: number
  seriesName: string
  onEdit: () => void
}

export function SeriesHeader({ seriesNumber, seriesName, onEdit }: SeriesHeaderProps) {
  return (
    <header className="flex items-center justify-center px-5 pb-4 pt-1">
      <h1 className="text-lg font-bold tracking-tight text-foreground text-balance text-center">
        {"Serie "}{seriesNumber}{" : "}{seriesName}
      </h1>
      <button
        onClick={onEdit}
        className="absolute right-5 top-1 flex h-10 w-10 items-center justify-center rounded-xl transition-colors hover:bg-secondary active:scale-95"
        aria-label="Modifier la serie"
      >
        <Pencil className="h-[18px] w-[18px] text-muted-foreground" />
      </button>
    </header>
  )
}
