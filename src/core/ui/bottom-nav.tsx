"use client"

import { usePathname, useRouter } from "next/navigation"
import { BookOpen, GraduationCap, PlusCircle } from "lucide-react"
import { cn } from "@/lib/utils"

interface NavItem {
  label: string
  href: string
  icon: React.ComponentType<{ className?: string }>
  matchPaths: string[]
}

const navItems: NavItem[] = [
  {
    label: "Mes series",
    href: "/",
    icon: BookOpen,
    matchPaths: ["/", "/series"],
  },
  {
    label: "Creer",
    href: "/create",
    icon: PlusCircle,
    matchPaths: ["/create"],
  },
  {
    label: "Entrainement",
    href: "/train",
    icon: GraduationCap,
    matchPaths: ["/train"],
  },
]

function isActive(pathname: string, matchPaths: string[]): boolean {
  return matchPaths.some((mp) => {
    if (mp === "/") return pathname === "/"
    return pathname.startsWith(mp)
  })
}

export function BottomNav() {
  const pathname = usePathname()
  const router = useRouter()

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-40 mx-auto max-w-md border-t border-border/50 bg-background/95 backdrop-blur-md"
      role="navigation"
      aria-label="Navigation principale"
    >
      {/* Safe area spacer for notch devices */}
      <div className="flex items-stretch justify-around px-2 pb-[env(safe-area-inset-bottom,8px)]">
        {navItems.map((item) => {
          const active = isActive(pathname, item.matchPaths)
          const Icon = item.icon

          return (
            <button
              key={item.href}
              onClick={() => router.push(item.href)}
              className={cn(
                "relative flex flex-1 flex-col items-center gap-0.5 py-2.5 transition-colors",
                active
                  ? "text-primary"
                  : "text-muted-foreground/60 hover:text-muted-foreground"
              )}
              aria-current={active ? "page" : undefined}
              aria-label={item.label}
            >
              <Icon
                className={cn(
                  "h-[22px] w-[22px] transition-all",
                  active && "scale-105"
                )}
              />
              <span
                className={cn(
                  "text-[10px] leading-tight tracking-wide",
                  active ? "font-bold" : "font-medium"
                )}
              >
                {item.label}
              </span>
              {active && (
                <span className="absolute top-0 h-[2px] w-12 rounded-full bg-primary" />
              )}
            </button>
          )
        })}
      </div>
    </nav>
  )
}
