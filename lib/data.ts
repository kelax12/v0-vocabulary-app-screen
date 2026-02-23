export interface VocabWord {
  id: number
  source: string
  translation: string
  isFavorite: boolean
  mastered: boolean
}

export interface VocabSeries {
  id: number
  name: string
  sourceLanguage: string
  targetLanguage: string
  isFavorite: boolean
  words: VocabWord[]
}

export interface TrainingStats {
  correct: number
  incorrect: number
  skipped: number
}

export type TrainingResult = "correct" | "incorrect" | "skipped" | null

export function getSeriesProgress(series: VocabSeries): number {
  if (series.words.length === 0) return 0
  const mastered = series.words.filter((w) => w.mastered).length
  return Math.round((mastered / series.words.length) * 100)
}

export function getGlobalProgress(allSeries: VocabSeries[]): number {
  const totalWords = allSeries.reduce((sum, s) => sum + s.words.length, 0)
  if (totalWords === 0) return 0
  const totalMastered = allSeries.reduce(
    (sum, s) => sum + s.words.filter((w) => w.mastered).length,
    0
  )
  return Math.round((totalMastered / totalWords) * 100)
}

export const SUPPORTED_LANGUAGES = [
  { code: "fr", label: "Francais" },
  { code: "en", label: "Anglais" },
  { code: "es", label: "Espagnol" },
  { code: "de", label: "Allemand" },
  { code: "it", label: "Italien" },
  { code: "pt", label: "Portugais" },
  { code: "nl", label: "Neerlandais" },
  { code: "ja", label: "Japonais" },
  { code: "zh", label: "Chinois" },
  { code: "ar", label: "Arabe" },
] as const

export function getLanguageLabel(code: string): string {
  return SUPPORTED_LANGUAGES.find((l) => l.code === code)?.label ?? code
}

export function getSeriesById(id: number): VocabSeries | undefined {
  return mockAllSeries.find((s) => s.id === id)
}

export const mockAllSeries: VocabSeries[] = [
  {
    id: 1,
    name: "Les vetements",
    sourceLanguage: "en",
    targetLanguage: "fr",
    isFavorite: true,
    words: [
      { id: 1, source: "skirt", translation: "jupe", isFavorite: true, mastered: true },
      { id: 2, source: "pants", translation: "pantalon", isFavorite: false, mastered: true },
      { id: 3, source: "socks", translation: "chaussettes", isFavorite: true, mastered: true },
      { id: 4, source: "shirt", translation: "chemise", isFavorite: false, mastered: false },
      { id: 5, source: "jacket", translation: "veste", isFavorite: true, mastered: true },
      { id: 6, source: "dress", translation: "robe", isFavorite: false, mastered: true },
      { id: 7, source: "hat", translation: "chapeau", isFavorite: false, mastered: false },
      { id: 8, source: "shoes", translation: "chaussures", isFavorite: true, mastered: true },
      { id: 9, source: "coat", translation: "manteau", isFavorite: false, mastered: true },
      { id: 10, source: "scarf", translation: "echarpe", isFavorite: true, mastered: true },
      { id: 11, source: "gloves", translation: "gants", isFavorite: false, mastered: false },
      { id: 12, source: "belt", translation: "ceinture", isFavorite: false, mastered: true },
    ],
  },
  {
    id: 2,
    name: "Les emotions",
    sourceLanguage: "en",
    targetLanguage: "fr",
    isFavorite: false,
    words: [
      { id: 13, source: "happy", translation: "heureux", isFavorite: true, mastered: true },
      { id: 14, source: "sad", translation: "triste", isFavorite: false, mastered: true },
      { id: 15, source: "angry", translation: "en colere", isFavorite: true, mastered: false },
      { id: 16, source: "scared", translation: "effraye", isFavorite: false, mastered: true },
      { id: 17, source: "surprised", translation: "surpris", isFavorite: false, mastered: false },
      { id: 18, source: "excited", translation: "excite", isFavorite: true, mastered: true },
      { id: 19, source: "tired", translation: "fatigue", isFavorite: false, mastered: false },
      { id: 20, source: "proud", translation: "fier", isFavorite: false, mastered: true },
    ],
  },
  {
    id: 3,
    name: "La nourriture",
    sourceLanguage: "en",
    targetLanguage: "fr",
    isFavorite: true,
    words: [
      { id: 21, source: "bread", translation: "pain", isFavorite: true, mastered: true },
      { id: 22, source: "cheese", translation: "fromage", isFavorite: true, mastered: true },
      { id: 23, source: "apple", translation: "pomme", isFavorite: false, mastered: true },
      { id: 24, source: "chicken", translation: "poulet", isFavorite: false, mastered: true },
      { id: 25, source: "rice", translation: "riz", isFavorite: false, mastered: true },
      { id: 26, source: "butter", translation: "beurre", isFavorite: true, mastered: true },
      { id: 27, source: "milk", translation: "lait", isFavorite: false, mastered: true },
      { id: 28, source: "egg", translation: "oeuf", isFavorite: false, mastered: true },
      { id: 29, source: "sugar", translation: "sucre", isFavorite: false, mastered: false },
      { id: 30, source: "salt", translation: "sel", isFavorite: false, mastered: true },
    ],
  },
  {
    id: 4,
    name: "Les animaux",
    sourceLanguage: "en",
    targetLanguage: "fr",
    isFavorite: false,
    words: [
      { id: 31, source: "dog", translation: "chien", isFavorite: true, mastered: true },
      { id: 32, source: "cat", translation: "chat", isFavorite: true, mastered: true },
      { id: 33, source: "bird", translation: "oiseau", isFavorite: false, mastered: false },
      { id: 34, source: "fish", translation: "poisson", isFavorite: false, mastered: false },
      { id: 35, source: "horse", translation: "cheval", isFavorite: false, mastered: true },
      { id: 36, source: "rabbit", translation: "lapin", isFavorite: true, mastered: false },
    ],
  },
  {
    id: 5,
    name: "Les couleurs",
    sourceLanguage: "en",
    targetLanguage: "fr",
    isFavorite: false,
    words: [
      { id: 37, source: "red", translation: "rouge", isFavorite: false, mastered: false },
      { id: 38, source: "blue", translation: "bleu", isFavorite: false, mastered: false },
      { id: 39, source: "green", translation: "vert", isFavorite: false, mastered: false },
      { id: 40, source: "yellow", translation: "jaune", isFavorite: false, mastered: false },
      { id: 41, source: "black", translation: "noir", isFavorite: false, mastered: false },
      { id: 42, source: "white", translation: "blanc", isFavorite: false, mastered: false },
      { id: 43, source: "orange", translation: "orange", isFavorite: false, mastered: false },
    ],
  },
]

// Backward compatibility alias
export const mockSeries: VocabSeries = mockAllSeries[0]
