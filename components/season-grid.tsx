"use client"

import { useSyncExternalStore } from "react"

import { cn } from "cn"
import { seasonForDate, seasons, type SeasonId } from "@/lib/studio"

function subscribe() {
  return () => {}
}

function seasonSnapshot() {
  return seasonForDate(new Date())
}

function seasonOnServer(): SeasonId | null {
  return null
}

export function SeasonGrid() {
  const current = useSyncExternalStore(
    subscribe,
    seasonSnapshot,
    seasonOnServer
  )

  return (
    <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {seasons.map((season) => {
        const active = season.id === current
        return (
          <article
            key={season.id}
            className={cn(
              "flex flex-col border p-5",
              active
                ? "border-primary bg-card"
                : "border-border bg-background/40"
            )}
          >
            <div className="flex items-center justify-between gap-3">
              <h3 className="font-heading text-3xl tracking-tight">
                {season.name}
              </h3>
              {active ? (
                <span className="rounded-full bg-primary px-2.5 py-1 text-[0.65rem] font-medium uppercase tracking-[0.16em] text-primary-foreground">
                  Now
                </span>
              ) : null}
            </div>
            <p className="mt-2 text-xs uppercase tracking-[0.16em] text-muted-foreground">
              {season.months}
            </p>
            <p className="mt-4 text-sm leading-relaxed text-foreground/85">
              {season.copy}
            </p>
            <ul className="mt-5 flex flex-wrap gap-2">
              {season.stems.map((stem) => (
                <li
                  key={stem}
                  className="border border-border bg-background px-2.5 py-1 text-xs text-foreground/80"
                >
                  {stem}
                </li>
              ))}
            </ul>
          </article>
        )
      })}
    </div>
  )
}
