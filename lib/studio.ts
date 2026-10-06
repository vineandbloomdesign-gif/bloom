/**
 * Vine&Bloom site copy.
 *
 * The inquiry form opens the visitor's email app addressed to `studio.email`.
 * This site does not send or store messages.
 *
 * Photographs are reference images (Unsplash) while the studio builds its
 * own portfolio. Swap the files in `public/images` and update `alt` text here.
 * Sources:
 * - hero: photo-1487530811176-3780de880c2d
 * - jar: photo-1563241527-3004b7be0ffd
 * - sonoma: photo-1761067673321-1874c9bb391f (Sonoma, CA)
 * - arch: photo-1529636798458-92182e662485
 * - bouquet: photo-1521520368710-3ab197656d60
 * - roses: photo-1582794543139-8ac9cb0f7b11
 * - white: photo-1766910700520-698f0bf334b2
 * - golden: photo-1763786470689-5ff88c985885
 * - table: photo-1519225421980-715cb0215aed
 * - memorial-wreath.jpg: sympathy wreath for memorial services
 */

export const studio = {
  name: "Vine&Bloom",
  descriptor: "Floral design studio",
  street: "20 Healdsburg Ave",
  city: "Healdsburg",
  region: "California",
  regionCode: "CA",
  postalCode: "95448",
  email: "vineandbloomdesign@gmail.com",
  phone: "(707) 321-1296",
  phoneHref: "tel:+17073211296",
  hours: "Tuesday–Saturday, by appointment",
  area: "Healdsburg and the valleys nearby",
  founded: "2026",
  memorialLine: "Loved by many, forgotten by none.",
  mapQuery: "20 Healdsburg Ave, Healdsburg, CA 95448",
} as const

const mapQuery = encodeURIComponent(studio.mapQuery)

export const mapLinks = {
  embed: `https://maps.google.com/maps?q=${mapQuery}&z=16&hl=en&output=embed`,
  open: `https://www.google.com/maps/search/?api=1&query=${mapQuery}`,
} as const

export const nav = [
  { href: "/about", label: "About" },
  { href: "/#services", label: "Services" },
  { href: "/memorial", label: "Memorial" },
  { href: "/#seasons", label: "Seasons" },
  { href: "/#mood", label: "Mood" },
  { href: "/order", label: "Order" },
  { href: "/visit", label: "Visit" },
] as const

export const founder = {
  name: "Grace Hayes",
  role: "Founder, Vine & Bloom Floral",
  tagline:
    "Rooted in Healdsburg. Inspired by the land. Growing beauty for generations.",
  welcome:
    "Welcome to Vine & Bloom — where every design begins with a story and every bloom has a place to grow.",
} as const

export const story = [
  "Vine & Bloom Floral began with a lifelong connection to the land, the seasons, and the beauty of Healdsburg.",
  "Growing up on West Dry Creek Road, surrounded by the vineyards, gardens, and open spaces of Sonoma County, I learned from an early age to appreciate the simple magic of nature. My childhood was shaped by time spent outdoors, watching things grow, noticing the changing seasons, and understanding the connection between people and the land around them.",
  "Those early experiences planted the seeds for everything Vine & Bloom represents today.",
  "Flowers have always been a way to celebrate life’s most meaningful moments. They bring joy to celebrations, comfort during difficult times, and beauty into everyday life. Through floral design, I found a way to share the same sense of wonder and connection that I experienced growing up in Healdsburg.",
  "My passion for nature also led me to create opportunities for children to experience the beauty of gardening firsthand. Through teaching garden programs, I help young minds discover where food comes from, how plants grow, and why protecting our natural world matters. Watching children experience the excitement of planting a seed or discovering something growing in the garden reminds me of the same curiosity and appreciation that shaped my own childhood.",
  "Vine & Bloom Floral is the joining of those passions — flowers, gardening, creativity, and community.",
  "Located in the heart of Healdsburg, our floral studio creates thoughtfully designed arrangements inspired by Sonoma County’s gardens, vineyards, and seasons. Every piece is created with intention, whether it is a celebration, a remembrance, a wedding, or simply a way to bring beauty into someone’s day.",
  "This business is more than flowers. It is a return to my roots, a celebration of the place that raised me, and a way to share the beauty of nature with the community I love.",
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
    title: "Memorial services",
    copy: "Sprays, standing arrangements, and a bouquet to set down by hand. For the service, the home, and the graveside.",
  },
  {
    number: "05",
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
    src: "/images/arch.jpg",
    alt: "A wooden ceremony arch draped in ivory cloth and a cascading arrangement of garden roses, with green hills behind it.",
    caption: "Ceremony arch in garden roses",
    className: "sm:col-span-7",
    aspect: "aspect-[4/3]",
  },
  {
    src: "/images/bouquet.jpg",
    alt: "A hand-tied bouquet of white carnations, cream roses, a blush bloom, and eucalyptus, resting on lace.",
    caption: "Hand-tied bouquet in cream and blush",
    className: "sm:col-span-5",
    aspect: "aspect-[4/3] sm:aspect-auto sm:h-full",
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
    className: "sm:col-span-4",
    aspect: "aspect-[3/4]",
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
    a: "For a wedding, write when the venue is held. For a dinner, two or three weeks is often enough. For a memorial, write as soon as you know the day. Weekly flowers can start on the next delivery day.",
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
  "Memorial service",
  "Weekly flowers",
  "Something else",
] as const
