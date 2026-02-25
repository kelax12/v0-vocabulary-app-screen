"use client"

import { useState, useCallback, useRef, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { TrainingHeader } from "@/features/training/components/training-header"
import { WordDisplay } from "@/features/vocabulary/components/word-display"
import { TrainingStatsDisplay } from "@/features/training/components/training-stats"
import { AnswerInput } from "@/features/training/components/answer-input"
import { ActionButtons } from "@/features/training/components/action-buttons"
import { ArrowRightLeft } from "lucide-react"
import { getSeriesById, mockAllSeries, MAX_SCORE } from "@/lib/data"
import type { TrainingStats, TrainingResult, VocabWord } from "@/lib/data"

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

export function TrainingScreen() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const inputRef = useRef<HTMLInputElement>(null)

  const seriesId = Number(searchParams.get("series") ?? mockAllSeries[0].id)
  const seriesData = getSeriesById(seriesId) ?? mockAllSeries[0]

  const [words, setWords] = useState<VocabWord[]>(seriesData.words)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [answer, setAnswer] = useState("")
  const [result, setResult] = useState<TrainingResult>(null)
  const [stats, setStats] = useState<TrainingStats>({
    correct: 0,
    incorrect: 0,
    skipped: 0,
  })
  const [isFinished, setIsFinished] = useState(false)

  const currentWord = words[currentIndex]

  useEffect(() => {
    setWords(shuffleArray(seriesData.words))
  }, [seriesData.words])

  useEffect(() => {
    if (!result) {
      const timer = setTimeout(() => inputRef.current?.focus(), 100)
      return () => clearTimeout(timer)
    }
  }, [currentIndex, result])

  const normalizeAnswer = (str: string) =>
    str
      .toLowerCase()
      .trim()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")

  const updateWordScore = useCallback(
    (wordId: number, delta: number) => {
      setWords((prev) =>
        prev.map((w) =>
          w.id === wordId
            ? { ...w, score: Math.max(0, Math.min(MAX_SCORE, w.score + delta)) }
            : w
        )
      )
    },
    []
  )

  const moveToNext = useCallback(() => {
    if (currentIndex + 1 >= words.length) {
      setIsFinished(true)
    } else {
      setCurrentIndex((prev) => prev + 1)
      setAnswer("")
      setResult(null)
    }
  }, [currentIndex, words.length])

  const handleValidate = useCallback(() => {
    if (!answer.trim()) return

    const isCorrect =
      normalizeAnswer(answer) === normalizeAnswer(currentWord.translation)

    if (isCorrect) {
      setResult("correct")
      setStats((prev) => ({ ...prev, correct: prev.correct + 1 }))
      updateWordScore(currentWord.id, 1)
    } else {
      setResult("incorrect")
      setStats((prev) => ({ ...prev, incorrect: prev.incorrect + 1 }))
      updateWordScore(currentWord.id, -1)
    }
  }, [answer, currentWord, updateWordScore])

  const handleSkip = useCallback(() => {
    setResult("skipped")
    setStats((prev) => ({ ...prev, skipped: prev.skipped + 1 }))
    updateWordScore(currentWord.id, -1)
  }, [currentWord, updateWordScore])

  const handleNext = useCallback(() => {
    moveToNext()
  }, [moveToNext])

  const handleBack = useCallback(() => {
    router.push("/train")
  }, [router])

  const handleChangeSeries = useCallback(() => {
    router.push("/train")
  }, [router])

  const handleRestart = useCallback(() => {
    setCurrentIndex(0)
    setAnswer("")
    setResult(null)
    setStats({ correct: 0, incorrect: 0, skipped: 0 })
    setIsFinished(false)
  }, [])

  if (isFinished) {
    const total = stats.correct + stats.incorrect + stats.skipped
    const successRate =
      total > 0 ? Math.round((stats.correct / total) * 100) : 0

    return (
      <div className="mx-auto flex min-h-dvh max-w-md flex-col bg-background shadow-[0_0_40px_rgba(0,0,0,0.06)]">
        <div className="flex flex-1 flex-col items-center justify-center gap-8 px-5">
          <div className="flex flex-col items-center gap-2">
            <span className="text-6xl font-bold text-primary">
              {successRate}%
            </span>
            <h2 className="text-xl font-semibold text-foreground">
              Session terminee
            </h2>
          </div>

          <div className="flex items-center gap-8">
            <div className="flex flex-col items-center gap-1">
              <span className="text-2xl font-bold tabular-nums text-emerald-500">
                {stats.correct}
              </span>
              <span className="text-xs font-medium text-muted-foreground">
                Reussi
              </span>
            </div>
            <div className="h-8 w-px bg-border" />
            <div className="flex flex-col items-center gap-1">
              <span className="text-2xl font-bold tabular-nums text-red-500">
                {stats.incorrect}
              </span>
              <span className="text-xs font-medium text-muted-foreground">
                Erreurs
              </span>
            </div>
            <div className="h-8 w-px bg-border" />
            <div className="flex flex-col items-center gap-1">
              <span className="text-2xl font-bold tabular-nums text-muted-foreground">
                {stats.skipped}
              </span>
              <span className="text-xs font-medium text-muted-foreground">
                Passes
              </span>
            </div>
          </div>

          <div className="flex w-full flex-col gap-3 pt-4">
            <button
              onClick={handleRestart}
              className="flex w-full items-center justify-center rounded-2xl bg-primary px-6 py-4 text-[15px] font-semibold tracking-wide text-primary-foreground shadow-[0_2px_12px_rgba(29,60,255,0.25)] transition-all hover:bg-accent active:scale-[0.98]"
            >
              Recommencer
            </button>
            <button
              onClick={handleBack}
              className="flex w-full items-center justify-center gap-2.5 rounded-2xl border border-primary bg-background px-6 py-4 text-[15px] font-semibold tracking-wide text-primary transition-all hover:bg-secondary active:scale-[0.98]"
            >
              Retour a la serie
            </button>
            <button
              onClick={handleChangeSeries}
              className="flex w-full items-center justify-center gap-2 rounded-2xl border border-border bg-background px-6 py-3.5 text-[14px] font-semibold tracking-wide text-foreground transition-all hover:bg-secondary active:scale-[0.98]"
            >
              <ArrowRightLeft className="h-4 w-4" />
              Changer de serie
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto flex min-h-dvh max-w-md flex-col bg-background shadow-[0_0_40px_rgba(0,0,0,0.06)]">
      <TrainingHeader
        currentIndex={currentIndex}
        total={words.length}
        onBack={handleBack}
      />

      <WordDisplay word={currentWord.source} result={result} />

        <div className="pb-2 pt-6">
          <TrainingStatsDisplay stats={stats} />

        <AnswerInput
          ref={inputRef}
          value={answer}
          onChange={setAnswer}
          onSubmit={handleValidate}
          result={result}
          correctAnswer={currentWord.translation}
          disabled={result !== null}
        />

        <ActionButtons
          onValidate={handleValidate}
          onSkip={handleSkip}
          onNext={handleNext}
          result={result}
        />

        <div className="px-5 pb-2 pt-1">
          <button
            onClick={handleChangeSeries}
            className="flex w-full items-center justify-center gap-2.5 rounded-2xl border border-primary bg-background px-6 py-3.5 text-[14px] font-semibold tracking-wide text-primary transition-all hover:bg-secondary active:scale-[0.98]"
          >
            <ArrowRightLeft className="h-4 w-4" />
            Changer de serie
          </button>
        </div>
      </div>

      <div className="h-6 pb-20" />
    </div>
  )
}
