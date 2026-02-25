"use client"

import { Search, Plus } from "lucide-react"

interface SearchBarProps {
  value: string
  onChange: (value: string) => void
  onAdd?: () => void
}

export function SearchBar({ value, onChange, onAdd }: SearchBarProps) {
  return (
    <div className="px-5 pb-4">
      <div className="relative flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-[16px] w-[16px] -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Rechercher"
            className="h-12 w-full rounded-[18px] bg-secondary pl-11 pr-4 text-[15px] font-normal text-foreground placeholder:text-muted-foreground/60 transition-all outline-none focus:ring-2 focus:ring-primary focus:bg-background"
          />
        </div>
        {onAdd && (
          <button
            onClick={onAdd}
            className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-sm transition-all hover:opacity-90 active:scale-95"
          >
            <Plus className="h-5 w-5" />
          </button>
        )}
      </div>
    </div>
  )
}
