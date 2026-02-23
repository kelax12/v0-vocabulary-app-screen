"use client"

import type { TrainingResult } from "@/lib/data"

interface ActionButtonsProps {
  onValidate: () => void
  onSkip: () => void
  onNext: () => void
  result: TrainingResult
}

export function ActionButtons({
  onValidate,
  onSkip,
  onNext,
  result,
}: ActionButtonsProps) {
  if (result) {
    return (
      <div className="px-5 pb-3">
        <button
          onClick={onNext}
          className="flex w-full items-center justify-center rounded-2xl bg-primary px-6 py-4 text-[15px] font-semibold tracking-wide text-primary-foreground shadow-[0_2px_12px_rgba(29,60,255,0.25)] transition-all hover:bg-accent active:scale-[0.98]"
        >
          Suivant
        </button>
      </div>
    )
  }

  return (
    <div className="flex gap-3 px-5 pb-3">
      <button
        onClick={onValidate}
        className="flex flex-1 items-center justify-center rounded-2xl bg-primary px-6 py-4 text-[15px] font-semibold tracking-wide text-primary-foreground shadow-[0_2px_12px_rgba(29,60,255,0.25)] transition-all hover:bg-accent active:scale-[0.98]"
      >
        Valider
      </button>
      <button
        onClick={onSkip}
        className="flex items-center justify-center rounded-2xl bg-secondary px-6 py-4 text-[15px] font-semibold tracking-wide text-secondary-foreground transition-all hover:bg-secondary/80 active:scale-[0.98]"
      >
        Passer
      </button>
    </div>
  )
}
