import type { Metadata } from "next"

import { SympathyOrder } from "@/components/sympathy-order"
import { formatMoney } from "@/lib/arrangements"
import { studio } from "@/lib/studio"
import { casketDeluxePrice, sympathySizes } from "@/lib/sympathy"

const small = sympathySizes[0]
const wreathDeluxe = sympathySizes[sympathySizes.length - 1]

export const metadata: Metadata = {
  title: "Sympathy · Vine&Bloom",
  description: `Order a sympathy wreath or casket spray from Vine&Bloom in ${studio.city}. Hearts, crosses, and circles from ${formatMoney(small.price)} to ${formatMoney(wreathDeluxe.price)}. A full deluxe casket spray is ${formatMoney(casketDeluxePrice)}.`,
}

export default function MemorialOrderPage() {
  return (
    <main id="content" className="flex-1">
      <section className="no-print mx-auto w-full max-w-6xl px-5 pt-12 pb-8 md:px-8 md:pt-16">
        <p className="text-[0.72rem] font-medium uppercase tracking-[0.22em] text-primary">
          Memorial · {studio.city}
        </p>
        <h1 className="mt-4 max-w-[12em] font-heading text-[clamp(3rem,6vw,5.2rem)] leading-[0.92] tracking-[-0.035em]">
          Flowers for those we cherish.
        </h1>
        <p className="mt-5 max-w-xl font-heading text-2xl leading-snug tracking-tight italic text-foreground">
          {studio.memorialLine}
        </p>
        <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground">
          Hearts, crosses, and circle wreaths from {formatMoney(small.price)} to{" "}
          {formatMoney(wreathDeluxe.price)}. A full deluxe casket spray is{" "}
          {formatMoney(casketDeluxePrice)}.
        </p>
      </section>
      <SympathyOrder />
    </main>
  )
}
