"use client"

import { forwardRef } from "react"
import type { TrainingResult } from "@/lib/data"

interface AnswerInputProps {
  value: string
  onChange: (value: string) => void
  onSubmit: () => void
  result: TrainingResult
  correctAnswer?: string
  disabled: boolean
}

export const AnswerInput = forwardRef<HTMLInputElement, AnswerInputProps>(
  function AnswerInput(
    { value, onChange, onSubmit, result, correctAnswer, disabled },
    ref
  ) {
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter" && !disabled) {
        onSubmit()
      }
    }

    const borderColor =
      result === "correct"
        ? "border-emerald-400 ring-emerald-100 ring-4"
        : result === "incorrect"
          ? "border-red-400 ring-red-100 ring-4"
          : "border-border focus:border-primary focus:ring-primary/20 focus:ring-4"

    return (
      <div className="px-5 pb-4">
        <div className="relative">
          <input
            ref={ref}
            type="text"
            value={result === "incorrect" && correctAnswer ? correctAnswer : value}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Entrez la traduction"
            disabled={disabled}
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck={false}
            className={`w-full rounded-[14px] border bg-background px-5 py-4 text-base font-medium text-foreground outline-none transition-all duration-200 placeholder:text-muted-foreground/60 disabled:opacity-70 ${borderColor} ${
              result === "incorrect" ? "text-red-500" : ""
            } ${result === "correct" ? "text-emerald-600" : ""}`}
          />
        </div>
      </div>
    )
  }
)
