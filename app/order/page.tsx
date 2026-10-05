import type { Metadata } from "next"

import { WalkInOrder } from "@/components/walk-in-order"
import { studio } from "@/lib/studio"

export const metadata: Metadata = {
  title: "Walk-in order · Vine&Bloom",
  description: `Order Vine&Bloom flowers by the stem and set the time they will be ready for pickup in ${studio.city}.`,
}

export default function OrderPage() {
  return (
    <main id="content" className="flex-1">
      <section className="no-print mx-auto w-full max-w-6xl px-5 pt-12 pb-8 md:px-8 md:pt-16">
        <p className="text-[0.72rem] font-medium uppercase tracking-[0.22em] text-primary">
          Walk-in · {studio.city}
        </p>
        <h1 className="mt-4 max-w-[14ch] font-heading text-[clamp(3rem,6vw,5.2rem)] leading-[0.92] tracking-[-0.035em]">
          Order by the <em className="font-light italic">stem.</em>
        </h1>
        <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground">
          Choose the flowers, see the price of each stem, and set the time
          the bouquet will be ready to pick up at the studio.
        </p>
      </section>
      <WalkInOrder />
    </main>
  )
}
