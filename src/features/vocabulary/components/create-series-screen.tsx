"use client"

import { useState, useCallback, useRef, useMemo } from "react"
import { useRouter } from "next/navigation"
import { Plus } from "lucide-react"
import { LanguageSelector } from "@/core/ui/language-selector"
import { WordRow } from "@/features/vocabulary/components/word-row"
import { cn } from "@/lib/utils"

interface WordEntry {
  id: string
  source: string
  target: string
}

function createEmptyWord(): WordEntry {
  return { id: crypto.randomUUID(), source: "", target: "" }
}

export function CreateSeriesScreen() {
  const router = useRouter()
  const scrollRef = useRef<HTMLDivElement>(null)
  const lastRowRef = useRef<HTMLInputElement>(null)

  const [name, setName] = useState("")
  const [sourceLanguage, setSourceLanguage] = useState("fr")
  const [targetLanguage, setTargetLanguage] = useState("en")
  const [words, setWords] = useState<WordEntry[]>([
    createEmptyWord(),
    createEmptyWord(),
  ])

  const hasValidName = name.trim().length > 0
  const hasAtLeastOneWord = words.some(
    (w) => w.source.trim().length > 0 && w.target.trim().length > 0
  )
  const canSubmit = hasValidName && hasAtLeastOneWord

  const filledWordCount = useMemo(
    () =>
      words.filter(
        (w) => w.source.trim().length > 0 && w.target.trim().length > 0
      ).length,
    [words]
  )

  const handleAddWord = useCallback(() => {
    setWords((prev) => [...prev, createEmptyWord()])
    // Scroll to new row and focus it after render
    requestAnimationFrame(() => {
      scrollRef.current?.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth",
      })
      setTimeout(() => lastRowRef.current?.focus(), 150)
    })
  }, [])

  const handleRemoveWord = useCallback((id: string) => {
    setWords((prev) => prev.filter((w) => w.id !== id))
  }, [])

  const handleSourceChange = useCallback((id: string, value: string) => {
    setWords((prev) =>
      prev.map((w) => (w.id === id ? { ...w, source: value } : w))
    )
  }, [])

  const handleTargetChange = useCallback((id: string, value: string) => {
    setWords((prev) =>
      prev.map((w) => (w.id === id ? { ...w, target: value } : w))
    )
  }, [])

  const handleSubmit = useCallback(() => {
    if (!canSubmit) return

    const validWords = words.filter(
      (w) => w.source.trim().length > 0 && w.target.trim().length > 0
    )

    const newSeries = {
      id: Date.now(),
      name: name.trim(),
      sourceLanguage,
      targetLanguage,
      isFavorite: false,
      words: validWords.map((w, i) => ({
        id: Date.now() + i,
        source: w.source.trim(),
        translation: w.target.trim(),
        isFavorite: false,
        mastered: false,
      })),
    }

    // For now, log the created series (ready for future persistence)
    console.log("Created series:", newSeries)
    router.push("/")
  }, [canSubmit, words, name, sourceLanguage, targetLanguage, router])

  return (
    <div
      ref={scrollRef}
      className="mx-auto flex min-h-dvh max-w-md flex-col bg-background shadow-[0_0_40px_rgba(0,0,0,0.06)] overflow-y-auto"
    >
      {/* Header */}
      <div className="sticky top-0 z-20 bg-background">
        <div className="px-5 pt-14 pb-4">
            <h1 className="text-[28px] font-bold leading-tight tracking-tight text-foreground text-balance">
              Creer une serie
            </h1>
          </div>
      </div>

      <div className="flex flex-1 flex-col px-5 pb-28">
        {/* Series name */}
        <section className="pt-4 pb-6">
          <label
            htmlFor="series-name"
            className="mb-1.5 block text-[12px] font-semibold uppercase tracking-wider text-muted-foreground"
          >
            Nom de la serie
          </label>
          <input
            id="series-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ex: Vetements, Verbes irreguliers..."
            className="h-13 w-full rounded-[14px] border border-border bg-background px-4 text-[15px] font-medium text-foreground placeholder:text-muted-foreground/40 transition-all outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
        </section>

        {/* Language selection */}
        <section className="pb-6">
          <div className="flex items-end gap-3">
            <LanguageSelector
              label="Langue source"
              value={sourceLanguage}
              onChange={setSourceLanguage}
              disabledCode={targetLanguage}
            />
            <div className="flex h-12 items-center">
              <span className="text-[16px] font-bold text-muted-foreground/30">
                {"→"}
              </span>
            </div>
            <LanguageSelector
              label="Langue cible"
              value={targetLanguage}
              onChange={setTargetLanguage}
              disabledCode={sourceLanguage}
            />
          </div>
        </section>

        {/* Separator */}
        <div className="h-px bg-border" />

        {/* Words section */}
        <section className="flex flex-1 flex-col pt-6">
          <div className="mb-1 flex items-baseline justify-between">
            <h2 className="text-[15px] font-bold text-foreground">
              Ajouter des mots
            </h2>
            {filledWordCount > 0 && (
              <span className="text-[12px] font-semibold tabular-nums text-primary">
                {filledWordCount} {filledWordCount > 1 ? "mots" : "mot"}
              </span>
            )}
          </div>
          <p className="mb-5 text-[13px] font-medium text-muted-foreground">
            Ajoutez au moins un mot pour creer la serie.
          </p>

          <div className="flex flex-col gap-2.5">
            {words.map((word, index) => (
              <WordRow
                key={word.id}
                index={index}
                source={word.source}
                target={word.target}
                onSourceChange={(v) => handleSourceChange(word.id, v)}
                onTargetChange={(v) => handleTargetChange(word.id, v)}
                onRemove={() => handleRemoveWord(word.id)}
                canRemove={words.length > 1}
                sourceRef={index === words.length - 1 ? lastRowRef : undefined}
              />
            ))}
          </div>

          {/* Add word button */}
          <button
            type="button"
            onClick={handleAddWord}
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-[14px] border border-primary/30 bg-background py-3 text-[14px] font-semibold text-primary transition-all hover:border-primary hover:bg-primary/5 active:scale-[0.98]"
          >
            <Plus className="h-4 w-4" />
            Ajouter un mot
          </button>
        </section>

        {/* Submit button */}
        <div className="pt-8 pb-4">
          <button
            onClick={handleSubmit}
            disabled={!canSubmit}
            className={cn(
              "flex w-full items-center justify-center rounded-[18px] px-6 py-4 text-[15px] font-semibold tracking-wide transition-all active:scale-[0.98]",
              canSubmit
                ? "bg-primary text-primary-foreground shadow-[0_2px_16px_rgba(29,60,255,0.3)]"
                : "bg-secondary text-muted-foreground cursor-not-allowed"
            )}
          >
            Creer la serie
          </button>
        </div>
      </div>
    </div>
  )
}
