import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"

import { founder, story, studio } from "@/lib/studio"

export const metadata: Metadata = {
  title: "About · Vine&Bloom",
  description: `${founder.tagline} The story of ${founder.name}, founder of Vine & Bloom Floral in ${studio.city}.`,
}

export default function AboutPage() {
  const [opening, ...rest] = story
  const closing = rest[rest.length - 1]
  const body = rest.slice(0, -1)

  return (
    <main id="content" className="flex-1">
      <section className="mx-auto grid w-full max-w-6xl items-end gap-10 px-5 pt-12 pb-14 md:px-8 md:pt-16 lg:grid-cols-12 lg:gap-16 lg:pb-20">
        <div className="lg:col-span-7">
          <p className="text-[0.72rem] font-medium uppercase tracking-[0.22em] text-primary">
            About · Est. {studio.founded}
          </p>
          <h1 className="mt-4 max-w-[12ch] font-heading text-[clamp(3rem,6.4vw,5.6rem)] leading-[0.92] tracking-[-0.035em]">
            Rooted in <em className="font-light italic">Healdsburg.</em>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground md:text-xl">
            {founder.tagline}
          </p>
          <p className="mt-8 font-heading text-2xl tracking-tight">
            {founder.name}
          </p>
          <p className="text-sm text-muted-foreground">{founder.role}</p>
        </div>
        <div className="lg:col-span-5">
          <div className="relative mx-auto aspect-square w-full max-w-sm">
            <Image
              src="/images/logo.png"
              alt="Vine and Bloom barrel mark, Healdsburg, California, established 2026."
              fill
              priority
              sizes="(min-width: 1024px) 24rem, 80vw"
              className="object-contain"
            />
          </div>
        </div>
      </section>

      <section className="border-t border-border">
        <div className="mx-auto grid w-full max-w-6xl gap-12 px-5 py-16 md:px-8 md:py-24 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="text-[0.72rem] font-medium uppercase tracking-[0.22em] text-primary">
              The story
            </p>
            <p className="mt-4 font-heading text-3xl leading-snug tracking-tight md:text-4xl">
              {opening}
            </p>
          </div>
          <div className="space-y-6 text-base leading-relaxed text-muted-foreground md:text-lg lg:col-span-7 lg:col-start-6">
            {body.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            <p className="text-foreground">{closing}</p>
            <p className="pt-4 font-heading text-2xl leading-snug tracking-tight text-foreground">
              {founder.welcome}
            </p>
            <p className="text-sm">
              <span className="text-foreground">{founder.name}</span>
              <span className="text-muted-foreground"> · {founder.role}</span>
            </p>
          </div>
        </div>
      </section>

      <section className="px-5 pb-16 md:px-8 md:pb-24">
        <div className="relative mx-auto min-h-[24rem] w-full max-w-6xl overflow-hidden">
          <Image
            src="/images/sonoma.jpg"
            alt="Autumn vineyard rows in Sonoma County, with yellow vines and a forested ridge behind them."
            fill
            sizes="(min-width: 1152px) 1152px, 100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#1a120f]/80 via-[#1a120f]/40 to-transparent" />
          <div className="relative flex min-h-[24rem] max-w-lg flex-col justify-end p-7 text-[#faf6f1] md:p-12">
            <p className="text-[0.72rem] font-medium uppercase tracking-[0.22em] text-[#f0ddd4]">
              The studio
            </p>
            <p className="mt-3 font-heading text-4xl leading-[1.05] tracking-tight">
              {studio.street}
            </p>
            <p className="mt-2 text-lg">
              {studio.city}, {studio.regionCode} {studio.postalCode}
            </p>
            <p className="mt-4 max-w-sm text-base leading-relaxed text-[#f6efe6]/90">
              {studio.hours}. Call {studio.phone}, or write {studio.email}.
            </p>
            <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3 text-sm">
              <Link
                href="/visit"
                className="underline decoration-white/30 underline-offset-4 hover:decoration-white"
              >
                Visit
              </Link>
              <Link
                href="/order"
                className="underline decoration-white/30 underline-offset-4 hover:decoration-white"
              >
                Order a harvest arrangement
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
