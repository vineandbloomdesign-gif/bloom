import type { Metadata } from "next"
import Image from "next/image"

import { WeddingInquiry } from "@/components/wedding-inquiry"
import { formatMoney } from "@/lib/arrangements"
import { publicPath } from "@/lib/public-path"
import { studio } from "@/lib/studio"
import { weddingPackages } from "@/lib/wedding"

const basic = weddingPackages[0]
const custom = weddingPackages[1]

export const metadata: Metadata = {
  title: "Weddings · Vine&Bloom",
  description: `Wedding flowers from Vine&Bloom in ${studio.city}. A basic package starts at ${formatMoney(basic.startsAt)} for the bridal bouquet, bridesmaid bouquets, and boutonnieres. A custom wedding starts at ${formatMoney(custom.startsAt)}.`,
}

export default function WeddingPage() {
  return (
    <main id="content" className="flex-1">
      <section className="no-print mx-auto grid w-full max-w-6xl items-center gap-10 px-5 pt-12 pb-12 md:px-8 md:pt-16 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <div className="relative aspect-[3/4] overflow-hidden bg-muted">
            <Image
              src={publicPath("/images/wedding-table.jpg")}
              alt="A long wooden wedding table in a garden, set with a floral runner of red roses, eucalyptus, and candles under string lights."
              fill
              priority
              sizes="(min-width: 1024px) 38vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
        <div className="lg:col-span-6 lg:col-start-7">
          <p className="text-[0.72rem] font-medium uppercase tracking-[0.22em] text-primary">
            Weddings · {studio.city}
          </p>
          <h1 className="mt-4 font-heading text-[clamp(3rem,6vw,5.2rem)] leading-[0.92] tracking-[-0.035em]">
            Flowers for the <em className="font-light italic">wedding.</em>
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground">
            The basic package starts at {formatMoney(basic.startsAt)}: a bridal
            bouquet, bridesmaid bouquets, and boutonnieres. A custom wedding
            starts at {formatMoney(custom.startsAt)}.
          </p>
        </div>
      </section>
      <WeddingInquiry />
    </main>
  )
}
