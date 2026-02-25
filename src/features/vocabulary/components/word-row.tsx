"use client"

import { Trash2 } from "lucide-react"

interface WordRowProps {
  index: number
  source: string
  target: string
  onSourceChange: (value: string) => void
  onTargetChange: (value: string) => void
  onRemove: () => void
  canRemove: boolean
  sourceRef?: React.Ref<HTMLInputElement>
}

export function WordRow({
  source,
  target,
  onSourceChange,
  onTargetChange,
  onRemove,
  canRemove,
  sourceRef,
}: WordRowProps) {
  return (
    <div className="flex items-center gap-2">
      <input
        ref={sourceRef}
        type="text"
        value={source}
        onChange={(e) => onSourceChange(e.target.value)}
        placeholder="Mot"
        className="h-11 min-w-0 flex-1 rounded-[14px] border border-border bg-background px-3.5 text-[14px] font-medium text-foreground placeholder:text-muted-foreground/40 transition-all outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
      />
      <span className="shrink-0 text-[13px] font-bold text-muted-foreground/40">
        =
      </span>
      <input
        type="text"
        value={target}
        onChange={(e) => onTargetChange(e.target.value)}
        placeholder="Traduction"
        className="h-11 min-w-0 flex-1 rounded-[14px] border border-border bg-background px-3.5 text-[14px] font-medium text-foreground placeholder:text-muted-foreground/40 transition-all outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
      />
      <button
        type="button"
        onClick={onRemove}
        disabled={!canRemove}
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-muted-foreground/30 transition-all hover:bg-red-50 hover:text-red-400 disabled:pointer-events-none disabled:opacity-30 active:scale-90"
        aria-label="Supprimer ce mot"
      >
        <Trash2 className="h-4 w-4" />
      </button>
    </div>
  )
}
