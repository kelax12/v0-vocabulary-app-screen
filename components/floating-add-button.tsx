"use client"

import { Plus } from "lucide-react"

interface FloatingAddButtonProps {
  onClick: () => void
}

export function FloatingAddButton({ onClick }: FloatingAddButtonProps) {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-8 right-6 z-30 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-[0_4px_20px_rgba(29,60,255,0.35)] transition-all hover:bg-accent hover:shadow-[0_6px_28px_rgba(29,60,255,0.45)] active:scale-90 md:right-[calc(50%-224px+20px)]"
      aria-label="Creer une nouvelle serie"
    >
      <Plus className="h-6 w-6" strokeWidth={2.5} />
    </button>
  )
}
