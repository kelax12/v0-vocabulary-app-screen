"use client"

import { VocabCard } from "@/components/vocab-card"
import type { VocabWord } from "@/lib/data"

interface VocabListProps {
  words: VocabWord[]
  onToggleFavorite: (id: number) => void
  onTapWord: (id: number) => void
}

export function VocabList({ words, onToggleFavorite, onTapWord }: VocabListProps) {
  return (
    <div className="flex flex-col pb-8">
      <div className="px-5 pb-3 pt-5">
        <p className="text-[13px] font-medium uppercase tracking-wider text-muted-foreground">
          {words.length}{" mots"}
        </p>
      </div>
      {words.map((word, index) => (
        <VocabCard
          key={word.id}
          index={index}
          source={word.source}
          translation={word.translation}
          isFavorite={word.isFavorite}
          onToggleFavorite={() => onToggleFavorite(word.id)}
          onTap={() => onTapWord(word.id)}
        />
      ))}
    </div>
  )
}
