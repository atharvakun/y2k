import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

/** Cute Y2K window frame: pastel title bar with three dots. */
export function Window({ title, children, className, bar = "bg-white", bodyClass }: { title: string; children: ReactNode; className?: string; bar?: string; bodyClass?: string }) {
  return (
    <div className={cn("overflow-hidden rounded-[24px] border-[3px] border-ink bg-white shadow-[6px_6px_0_#0e0e0e]", className)}>
      <div className={cn("flex items-center gap-2 border-b-[3px] border-ink px-4 py-2 font-pixel text-xl", bar)}>
        <span className="size-3 rounded-full bg-coral" /><span className="size-3 rounded-full bg-sun" /><span className="size-3 rounded-full bg-grass" />
        <span className="ml-2 truncate">{title}</span>
      </div>
      <div className={cn("p-5", bodyClass)}>{children}</div>
    </div>
  )
}
