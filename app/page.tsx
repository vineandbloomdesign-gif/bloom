import Image from "next/image"

import { InquiryForm } from "@/components/inquiry-form"
import { Button } from "@/components/ui/button"
import { SeasonGrid } from "@/components/season-grid"
import { frames, questions, services, steps, studio, valleys } from "@/lib/studio"

export default function Home() {
  return (
    <main id="content" className="flex-1">
      <section className="mx-auto grid w-full max-w-6xl items-end gap-10 px-5 pt-12 pb-14 md:px-8 md:pt-16 lg:grid-cols-12 lg:gap-12 lg:pb-20">
        <div className="lg:col-span-6 lg:pb-4">
          <p className="text-[0.72rem] font-medium uppercase tracking-[0.22em] text-primary">
            {studio.descriptor} · {studio.city}, {studio.region}
          </p>
          <h1 className="mt-5 max-w-[12ch] font-heading text-[clamp(3.4rem,7.2vw,6.5rem)] leading-[0.9] tracking-[-0.035em] text-foreground">
            Flowers for the <em className="font-light italic">long table.</em>
          </h1>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-muted-foreground">
            Vine&Bloom composes seasonal flowers for winery weddings, estate
            gatherings, and the arrangement that lives on the kitchen table.
            Healdsburg is home. The valleys around it are the work.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button
              nativeButton={false}
              render={<a href="#visit" />}
              className="h-12 rounded-md px-6 text-base hover:bg-wine-deep"
            >
              Plan a gathering
            </Button>
            <Button
              nativeButton={false}
              render={<a href="#mood" />}
              variant="outline"
              className="h-12 rounded-md bg-card px-6 text-base"
            >
              See the mood
            </Button>
          </div>
        </div>

        <figure className="lg:col-span-6">
          <div className="relative aspect-[4/5] overflow-hidden bg-muted">
            <Image
              src="/images/hero.jpg"
              alt="A hand-held bouquet of cream and apricot roses, purple blooms, eucalyptus, and red berries."
              fill
              priority
              sizes="(min-width: 1024px) 46vw, 100vw"
              className="object-cover"
            />
          </div>
          <figcaption className="mt-3 flex items-baseline justify-between gap-4 text-sm text-muted-foreground">
            <span>Cream roses, berries, and eucalyptus</span>
            <span className="shrink-0 text-[0.68rem] uppercase tracking-[0.16em]">
              Reference
            </span>
          </figcaption>
        </figure>
      </section>

      <div className="border-y border-border">
        <p className="mx-auto flex w-full max-w-6xl flex-wrap gap-x-4 gap-y-2 px-5 py-4 text-[0.72rem] font-medium uppercase tracking-[0.18em] text-muted-foreground md:px-8">
          {valleys.map((valley, index) => (
            <span key={valley} className="inline-flex items-center gap-4">
              {index > 0 ? <span aria-hidden="true">·</span> : null}
              {valley}
            </span>
          ))}
        </p>
      </div>

      <section id="studio" className="mx-auto grid w-full max-w-6xl gap-10 px-5 py-20 md:px-8 md:py-28 lg:grid-cols-12 lg:items-center lg:gap-16">
        <div className="lg:col-span-5">
          <div className="relative aspect-[4/5] overflow-hidden bg-muted">
            <Image
              src="/images/jar.jpg"
              alt="A jar of blush garden roses, peony, and eucalyptus tied with a silk ribbon, sitting on a wooden table."
              fill
              sizes="(min-width: 1024px) 38vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
        <div className="lg:col-span-6 lg:col-start-7">
          <p className="text-[0.72rem] font-medium uppercase tracking-[0.22em] text-primary">
            The studio
          </p>
          <h2 className="mt-4 font-heading text-4xl leading-[1.05] tracking-tight text-balance md:text-5xl">
            A new studio, rooted in Healdsburg.
          </h2>
          <div className="mt-6 space-y-4 text-base leading-relaxed text-muted-foreground md:text-lg">
            <p>
              We design the way the county grows: one season at a time. Sweet
              pea and ranunculus when the plaza wakes up. Garden roses through
              the long afternoons. Dahlia, fig, and grape leaf when the light
              turns gold. Citrus, olive, and candlelight when the hills go
              quiet.
            </p>
            <p>
              We buy from Sonoma growers and finish every piece in the studio
              before it leaves for the venue. The flowers should look gathered
              from a garden that happens to sit beside a vineyard.
            </p>
          </div>
          <dl className="mt-8 grid gap-4 border-t border-border pt-6 sm:grid-cols-3">
            {[
              ["Visits", "By appointment"],
              ["Days", "Tue–Sat"],
              ["Reach", "The valleys nearby"],
            ].map(([term, detail]) => (
              <div key={term}>
                <dt className="text-[0.68rem] uppercase tracking-[0.16em] text-muted-foreground">
                  {term}
                </dt>
                <dd className="mt-1 font-heading text-xl tracking-tight">
                  {detail}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="px-5 md:px-8">
        <div className="relative mx-auto min-h-[28rem] w-full max-w-6xl overflow-hidden">
          <Image
            src="/images/sonoma.jpg"
            alt="Autumn vineyard rows in Sonoma County, with yellow vines and a forested ridge behind them."
            fill
            sizes="(min-width: 1152px) 1152px, 100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#1a120f]/80 via-[#1a120f]/45 to-[#1a120f]/10" />
          <div className="relative flex min-h-[28rem] max-w-lg flex-col justify-end p-7 text-[#faf6f1] md:p-12">
            <p className="text-[0.72rem] font-medium uppercase tracking-[0.22em] text-[#f0ddd4]">
              Sonoma County
            </p>
            <h2 className="mt-3 font-heading text-4xl leading-[1.05] tracking-tight md:text-5xl">
              The hills set the palette.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-[#f6efe6]/90 md:text-lg">
              Autumn vines, redwood ridges, and a town small enough that the
              week still gathers around the plaza. We design for that light.
            </p>
          </div>
        </div>
      </section>

      <section id="services" className="mx-auto w-full max-w-6xl px-5 py-20 md:px-8 md:py-28">
        <div className="max-w-2xl">
          <p className="text-[0.72rem] font-medium uppercase tracking-[0.22em] text-primary">
            What we design
          </p>
          <h2 className="mt-4 font-heading text-4xl leading-[1.05] tracking-tight md:text-5xl">
            Five kinds of days.
          </h2>
        </div>
        <ol className="mt-12 border-t border-border">
          {services.map((service) => (
            <li
              key={service.number}
              className="grid gap-3 border-b border-border py-7 md:grid-cols-12 md:items-baseline md:gap-8"
            >
              <span className="font-heading text-2xl text-primary md:col-span-2">
                {service.number}
              </span>
              <h3 className="font-heading text-3xl tracking-tight md:col-span-4">
                {service.title}
              </h3>
              <p className="text-base leading-relaxed text-muted-foreground md:col-span-6">
                {service.copy}
              </p>
            </li>
          ))}
        </ol>
      </section>

      <section id="memorial" className="border-t border-border">
        <div className="mx-auto grid w-full max-w-6xl items-center gap-10 px-5 py-20 md:px-8 md:py-28 lg:grid-cols-12 lg:gap-16">
          <figure className="lg:col-span-5">
            <div className="relative aspect-[3/4] overflow-hidden bg-muted">
              <Image
                src="/images/memorial.jpg"
                alt="Graveside flowers: red roses and sunflowers beside headstones, with a wrapped bouquet on the grass."
                fill
                sizes="(min-width: 1024px) 38vw, 100vw"
                className="object-cover"
              />
            </div>
            <figcaption className="mt-4 font-heading text-2xl leading-snug tracking-tight text-foreground italic md:text-[1.7rem]">
              {studio.memorialLine}
            </figcaption>
          </figure>
          <div className="lg:col-span-6 lg:col-start-7">
            <p className="text-[0.72rem] font-medium uppercase tracking-[0.22em] text-primary">
              Memorial services
            </p>
            <h2 className="mt-4 font-heading text-4xl leading-[1.05] tracking-tight md:text-5xl">
              Flowers for the people we keep.
            </h2>
            <div className="mt-6 space-y-4 text-base leading-relaxed text-muted-foreground md:text-lg">
              <p>
                We design for the service, the home, and the graveside. A
                spray, a standing arrangement, or a bouquet you set down by
                hand.
              </p>
              <p>
                Tell us the day and the place. If the time is short, write
                anyway. We will do what the day allows.
              </p>
            </div>
            <Button
              nativeButton={false}
              render={<a href="#visit" />}
              className="mt-8 h-12 rounded-md px-6 text-base hover:bg-wine-deep"
            >
              Plan a memorial
            </Button>
          </div>
        </div>
      </section>

      <section id="seasons" className="border-y border-border bg-muted/50">
        <div className="mx-auto w-full max-w-6xl px-5 py-20 md:px-8 md:py-28">
          <div className="max-w-2xl">
            <p className="text-[0.72rem] font-medium uppercase tracking-[0.22em] text-primary">
              The year
            </p>
            <h2 className="mt-4 font-heading text-4xl leading-[1.05] tracking-tight md:text-5xl">
              What the season is asking for.
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
              The studio works with what is growing. The month you are in is
              marked on the calendar below.
            </p>
          </div>
          <SeasonGrid />
        </div>
      </section>

      <section id="mood" className="mx-auto w-full max-w-6xl px-5 py-20 md:px-8 md:py-28">
        <div className="flex max-w-2xl flex-col gap-5">
          <p className="text-[0.72rem] font-medium uppercase tracking-[0.22em] text-primary">
            The mood
          </p>
          <h2 className="font-heading text-4xl leading-[1.05] tracking-tight md:text-5xl">
            The feeling of the work.
          </h2>
          <p className="text-lg leading-relaxed text-muted-foreground">
            Vine&Bloom is just opening. These photographs are the mood we
            design toward. As real gatherings are set, they will take this
            place on the page.
          </p>
        </div>
        <ul className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-12">
          {frames.map((frame) => (
            <li key={frame.src} className={frame.className}>
              <figure className={`relative overflow-hidden bg-muted ${frame.aspect}`}>
                <Image
                  src={frame.src}
                  alt={frame.alt}
                  fill
                  sizes="(min-width: 1024px) 60vw, 100vw"
                  className="object-cover motion-safe:transition-transform motion-safe:duration-700 motion-safe:hover:scale-[1.03]"
                />
                <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/25 to-transparent p-4 pt-16 text-[#faf6f1]">
                  <span className="block text-[0.65rem] uppercase tracking-[0.16em] text-white/75">
                    Reference
                  </span>
                  <span className="mt-1 block text-sm">{frame.caption}</span>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </section>

      <section className="border-t border-border">
        <div className="mx-auto w-full max-w-6xl px-5 py-20 md:px-8 md:py-28">
          <div className="max-w-2xl">
            <p className="text-[0.72rem] font-medium uppercase tracking-[0.22em] text-primary">
              The path
            </p>
            <h2 className="mt-4 font-heading text-4xl leading-[1.05] tracking-tight md:text-5xl">
              How a gathering comes together.
            </h2>
          </div>
          <ol className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step) => (
              <li key={step.number}>
                <p className="font-heading text-3xl text-primary">{step.number}</p>
                <h3 className="mt-3 font-heading text-2xl tracking-tight">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {step.copy}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-t border-border">
        <div className="mx-auto grid w-full max-w-6xl gap-10 px-5 py-20 md:px-8 md:py-28 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="text-[0.72rem] font-medium uppercase tracking-[0.22em] text-primary">
              Practicalities
            </p>
            <h2 className="mt-4 font-heading text-4xl leading-[1.05] tracking-tight">
              Before you write.
            </h2>
          </div>
          <div className="lg:col-span-8">
            {questions.map((item) => (
              <details
                key={item.q}
                className="group border-b border-border"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 font-heading text-2xl tracking-tight [&::-webkit-details-marker]:hidden">
                  {item.q}
                  <span
                    aria-hidden="true"
                    className="text-primary transition-transform duration-200 group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <p className="max-w-2xl pb-6 text-base leading-relaxed text-muted-foreground">
                  {item.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section id="visit" className="bg-wine-deep text-[#faf6f1]">
        <div className="mx-auto grid w-full max-w-6xl gap-12 px-5 py-20 md:px-8 md:py-28 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="text-[0.72rem] font-medium uppercase tracking-[0.22em] text-[#f0ddd4]">
              Begin
            </p>
            <h2 className="mt-4 font-heading text-4xl leading-[1.05] tracking-tight md:text-5xl">
              Tell us about the day.
            </h2>
            <p className="mt-5 max-w-md text-base leading-relaxed text-[#f6efe6]/85 md:text-lg">
              A few lines are enough to start. The studio in {studio.city}{" "}
              welcomes visitors {studio.hours.toLowerCase()}.
            </p>
            <dl className="mt-8 space-y-4 text-sm">
              <div>
                <dt className="text-[0.68rem] uppercase tracking-[0.16em] text-[#f0ddd4]">
                  Studio
                </dt>
                <dd className="mt-1 text-lg">
                  {studio.city}, {studio.region}
                </dd>
              </div>
              <div>
                <dt className="text-[0.68rem] uppercase tracking-[0.16em] text-[#f0ddd4]">
                  Email
                </dt>
                <dd className="mt-1">
                  <a
                    className="text-lg underline decoration-white/30 underline-offset-4 hover:decoration-white"
                    href={`mailto:${studio.email}`}
                  >
                    {studio.email}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-[0.68rem] uppercase tracking-[0.16em] text-[#f0ddd4]">
                  Phone
                </dt>
                <dd className="mt-1">
                  <a
                    className="text-lg underline decoration-white/30 underline-offset-4 hover:decoration-white"
                    href={studio.phoneHref}
                  >
                    {studio.phone}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-[0.68rem] uppercase tracking-[0.16em] text-[#f0ddd4]">
                  Hours
                </dt>
                <dd className="mt-1 text-lg">{studio.hours}</dd>
              </div>
            </dl>
          </div>
          <div className="bg-[#f7f3ec] p-5 text-foreground sm:p-8 lg:col-span-7">
            <InquiryForm />
          </div>
        </div>
      </section>
    </main>
  )
}
