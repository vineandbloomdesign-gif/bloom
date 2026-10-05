export type StemGroup = "Blooms" | "Greenery"

export type Stem = {
  id: string
  name: string
  group: StemGroup
  /** Price for one stem, in cents. */
  price: number
}

/**
 * Walk-in stem prices. Change a number here and the order page follows.
 * Prices are the flower only. The studio does not add a delivery charge
 * on this page.
 */
export const stems: Stem[] = [
  { id: "garden-rose", name: "Garden rose", group: "Blooms", price: 800 },
  { id: "spray-rose", name: "Spray rose", group: "Blooms", price: 400 },
  { id: "ranunculus", name: "Ranunculus", group: "Blooms", price: 600 },
  { id: "dahlia", name: "Dahlia", group: "Blooms", price: 800 },
  { id: "anemone", name: "Anemone", group: "Blooms", price: 700 },
  { id: "lisianthus", name: "Lisianthus", group: "Blooms", price: 500 },
  { id: "snapdragon", name: "Snapdragon", group: "Blooms", price: 500 },
  { id: "sunflower", name: "Sunflower", group: "Blooms", price: 600 },
  { id: "calla", name: "Calla lily", group: "Blooms", price: 900 },
  { id: "hydrangea", name: "Hydrangea", group: "Blooms", price: 1600 },
  { id: "eucalyptus", name: "Eucalyptus", group: "Greenery", price: 400 },
  { id: "ruscus", name: "Italian ruscus", group: "Greenery", price: 300 },
  { id: "waxflower", name: "Waxflower", group: "Greenery", price: 450 },
]

export const stemGroups: StemGroup[] = ["Blooms", "Greenery"]

export function formatMoney(cents: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(cents / 100)
}
