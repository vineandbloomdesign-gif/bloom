"use client"

import { MinusIcon, PlusIcon } from "lucide-react"
import { useId, useRef, useState, type FormEvent } from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { studio } from "@/lib/studio"
import {
  composeWedding,
  defaultWeddingCounts,
  formatWeddingDay,
  newWeddingCode,
  pieceCount,
  selectionFor,
  validateWeddingDate,
  weddingDateMessage,
  weddingMailto,
  weddingPackages,
  type WeddingCountKey,
  type WeddingRequest,
} from "@/lib/wedding"

type Field = "packages" | "date" | "venue" | "name" | "phone"
type Errors = Partial<Record<Field, string>>

function openMailbox(href: string) {
  window.location.assign(href)
}

function digits(value: string) {
  return value.replace(/\D/g, "")
}

export function WeddingInquiry() {
  const formId = useId()
  const slipRef = useRef<HTMLHeadingElement>(null)
  const [chosen, setChosen] = useState<Record<string, boolean>>({ basic: true })
  const [counts, setCounts] = useState(defaultWeddingCounts)
  const [weddingDate, setWeddingDate] = useState("")
  const [errors, setErrors] = useState<Errors>({})
  const [request, setRequest] = useState<WeddingRequest | null>(null)
  const [note, setNote] = useState("")
  const [copied, setCopied] = useState(false)

  function togglePackage(id: string) {
    setChosen((current) => ({ ...current, [id]: !current[id] }))
    setErrors((current) => ({ ...current, packages: undefined }))
  }

  function changeCount(key: WeddingCountKey, next: number) {
    setCounts((current) => ({ ...current, [key]: next }))
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const element = event.currentTarget
    const data = new FormData(element)
    if (String(data.get("company") || "").trim()) {
      setRequest({
        code: "VB-NOTE",
        name: "Studio",
        phone: studio.phone,
        day: "Not set",
        venue: "",
        note: "",
        packages: [],
      })
      return
    }

    const name = String(data.get("name") || "").trim()
    const phone = String(data.get("phone") || "").trim()
    const venue = String(data.get("venue") || "").trim()
    const message = String(data.get("note") || "").trim()
    const selected = weddingPackages.filter((pkg) => chosen[pkg.id])
    const nextErrors: Errors = {}
    if (selected.length === 0) {
      nextErrors.packages = "Choose the basic package, or add tables, the bar, or a backdrop."
    }
    const dateIssue = validateWeddingDate(weddingDate, new Date())
    if (dateIssue) nextErrors.date = weddingDateMessage(dateIssue)
    if (venue.length < 2) nextErrors.venue = "Tell us the venue."
    if (name.length < 2) nextErrors.name = "Add a name."
    if (digits(phone).length < 10) nextErrors.phone = "Add a phone number we can call."
    setErrors(nextErrors)

    const first = (Object.keys(nextErrors) as Field[])[0]
    if (first) {
      const fieldName = first === "packages" ? "" : first === "date" ? "wedding-date" : first
      const target = fieldName
        ? element.querySelector<HTMLElement>(`[name="${fieldName}"]`)
        : document.getElementById(`${formId}-packages`)
      target?.focus()
      return
    }

    const nextRequest: WeddingRequest = {
      code: newWeddingCode(),
      name,
      phone,
      day: formatWeddingDay(weddingDate),
      venue,
      note: message,
      packages: selected.map((pkg) => selectionFor(pkg, counts)),
    }
    const body = composeWedding(nextRequest)
    setNote(body)
    setRequest(nextRequest)
    window.setTimeout(() => slipRef.current?.focus(), 0)
    openMailbox(weddingMailto(nextRequest, body))
  }

  async function copySlip() {
    try {
      await navigator.clipboard.writeText(`To: ${studio.email}\n\n${note}`)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      setCopied(false)
    }
  }

  if (request) {
    return (
      <section className="mx-auto w-full max-w-3xl px-5 pb-24 md:px-8">
        <div className="border border-border bg-card p-6 sm:p-10">
          <p className="text-[0.72rem] font-medium uppercase tracking-[0.22em] text-primary">
            Wedding
          </p>
          <h2
            ref={slipRef}
            tabIndex={-1}
            className="mt-3 font-heading text-4xl tracking-tight outline-none"
          >
            {request.day}.
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            Request {request.code} is addressed to {studio.email}. Send the note
            from your email app. If it did not open, copy the slip below. We
            will write back with the flowers and the cost.
          </p>
          <dl className="mt-8 grid gap-6 border-y border-border py-6 sm:grid-cols-2">
            <div>
              <dt className="text-[0.68rem] uppercase tracking-[0.16em] text-muted-foreground">
                Wedding day
              </dt>
              <dd className="mt-1 font-heading text-2xl tracking-tight">{request.day}</dd>
            </div>
            <div>
              <dt className="text-[0.68rem] uppercase tracking-[0.16em] text-muted-foreground">
                Venue
              </dt>
              <dd className="mt-1 text-lg">{request.venue}</dd>
              <dd className="mt-2 text-muted-foreground">
                {request.name}
                <br />
                {request.phone}
              </dd>
            </div>
          </dl>
          <ul className="mt-6 space-y-5">
            {request.packages.map((pkg) => (
              <li key={pkg.name}>
                <p className="font-heading text-2xl tracking-tight">{pkg.name}</p>
                <ul className="mt-2 space-y-1 text-muted-foreground">
                  {pkg.lines.map((line) => (
                    <li key={line.name}>
                      {line.name} × {line.quantity}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
          <pre className="mt-8 overflow-x-auto border border-border bg-background p-4 text-sm leading-relaxed whitespace-pre-wrap">
            {note}
          </pre>
          <Button
            type="button"
            variant="outline"
            className="mt-6 h-11 rounded-md bg-card px-5"
            onClick={copySlip}
          >
            {copied ? "Copied" : "Copy the slip"}
          </Button>
        </div>
      </section>
    )
  }

  return (
    <form
      className="mx-auto grid w-full max-w-6xl gap-12 px-5 pb-24 md:px-8 lg:grid-cols-12 lg:gap-16"
      onSubmit={onSubmit}
      noValidate
    >
      <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
        <label>
          Company
          <input name="company" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="lg:col-span-7">
        <p
          id={`${formId}-packages`}
          tabIndex={-1}
          className="text-[0.72rem] font-medium uppercase tracking-[0.22em] text-primary outline-none"
        >
          The packages
        </p>
        {errors.packages ? (
          <p className="mt-3 text-sm text-destructive" role="alert">
            {errors.packages}
          </p>
        ) : (
          <p className="mt-3 text-sm text-muted-foreground">
            The basic package covers the wedding party. Add tables, the bar, and
            backdrop pieces for the rest of the day.
          </p>
        )}
        <fieldset className="mt-4 grid gap-3">
          <legend className="sr-only">Wedding packages</legend>
          {weddingPackages.map((pkg) => {
            const selected = Boolean(chosen[pkg.id])
            return (
              <div
                key={pkg.id}
                className={`border p-4 sm:p-5 ${
                  selected
                    ? "border-primary bg-card"
                    : "border-border bg-background/40"
                }`}
              >
                <label className="flex cursor-pointer items-start gap-3">
                  <input
                    className="mt-1.5 size-4 accent-primary"
                    type="checkbox"
                    name="package"
                    value={pkg.id}
                    checked={selected}
                    onChange={() => togglePackage(pkg.id)}
                  />
                  <span>
                    <span className="block font-heading text-2xl tracking-tight">
                      {pkg.name}
                    </span>
                    <span className="mt-1 block text-sm leading-relaxed text-muted-foreground">
                      {pkg.copy}
                    </span>
                  </span>
                </label>
                <ul className="mt-4 space-y-3 border-t border-border pt-4">
                  {pkg.pieces.map((piece) => {
                    const count = pieceCount(piece, counts)
                    const titled = piece.name !== pkg.name
                    return (
                      <li
                        key={piece.id}
                        className="flex items-center justify-between gap-4"
                      >
                        <span>
                          {titled ? <span className="block text-sm">{piece.name}</span> : null}
                          <span className="mt-0.5 block text-sm text-muted-foreground">
                            {piece.copy}
                          </span>
                        </span>
                        {selected && piece.countKey ? (
                          <span className="flex shrink-0 items-center gap-1.5">
                            <Button
                              type="button"
                              variant="outline"
                              size="icon"
                              className="size-10 rounded-md bg-card"
                              aria-label={`Fewer ${piece.name}`}
                              disabled={count <= piece.min}
                              onClick={() =>
                                changeCount(piece.countKey as WeddingCountKey, count - 1)
                              }
                            >
                              <MinusIcon />
                            </Button>
                            <span className="w-8 text-center font-heading text-xl tabular-nums">
                              {count}
                            </span>
                            <Button
                              type="button"
                              variant="outline"
                              size="icon"
                              className="size-10 rounded-md bg-card"
                              aria-label={`More ${piece.name}`}
                              disabled={count >= piece.max}
                              onClick={() =>
                                changeCount(piece.countKey as WeddingCountKey, count + 1)
                              }
                            >
                              <PlusIcon />
                            </Button>
                          </span>
                        ) : null}
                        {selected && piece.fixed != null ? (
                          <span className="shrink-0 font-heading text-xl text-primary tabular-nums">
                            {piece.fixed}
                          </span>
                        ) : null}
                      </li>
                    )
                  })}
                </ul>
              </div>
            )
          })}
        </fieldset>
      </div>

      <aside className="scroll-mt-28 lg:sticky lg:top-24 lg:col-span-5">
        <div className="border border-border bg-card p-5 sm:p-7">
          <p className="text-[0.72rem] font-medium uppercase tracking-[0.22em] text-primary">
            The request
          </p>
          <h2 className="mt-3 font-heading text-3xl tracking-tight">
            Tell us the day.
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            We confirm the flowers and the cost by email. Nothing is charged
            on this page.
          </p>

          <div className="mt-6">
            <Label htmlFor={`${formId}-date`}>Wedding day</Label>
            <Input
              id={`${formId}-date`}
              name="wedding-date"
              type="date"
              required
              value={weddingDate}
              aria-invalid={Boolean(errors.date)}
              aria-describedby={errors.date ? `${formId}-date-error` : undefined}
              className="mt-2 h-11 bg-white"
              onChange={(event) => {
                setWeddingDate(event.target.value)
                setErrors((current) => ({ ...current, date: undefined }))
              }}
            />
            {errors.date ? (
              <p id={`${formId}-date-error`} className="mt-2 text-sm text-destructive" role="alert">
                {errors.date}
              </p>
            ) : null}
          </div>

          <div className="mt-5">
            <Label htmlFor={`${formId}-venue`}>Venue</Label>
            <Input
              id={`${formId}-venue`}
              name="venue"
              required
              placeholder="Winery, estate, or backyard"
              aria-invalid={Boolean(errors.venue)}
              aria-describedby={errors.venue ? `${formId}-venue-error` : undefined}
              className="mt-2 h-11 bg-white"
              onChange={() => setErrors((current) => ({ ...current, venue: undefined }))}
            />
            {errors.venue ? (
              <p id={`${formId}-venue-error`} className="mt-2 text-sm text-destructive" role="alert">
                {errors.venue}
              </p>
            ) : null}
          </div>

          <div className="mt-5">
            <Label htmlFor={`${formId}-name`}>Name</Label>
            <Input
              id={`${formId}-name`}
              name="name"
              autoComplete="name"
              required
              aria-invalid={Boolean(errors.name)}
              aria-describedby={errors.name ? `${formId}-name-error` : undefined}
              className="mt-2 h-11 bg-white"
              onChange={() => setErrors((current) => ({ ...current, name: undefined }))}
            />
            {errors.name ? (
              <p id={`${formId}-name-error`} className="mt-2 text-sm text-destructive" role="alert">
                {errors.name}
              </p>
            ) : null}
          </div>

          <div className="mt-5">
            <Label htmlFor={`${formId}-phone`}>Phone</Label>
            <Input
              id={`${formId}-phone`}
              name="phone"
              type="tel"
              autoComplete="tel"
              inputMode="tel"
              required
              aria-invalid={Boolean(errors.phone)}
              aria-describedby={errors.phone ? `${formId}-phone-error` : undefined}
              className="mt-2 h-11 bg-white"
              onChange={() => setErrors((current) => ({ ...current, phone: undefined }))}
            />
            {errors.phone ? (
              <p id={`${formId}-phone-error`} className="mt-2 text-sm text-destructive" role="alert">
                {errors.phone}
              </p>
            ) : null}
          </div>

          <div className="mt-5">
            <Label htmlFor={`${formId}-note`}>Note</Label>
            <Textarea
              id={`${formId}-note`}
              name="note"
              placeholder="Colors, season, and anything the counts do not cover."
              className="mt-2 min-h-28 bg-white"
            />
          </div>

          <Button type="submit" className="mt-6 h-12 w-full rounded-md text-base hover:bg-wine-deep">
            Request these packages
          </Button>
        </div>
      </aside>
    </form>
  )
}
