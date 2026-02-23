export interface VocabWord {
  id: number
  source: string
  translation: string
  isFavorite: boolean
}

export interface VocabSeries {
  id: number
  name: string
  words: VocabWord[]
}

export interface TrainingStats {
  correct: number
  incorrect: number
  skipped: number
}

export type TrainingResult = "correct" | "incorrect" | "skipped" | null

export const mockSeries: VocabSeries = {
  id: 1,
  name: "Vetements",
  words: [
    { id: 1, source: "skirt", translation: "jupe", isFavorite: true },
    { id: 2, source: "pants", translation: "pantalon", isFavorite: false },
    { id: 3, source: "socks", translation: "chaussettes", isFavorite: true },
    { id: 4, source: "shirt", translation: "chemise", isFavorite: false },
    { id: 5, source: "jacket", translation: "veste", isFavorite: true },
    { id: 6, source: "dress", translation: "robe", isFavorite: false },
    { id: 7, source: "hat", translation: "chapeau", isFavorite: false },
    { id: 8, source: "shoes", translation: "chaussures", isFavorite: true },
    { id: 9, source: "coat", translation: "manteau", isFavorite: false },
    { id: 10, source: "scarf", translation: "echarpe", isFavorite: true },
    { id: 11, source: "gloves", translation: "gants", isFavorite: false },
    { id: 12, source: "belt", translation: "ceinture", isFavorite: false },
  ],
}
