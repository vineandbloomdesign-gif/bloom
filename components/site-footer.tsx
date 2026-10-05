import { Mark } from "@/components/mark"
import { nav, studio } from "@/lib/studio"

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-5 py-12 md:flex-row md:items-end md:justify-between md:px-8">
        <div>
          <a href="#top" className="inline-flex items-center gap-2.5">
            <Mark className="size-8 text-primary" />
            <span className="font-heading text-2xl tracking-tight">
              Vine<span className="italic text-primary">&</span>Bloom
            </span>
          </a>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted-foreground">
            {studio.descriptor}
            <br />
            {studio.city}, {studio.region}
          </p>
        </div>

        <nav className="flex flex-wrap gap-x-6 gap-y-2" aria-label="Footer">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm text-foreground/75 hover:text-foreground"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="text-sm leading-relaxed text-muted-foreground md:text-right">
          <a
            className="text-foreground underline decoration-border underline-offset-4 hover:decoration-primary"
            href={`mailto:${studio.email}`}
          >
            {studio.email}
          </a>
          <p className="mt-2">{studio.hours}</p>
          <p className="mt-6 text-xs">
            © {new Date().getFullYear()} {studio.name}
          </p>
        </div>
      </div>
    </footer>
  )
}
