import type { Metadata } from "next"

import { HarvestOrder } from "@/components/harvest-order"
import { formatMoney, arrangements } from "@/lib/arrangements"
import { studio } from "@/lib/studio"

const small = arrangements[0]
const large = arrangements[arrangements.length - 1]

export const metadata: Metadata = {
  title: "Seasonal harvest · Vine&Bloom",
  description: `Order a seasonal harvest arrangement from Vine&Bloom in ${studio.city}. Three sizes, from ${formatMoney(small.price)} to ${formatMoney(large.price)}.`,
}

export default function OrderPage() {
  return (
    <main id="content" className="flex-1">
      <section className="no-print mx-auto w-full max-w-6xl px-5 pt-12 pb-8 md:px-8 md:pt-16">
        <p className="text-[0.72rem] font-medium uppercase tracking-[0.22em] text-primary">
          Seasonal harvest · {studio.city}
        </p>
        <h1 className="mt-4 max-w-[14ch] font-heading text-[clamp(3rem,6vw,5.2rem)] leading-[0.92] tracking-[-0.035em]">
          Flowers from the <em className="font-light italic">week.</em>
        </h1>
        <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground">
          A harvest arrangement in three sizes,{" "}
          {formatMoney(small.price)} to {formatMoney(large.price)}. Pay on
          the studio shop before pickup. We build it from what is growing,
          then have it ready at the time you choose.
        </p>
      </section>
      <HarvestOrder />
    </main>
  )
}
