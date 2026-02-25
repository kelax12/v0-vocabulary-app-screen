"use client"

import { ArrowRightLeft } from "lucide-react"

interface ChangeSeriesButtonProps {
  onClick: () => void
}

export function ChangeSeriesButton({ onClick }: ChangeSeriesButtonProps) {
  return (
    <div className="px-5 pb-2 pt-2">
      <button
        onClick={onClick}
        className="flex w-full items-center justify-center gap-2.5 rounded-2xl bg-primary px-6 py-4 text-primary-foreground shadow-[0_2px_12px_rgba(29,60,255,0.25)] transition-all hover:bg-accent active:scale-[0.98]"
      >
        <ArrowRightLeft className="h-[18px] w-[18px]" />
        <span className="text-[15px] font-semibold tracking-wide">
          Changer de serie
        </span>
      </button>
    </div>
  )
}
