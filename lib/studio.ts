/**
 * Vine&Bloom site copy.
 *
 * The inquiry form opens the visitor's email app addressed to `studio.email`.
 * This site does not send or store messages.
 *
 * Photographs are reference images (Unsplash) while the studio builds its
 * own portfolio. Swap the files in `public/images` and update `alt` text here.
 * Sources:
 * - brand.png: studio poster (supplied artwork)
 * - logo.png: barrel logo
 * - hero: photo-1487530811176-3780de880c2d
 * - jar: photo-1563241527-3004b7be0ffd
 * - sonoma: photo-1761067673321-1874c9bb391f (Sonoma, CA)
 * - arch: photo-1529636798458-92182e662485
 * - bouquet: photo-1521520368710-3ab197656d60
 * - roses: photo-1582794543139-8ac9cb0f7b11
 * - white: photo-1766910700520-698f0bf334b2
 * - golden: photo-1763786470689-5ff88c985885
 * - table: photo-1519225421980-715cb0215aed
 */

export const studio = {
  name: "Vine&Bloom",
  descriptor: "Floral design studio",
  city: "Healdsburg",
  region: "California",
  email: "vineandbloomdesign@gmail.com",
  phone: "(707) 321-1296",
  phoneHref: "tel:+17073211296",
  hours: "Tuesday–Saturday, by appointment",
  area: "Healdsburg and the valleys nearby",
} as const

export const nav = [
  { href: "#studio", label: "Studio" },
  { href: "#services", label: "Services" },
  { href: "#seasons", label: "Seasons" },
  { href: "#mood", label: "Mood" },
  { href: "#visit", label: "Visit" },
] as const

export const valleys = [
  "Healdsburg",
  "Dry Creek Valley",
  "Alexander Valley",
  "Russian River",
] as const

export const services = [
  {
    number: "01",
    title: "Weddings",
    copy: "Ceremonies, aisles, and the tables that follow. Lawns, barns, and ridges across Dry Creek, Alexander Valley, and the Russian River.",
  },
  {
    number: "02",
    title: "Winery & estate gatherings",
    copy: "Harvest lunches, club weekends, and tasting-room parties. Flowers that hold up in a breeze and still look considered at dusk.",
  },
  {
    number: "03",
    title: "Private dinners",
    copy: "A centerpiece, a mantel, a line of small glasses down a kitchen table. Birthdays, house weekends, and the dinners that are the whole occasion.",
  },
  {
    number: "04",
    title: "Weekly flowers",
    copy: "A standing arrangement for a home or a tasting room in Healdsburg. The palette changes with the market. Vessels go out and come back.",
  },
] as const

export type SeasonId = "winter" | "spring" | "summer" | "autumn"

export const seasons: {
  id: SeasonId
  name: string
  months: string
  stems: string[]
  copy: string
}[] = [
  {
    id: "winter",
    name: "Winter",
    months: "December – February",
    stems: ["Citrus", "Olive", "Hellebore", "Anemone"],
    copy: "Low arrangements with room for candles. Cream, leaf, and a wine-dark accent.",
  },
  {
    id: "spring",
    name: "Spring",
    months: "March – May",
    stems: ["Ranunculus", "Sweet pea", "Lilac", "Garden rose"],
    copy: "Plaza ceremonies and flowers that still feel a little wild, before the heat settles in.",
  },
  {
    id: "summer",
    name: "Summer",
    months: "June – August",
    stems: ["Cosmos", "Zinnia", "Garden rose", "Stone fruit"],
    copy: "Flowers that spend the afternoon outside and still look fresh when the glasses are refilled.",
  },
  {
    id: "autumn",
    name: "Autumn",
    months: "September – November",
    stems: ["Dahlia", "Amaranth", "Fig leaf", "Harvest color"],
    copy: "Long tables, earlier sunsets, linen the color of dust. This is the signature season.",
  },
]

export function seasonForDate(date: Date): SeasonId {
  const month = date.getMonth()
  if (month <= 1 || month === 11) return "winter"
  if (month <= 4) return "spring"
  if (month <= 7) return "summer"
  return "autumn"
}

export const frames = [
  {
    src: "/images/hero.jpg",
    alt: "A hand-held bouquet of cream and apricot roses, purple blooms, eucalyptus, and red berries.",
    caption: "Cream roses, berries, and eucalyptus",
    className: "sm:col-span-5",
    aspect: "aspect-[4/5]",
  },
  {
    src: "/images/arch.jpg",
    alt: "A wooden ceremony arch draped in ivory cloth and a cascading arrangement of garden roses, with green hills behind it.",
    caption: "Ceremony arch in garden roses",
    className: "sm:col-span-7",
    aspect: "aspect-[4/3] sm:aspect-auto sm:h-full",
  },
  {
    src: "/images/bouquet.jpg",
    alt: "A hand-tied bouquet of white carnations, cream roses, a blush bloom, and eucalyptus, resting on lace.",
    caption: "Hand-tied bouquet in cream and blush",
    className: "sm:col-span-4",
    aspect: "aspect-[3/4]",
  },
  {
    src: "/images/roses.jpg",
    alt: "A close view of blush garden roses and dark leaves.",
    caption: "Garden roses",
    className: "sm:col-span-4",
    aspect: "aspect-[3/4]",
  },
  {
    src: "/images/white.jpg",
    alt: "White roses mixed with round eucalyptus leaves.",
    caption: "White roses and eucalyptus",
    className: "sm:col-span-4",
    aspect: "aspect-[3/4]",
  },
  {
    src: "/images/golden.jpg",
    alt: "Grapevines in golden hour light, with leaves turning yellow and rust.",
    caption: "Harvest light on the vines",
    className: "sm:col-span-12",
    aspect: "aspect-[16/10] sm:aspect-[21/9]",
  },
  {
    src: "/images/table.jpg",
    alt: "A long dining table set with small glass jars of roses and greenery.",
    caption: "Small arrangements along a long table",
    className: "sm:col-span-12",
    aspect: "aspect-[16/10] sm:aspect-[21/9]",
  },
] as const

export const steps = [
  {
    number: "01",
    title: "Write",
    copy: "Tell us the date, the place, and the feeling you want in the room.",
  },
  {
    number: "02",
    title: "Meet",
    copy: "A studio visit in Healdsburg, or a call if you are still choosing the venue.",
  },
  {
    number: "03",
    title: "Propose",
    copy: "A palette, a plan, and a written figure before anything is ordered.",
  },
  {
    number: "04",
    title: "Set the day",
    copy: "We design, deliver, and style on site, then collect the vessels.",
  },
] as const

export const questions = [
  {
    q: "How early should we get in touch?",
    a: "For a wedding, write when the venue is held. For a dinner, two or three weeks is often enough. Weekly flowers can start on the next delivery day.",
  },
  {
    q: "Where do you work?",
    a: "Healdsburg and the valleys around it. Farther into Sonoma County, and sometimes beyond, when the day calls for it.",
  },
  {
    q: "Do vessels come with the flowers?",
    a: "Yes. We deliver them with the arrangements and collect them afterward.",
  },
  {
    q: "How is the work priced?",
    a: "You receive a written figure once we know the date, the place, and the scale. Flowers are ordered after you approve it.",
  },
] as const

export const occasions = [
  "Wedding",
  "Winery or estate gathering",
  "Private dinner",
  "Weekly flowers",
  "Something else",
] as const
