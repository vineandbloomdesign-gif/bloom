import Image from "next/image"

import { Button } from "@/components/ui/button"
import { formatMoney } from "@/lib/arrangements"
import { publicPath } from "@/lib/public-path"
import { shopItemUrl, shopItems } from "@/lib/shop"
import { shopUrl, studio } from "@/lib/studio"

export function HarvestOrderCta({ headingId }: { headingId: string }) {
  return (
    <section aria-labelledby={headingId} className="bg-card">
      <div className="mx-auto grid w-full max-w-6xl items-center gap-10 px-5 py-16 md:px-8 md:py-20 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-7">
          <p className="text-[0.72rem] font-medium uppercase tracking-[0.22em] text-primary">
            Walk in · Order of the day
          </p>
          <h2
            id={headingId}
            className="mt-4 font-heading text-4xl leading-[1.05] tracking-tight md:text-5xl"
          >
            Order now.
          </h2>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground">
            Scan the code, or tap an item, and pay on the {studio.city} shop
            before pickup. The code opens the full shop: arrangements, roses,
            stands, and sympathy pieces.
          </p>
          <Button
            nativeButton={false}
            render={
              <a href={shopUrl} target="_blank" rel="noreferrer" />
            }
            className="mt-8 h-12 rounded-md px-6 text-base hover:bg-wine-deep"
          >
            Pay before pickup
          </Button>
        </div>
        <div className="lg:col-span-5">
          <a
            href={shopUrl}
            target="_blank"
            rel="noreferrer"
            className="mx-auto block w-full max-w-xs bg-white p-4 ring-1 ring-border transition-colors hover:ring-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            <Image
              src={publicPath("/images/harvest-order-qr.png")}
              alt=""
              width={784}
              height={784}
              className="h-auto w-full"
            />
            <span className="mt-3 block text-center font-heading text-2xl tracking-tight">
              Order now
            </span>
            <span className="mt-1 block text-center text-sm text-muted-foreground">
              All items · tap or scan
            </span>
          </a>
        </div>
      </div>
      <div className="mx-auto w-full max-w-6xl px-5 pb-16 md:px-8 md:pb-20">
        <p className="text-[0.72rem] font-medium uppercase tracking-[0.22em] text-primary">
          All items
        </p>
        <ul className="mt-4 grid sm:grid-cols-2 sm:gap-x-12">
          {shopItems.map((item) => (
            <li key={item.slug} className="border-b border-border">
              <a
                href={shopItemUrl(item.slug)}
                target="_blank"
                rel="noreferrer"
                className="flex items-baseline justify-between gap-4 py-3 text-base hover:text-primary"
              >
                <span>{item.name}</span>
                <span className="shrink-0 tabular-nums text-primary">
                  {formatMoney(item.price)}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
