import type { Metadata } from "next"
import Link from "next/link"

import { HarvestOrderCta } from "@/components/harvest-order-cta"
import { InquiryForm } from "@/components/inquiry-form"
import { mapLinks, studio } from "@/lib/studio"

export const metadata: Metadata = {
  title: "Visit · Vine&Bloom",
  description: `Find Vine&Bloom in ${studio.city}, California. Call ${studio.phone} or write ${studio.email}. ${studio.hours}.`,
}

export default function VisitPage() {
  return (
    <main id="content" className="flex-1">
      <section className="mx-auto grid w-full max-w-6xl items-start gap-10 px-5 pt-12 pb-16 md:px-8 md:pt-16 lg:grid-cols-12 lg:gap-12 lg:pb-20">
        <div className="lg:col-span-5">
          <p className="text-[0.72rem] font-medium uppercase tracking-[0.22em] text-primary">
            Visit · {studio.city}
          </p>
          <h1 className="mt-4 font-heading text-[clamp(3rem,6vw,5.2rem)] leading-[0.92] tracking-[-0.035em]">
            Come by, <em className="font-light italic">or call.</em>
          </h1>
          <p className="mt-5 max-w-md text-lg leading-relaxed text-muted-foreground">
            The studio is in {studio.city}. {studio.hours}.
          </p>

          <dl className="mt-8 space-y-5 border-t border-border pt-8">
            <div>
              <dt className="text-[0.68rem] uppercase tracking-[0.16em] text-primary">
                Location
              </dt>
              <dd className="mt-1 font-heading text-3xl leading-tight tracking-tight">
                {studio.street}
                <span className="mt-1 block text-xl font-sans font-normal text-muted-foreground">
                  {studio.city}, {studio.regionCode} {studio.postalCode}
                </span>
              </dd>
            </div>
            <div>
              <dt className="text-[0.68rem] uppercase tracking-[0.16em] text-primary">
                Phone
              </dt>
              <dd className="mt-1">
                <a
                  className="font-heading text-3xl tracking-tight underline decoration-border underline-offset-4 hover:decoration-primary"
                  href={studio.phoneHref}
                >
                  {studio.phone}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-[0.68rem] uppercase tracking-[0.16em] text-primary">
                Email
              </dt>
              <dd className="mt-1">
                <a
                  className="text-lg underline decoration-border underline-offset-4 hover:decoration-primary"
                  href={`mailto:${studio.email}`}
                >
                  {studio.email}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-[0.68rem] uppercase tracking-[0.16em] text-primary">
                Hours
              </dt>
              <dd className="mt-1 text-lg">{studio.hours}</dd>
            </div>
          </dl>

          <a
            className="mt-8 inline-flex h-12 items-center rounded-md bg-primary px-6 text-base text-primary-foreground hover:bg-wine-deep"
            href={mapLinks.open}
            target="_blank"
            rel="noreferrer"
          >
            Open in Google Maps
          </a>
        </div>

        <div className="lg:col-span-7">
          <div className="overflow-hidden border border-border bg-muted">
            <iframe
              title={`Google map of ${studio.mapQuery}`}
              src={mapLinks.embed}
              className="h-[420px] w-full lg:h-[640px]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
          <p className="mt-3 text-sm text-muted-foreground">
            {studio.mapQuery}. Call ahead so the studio is open for you.
          </p>
        </div>
      </section>

      <div className="border-y border-border">
        <HarvestOrderCta headingId="visit-order-now" />
      </div>

      <section id="write" className="bg-wine-deep text-[#faf6f1]">
        <div className="mx-auto grid w-full max-w-6xl gap-12 px-5 py-20 md:px-8 md:py-28 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="text-[0.72rem] font-medium uppercase tracking-[0.22em] text-[#f0ddd4]">
              Write
            </p>
            <h2 className="mt-4 font-heading text-4xl leading-[1.05] tracking-tight md:text-5xl">
              Tell us about the day.
            </h2>
            <p className="mt-5 max-w-md text-base leading-relaxed text-[#f6efe6]/85 md:text-lg">
              A few lines are enough to start. Or call{" "}
              <a className="underline decoration-white/30 underline-offset-4 hover:decoration-white" href={studio.phoneHref}>
                {studio.phone}
              </a>{" "}
              and write{" "}
              <a className="underline decoration-white/30 underline-offset-4 hover:decoration-white" href={`mailto:${studio.email}`}>
                {studio.email}
              </a>
              .
            </p>
            <p className="mt-6">
              <Link
                href="/order"
                className="text-lg underline decoration-white/30 underline-offset-4 hover:decoration-white"
              >
                Order a harvest arrangement
              </Link>
            </p>
          </div>
          <div className="bg-[#f7f3ec] p-5 text-foreground sm:p-8 lg:col-span-7">
            <InquiryForm />
          </div>
        </div>
      </section>
    </main>
  )
}
