"use client"

import { usePathname } from "next/navigation"
import { BottomNav } from "@/core/ui/bottom-nav"

const HIDDEN_NAV_PATHS: string[] = []
// BottomNav is always visible on all pages

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const hideNav = HIDDEN_NAV_PATHS.some((p) => pathname.startsWith(p))

  return (
    <>
      {children}
      {!hideNav && <BottomNav />}
    </>
  )
}
