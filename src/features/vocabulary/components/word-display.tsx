"use client"

import type { TrainingResult } from "@/lib/data"

interface WordDisplayProps {
  word: string
  result: TrainingResult
}

export function WordDisplay({ word, result }: WordDisplayProps) {
  return (
    <div className="flex flex-col items-center justify-center px-5 py-5">
      <div className="relative">
        <h2
          className={`text-center text-4xl font-bold tracking-tight transition-colors duration-300 ${
            result === "correct"
              ? "text-emerald-500"
              : result === "incorrect"
                ? "text-red-500"
                : "text-foreground"
          }`}
        >
          {word}
        </h2>
        {result === "correct" && (
          <div className="absolute -right-8 -top-2 animate-in fade-in zoom-in duration-300">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              className="text-emerald-500"
            >
              <path
                d="M5 13l4 4L19 7"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        )}
        {result === "incorrect" && (
          <div className="absolute -right-8 -top-2 animate-in fade-in zoom-in duration-300">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              className="text-red-500"
            >
              <path
                d="M6 18L18 6M6 6l12 12"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        )}
      </div>
    </div>
  )
}
