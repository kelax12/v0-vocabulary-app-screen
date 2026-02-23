"use client"

import { useState, useRef, useEffect } from "react"
import { ChevronDown, Check } from "lucide-react"
import { SUPPORTED_LANGUAGES, getLanguageLabel } from "@/lib/data"
import { cn } from "@/lib/utils"

interface LanguageSelectorProps {
  label: string
  value: string
  onChange: (code: string) => void
  disabledCode?: string
}

export function LanguageSelector({
  label,
  value,
  onChange,
  disabledCode,
}: LanguageSelectorProps) {
  const [isOpen, setIsOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <div className="flex-1" ref={ref}>
      <label className="mb-1.5 block text-[12px] font-semibold uppercase tracking-wider text-muted-foreground">
        {label}
      </label>
      <div className="relative">
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          className={cn(
            "flex h-12 w-full items-center justify-between rounded-[14px] border bg-background px-4 text-[15px] font-medium text-foreground transition-all",
            isOpen ? "border-primary ring-2 ring-primary/20" : "border-border"
          )}
        >
          <span>{value ? getLanguageLabel(value) : "Choisir..."}</span>
          <ChevronDown
            className={cn(
              "h-4 w-4 text-muted-foreground transition-transform duration-200",
              isOpen && "rotate-180"
            )}
          />
        </button>

        {isOpen && (
          <div className="absolute left-0 right-0 top-[calc(100%+4px)] z-50 max-h-52 overflow-y-auto rounded-[14px] border border-border bg-background py-1 shadow-[0_8px_32px_rgba(0,0,0,0.08)]">
            {SUPPORTED_LANGUAGES.map((lang) => {
              const isDisabled = lang.code === disabledCode
              const isSelected = lang.code === value
              return (
                <button
                  key={lang.code}
                  type="button"
                  disabled={isDisabled}
                  onClick={() => {
                    if (!isDisabled) {
                      onChange(lang.code)
                      setIsOpen(false)
                    }
                  }}
                  className={cn(
                    "flex w-full items-center justify-between px-4 py-2.5 text-left text-[14px] transition-colors",
                    isDisabled
                      ? "cursor-not-allowed text-muted-foreground/40"
                      : "text-foreground hover:bg-secondary",
                    isSelected && "font-semibold text-primary"
                  )}
                >
                  <span>{lang.label}</span>
                  {isSelected && (
                    <Check className="h-4 w-4 text-primary" />
                  )}
                </button>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
