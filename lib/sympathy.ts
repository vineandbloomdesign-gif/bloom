import { formatMoney } from "@/lib/arrangements"
import { pacificInstant } from "@/lib/pickup"

export type SympathyForm = {
  id: string
  name: string
  copy: string
}

export type SympathySize = {
  id: string
  name: string
  /** Price for one piece, in cents. */
  price: number
  copy: string
}

/** Hearts, crosses, circles, and casket sprays share one price scale. */
export const sympathyForms: SympathyForm[] = [
  {
    id: "heart",
    name: "Heart",
    copy: "A wreath in the shape of a heart.",
  },
  {
    id: "cross",
    name: "Cross",
    copy: "A standing cross of flowers.",
  },
  {
    id: "circle",
    name: "Circle",
    copy: "A round sympathy wreath.",
  },
  {
    id: "casket",
    name: "Casket spray",
    copy: "Flowers laid across the casket.",
  },
]

/** Small is $250. Full deluxe is $1,000. */
export const sympathySizes: SympathySize[] = [
  {
    id: "small",
    name: "Small",
    price: 25000,
    copy: "A modest wreath or spray for the service or the home.",
  },
  {
    id: "medium",
    name: "Medium",
    price: 50000,
    copy: "A fuller piece for the service.",
  },
  {
    id: "large",
    name: "Large",
    price: 75000,
    copy: "A generous design with more flower and more presence.",
  },
  {
    id: "deluxe",
    name: "Full deluxe",
    price: 100000,
    copy: "The largest piece we make, for the casket or the front of the service.",
  },
]

export const sympathyCopy = {
  title: "Sympathy",
  when: "Needed",
  count: "Pieces",
  subject: "sympathy",
} as const

export function sympathyRange() {
  const small = sympathySizes[0]
  const deluxe = sympathySizes[sympathySizes.length - 1]
  return `${formatMoney(small.price)} to ${formatMoney(deluxe.price)}`
}

export function validateServiceWhen(
  date: string,
  time: string,
  now = new Date()
) {
  if (!date || !time) return "missing" as const
  if (pacificInstant(date, time).getTime() <= now.getTime()) return "past" as const
  return null
}

export function serviceIssueMessage(issue: "missing" | "past") {
  if (issue === "missing") return "Set the day and time of the service."
  return "That time has already passed. Choose a later time."
}
