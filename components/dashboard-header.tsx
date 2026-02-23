"use client"

interface DashboardHeaderProps {
  globalProgress: number
}

export function DashboardHeader({ globalProgress }: DashboardHeaderProps) {
  return (
    <header className="px-5 pb-4 pt-14">
      <h1 className="text-[28px] font-bold leading-tight tracking-tight text-foreground text-balance">
        Mes series
      </h1>
      <div className="mt-3 flex items-center gap-3">
        <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-secondary">
          <div
            className="h-full rounded-full bg-primary transition-all duration-700 ease-out"
            style={{ width: `${globalProgress}%` }}
            role="progressbar"
            aria-valuenow={globalProgress}
            aria-valuemin={0}
            aria-valuemax={100}
          />
        </div>
        <span className="text-[13px] font-semibold tabular-nums text-primary">
          {globalProgress}%
        </span>
      </div>
      <p className="mt-1.5 text-[12px] font-medium text-muted-foreground">
        Progression globale
      </p>
    </header>
  )
}
