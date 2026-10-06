import { orderCode } from "@/lib/order"
import { studio } from "@/lib/studio"

export type WeddingCountKey =
  | "bridesmaids"
  | "boutonnieres"
  | "tables"
  | "bar"
  | "backdrop"

export type WeddingPiece = {
  id: string
  name: string
  copy: string
  /** Fixed count when the package is chosen. */
  fixed?: number
  countKey?: WeddingCountKey
  min: number
  max: number
}

export type WeddingPackage = {
  id: string
  name: string
  copy: string
  pieces: WeddingPiece[]
}

/** The basic package is the wedding party. The others are added as the day needs them. */
export const weddingPackages: WeddingPackage[] = [
  {
    id: "basic",
    name: "Basic wedding package",
    copy: "The flowers the wedding party carries.",
    pieces: [
      {
        id: "bridal",
        name: "Bridal bouquet",
        copy: "One bouquet for the bride.",
        fixed: 1,
        min: 1,
        max: 1,
      },
      {
        id: "bridesmaids",
        name: "Bridesmaid bouquets",
        copy: "One bouquet for each bridesmaid.",
        countKey: "bridesmaids",
        min: 0,
        max: 16,
      },
      {
        id: "boutonnieres",
        name: "Boutonnieres",
        copy: "For the partner, the groomsmen, and anyone else who wears one.",
        countKey: "boutonnieres",
        min: 0,
        max: 24,
      },
    ],
  },
  {
    id: "tables",
    name: "Table arrangements",
    copy: "Centerpieces and runners for the guest tables.",
    pieces: [
      {
        id: "tables",
        name: "Table arrangements",
        copy: "One arrangement, or one runner, for each table.",
        countKey: "tables",
        min: 1,
        max: 40,
      },
    ],
  },
  {
    id: "bar",
    name: "Bar arrangements",
    copy: "Flowers for the bar.",
    pieces: [
      {
        id: "bar",
        name: "Bar arrangements",
        copy: "One piece for the bar, or one for each bar.",
        countKey: "bar",
        min: 1,
        max: 6,
      },
    ],
  },
  {
    id: "backdrop",
    name: "Backdrop pieces",
    copy: "Florals for an arch, a wall, or the place guests take a photograph.",
    pieces: [
      {
        id: "backdrop",
        name: "Backdrop pieces",
        copy: "How many separate pieces the backdrop needs.",
        countKey: "backdrop",
        min: 1,
        max: 8,
      },
    ],
  },
]

export const defaultWeddingCounts: Record<WeddingCountKey, number> = {
  bridesmaids: 1,
  boutonnieres: 1,
  tables: 1,
  bar: 1,
  backdrop: 1,
}

export type WeddingLine = {
  name: string
  quantity: number
}

export type WeddingSelection = {
  name: string
  lines: WeddingLine[]
}

export type WeddingRequest = {
  code: string
  name: string
  phone: string
  day: string
  venue: string
  note: string
  packages: WeddingSelection[]
}

export function pieceCount(
  piece: WeddingPiece,
  counts: Record<WeddingCountKey, number>
) {
  if (piece.fixed != null) return piece.fixed
  if (!piece.countKey) return 0
  const value = counts[piece.countKey]
  return Math.min(piece.max, Math.max(piece.min, value))
}

export function selectionFor(
  pkg: WeddingPackage,
  counts: Record<WeddingCountKey, number>
): WeddingSelection {
  return {
    name: pkg.name,
    lines: pkg.pieces
      .map((piece) => ({
        name: piece.name,
        quantity: pieceCount(piece, counts),
      }))
      .filter((line) => line.quantity > 0),
  }
}

export function validateWeddingDate(date: string, now = new Date()) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) return "missing" as const
  const today = new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Los_Angeles",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(now)
  if (date < today) return "past" as const
  return null
}

export function weddingDateMessage(issue: "missing" | "past") {
  if (issue === "missing") return "Set the wedding day."
  return "That day has already passed. Choose the wedding day."
}

export function formatWeddingDay(date: string) {
  const [year, month, day] = date.split("-").map(Number)
  if (!year || !month || !day) return date
  return new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(Date.UTC(year, month - 1, day)))
}

export function composeWedding(request: WeddingRequest) {
  const blocks = request.packages.flatMap((pkg) => [
    pkg.name,
    ...pkg.lines.map((line) => `  ${line.name} × ${line.quantity}`),
    "",
  ])
  const note = request.note.trim()
  return [
    `Wedding ${request.code}`,
    `Name: ${request.name}`,
    `Phone: ${request.phone}`,
    `Wedding day: ${request.day}`,
    `Venue: ${request.venue}`,
    "",
    ...blocks,
    note ? `Note: ${note}` : "",
  ]
    .filter((line, index, all) => line !== "" || (index > 0 && all[index - 1] !== ""))
    .join("\n")
    .trim()
}

export function weddingMailto(request: WeddingRequest, body: string) {
  const subject = `Vine&Bloom wedding ${request.code} · ${request.day}`
  return `mailto:${studio.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}

export function newWeddingCode() {
  return orderCode()
}
