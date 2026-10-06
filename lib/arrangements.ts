export type Arrangement = {
  id: string
  name: string
  /** Price for one arrangement, in cents. */
  price: number
  scale: string
  copy: string
}

/**
 * Seasonal harvest arrangements. Small is $75 and large is $200.
 * Change a price here and the order page follows.
 */
export const arrangements: Arrangement[] = [
  {
    id: "small",
    name: "Small",
    price: 7500,
    scale: "A hand-tied bunch",
    copy: "For a kitchen table, a bedside, or a gift on the way through town.",
  },
  {
    id: "medium",
    name: "Medium",
    price: 12500,
    scale: "The house arrangement",
    copy: "Enough flowers for a dining table or a front hall.",
  },
  {
    id: "large",
    name: "Large",
    price: 20000,
    scale: "A harvest piece",
    copy: "A generous arrangement for a sideboard, a gathering, or the center of a long table.",
  },
]

export function formatMoney(cents: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(cents / 100)
}
