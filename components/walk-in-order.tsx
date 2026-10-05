"use client"

import { MinusIcon, PlusIcon } from "lucide-react"
import {
  useId,
  useRef,
  useState,
  useSyncExternalStore,
  type FormEvent,
} from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  composeOrder,
  orderCode,
  orderMailto,
  orderTotal,
  stemCount,
  type OrderLine,
  type OrderTicket,
} from "@/lib/order"
import {
  formatPickup,
  pickupIssueMessage,
  suggestPickups,
  validatePickup,
  type PickupIssue,
} from "@/lib/pickup"
import { formatMoney, stemGroups, stems } from "@/lib/stems"
import { studio } from "@/lib/studio"

type Field = "name" | "phone" | "ready"
type Errors = Partial<Record<Field | "stems", string>>

let cachedNow = 0

function subscribeToClock(onChange: () => void) {
  const refresh = () => {
    cachedNow = Date.now()
    onChange()
  }
  window.addEventListener("focus", refresh)
  return () => window.removeEventListener("focus", refresh)
}

function nowSnapshot() {
  if (cachedNow === 0) cachedNow = Date.now()
  return cachedNow
}

function nowOnServer() {
  return 0
}

function digits(value: string) {
  return value.replace(/\D/g, "")
}

function openMailbox(href: string) {
  window.location.assign(href)
}

export function WalkInOrder() {
  const formId = useId()
  const slipRef = useRef<HTMLHeadingElement>(null)
  const now = useSyncExternalStore(subscribeToClock, nowSnapshot, nowOnServer)
  const suggestions = now === 0 ? [] : suggestPickups(new Date(now))

  const [quantities, setQuantities] = useState<Record<string, number>>({})
  const [readyDate, setReadyDate] = useState("")
  const [readyTime, setReadyTime] = useState("")
  const [errors, setErrors] = useState<Errors>({})
  const [ticket, setTicket] = useState<OrderTicket | null>(null)
  const [note, setNote] = useState("")
  const [copied, setCopied] = useState(false)

  const lines: OrderLine[] = stems.flatMap((stem) => {
    const quantity = quantities[stem.id] ?? 0
    return quantity > 0 ? [{ name: stem.name, quantity, price: stem.price }] : []
  })
  const count = stemCount(lines)
  const total = orderTotal(lines)
  const readyIssue =
    now === 0 || !readyDate || !readyTime
      ? null
      : validatePickup(readyDate, readyTime, new Date(now))
  const readyLabel =
    readyDate && readyTime && readyIssue === null
      ? formatPickup(readyDate, readyTime)
      : ""

  function setQuantity(id: string, next: number) {
    setQuantities((current) => ({
      ...current,
      [id]: Math.min(99, Math.max(0, next)),
    }))
    setErrors((current) => ({ ...current, stems: undefined }))
  }

  function chooseReady(date: string, time: string) {
    setReadyDate(date)
    setReadyTime(time)
    setErrors((current) => ({ ...current, ready: undefined }))
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const data = new FormData(form)
    if (String(data.get("company") || "").trim()) {
      setTicket({
        code: "VB-NOTE",
        name: "Studio",
        phone: studio.phone,
        ready: "Not set",
        note: "",
        lines: [],
      })
      return
    }

    const name = String(data.get("name") || "").trim()
    const phone = String(data.get("phone") || "").trim()
    const message = String(data.get("note") || "").trim()
    const nextErrors: Errors = {}
    if (lines.length === 0) nextErrors.stems = "Add at least one stem."
    if (name.length < 2) nextErrors.name = "Add the name for the pickup."
    if (digits(phone).length < 10) {
      nextErrors.phone = "Add a phone number we can call when it is ready."
    }
    const pickupIssue: PickupIssue | null = validatePickup(
      readyDate,
      readyTime,
      new Date()
    )
    if (pickupIssue) nextErrors.ready = pickupIssueMessage(pickupIssue)
    setErrors(nextErrors)

    const first = (Object.keys(nextErrors) as (keyof Errors)[])[0]
    if (first) {
      const target =
        first === "stems"
          ? document.getElementById(`${formId}-stems`)
          : form.querySelector<HTMLElement>(`[name="${first === "ready" ? "ready-date" : first}"]`)
      target?.focus()
      return
    }

    const nextTicket: OrderTicket = {
      code: orderCode(),
      name,
      phone,
      ready: formatPickup(readyDate, readyTime),
      note: message,
      lines,
    }
    const body = composeOrder(nextTicket)
    setNote(body)
    setTicket(nextTicket)
    window.setTimeout(() => slipRef.current?.focus(), 0)
    openMailbox(orderMailto(nextTicket, body))
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

  if (ticket) {
    return (
      <section className="mx-auto w-full max-w-3xl px-5 pb-20 md:px-8">
        <div className="border border-border bg-card p-6 sm:p-10">
          <p className="text-[0.72rem] font-medium uppercase tracking-[0.22em] text-primary">
            Walk-in pickup
          </p>
          <h2
            ref={slipRef}
            tabIndex={-1}
            className="mt-3 font-heading text-4xl tracking-tight outline-none"
          >
            Ready {ticket.ready.replace(" Pacific", "")}.
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            Order {ticket.code} is addressed to {studio.email}. Send the note
            from your email app. If it did not open, copy it and the studio
            still has the slip below.
          </p>
          <dl className="mt-8 grid gap-6 border-y border-border py-6 sm:grid-cols-2">
            <div>
              <dt className="text-[0.68rem] uppercase tracking-[0.16em] text-muted-foreground">
                Ready for pickup
              </dt>
              <dd className="mt-1 font-heading text-2xl tracking-tight">
                {ticket.ready}
              </dd>
            </div>
            <div>
              <dt className="text-[0.68rem] uppercase tracking-[0.16em] text-muted-foreground">
                Pickup name
              </dt>
              <dd className="mt-1 text-lg">{ticket.name}</dd>
              <dd className="text-muted-foreground">{ticket.phone}</dd>
            </div>
          </dl>
          <ul className="mt-6 space-y-3">
            {ticket.lines.map((line) => (
              <li key={line.name} className="flex items-baseline justify-between gap-4">
                <span>
                  {line.name}{" "}
                  <span className="text-muted-foreground">× {line.quantity}</span>
                </span>
                <span className="tabular-nums">
                  {formatMoney(line.price * line.quantity)}
                </span>
              </li>
            ))}
          </ul>
          <div className="mt-6 flex items-baseline justify-between border-t border-border pt-4">
            <span className="text-sm text-muted-foreground">
              {stemCount(ticket.lines)} stems
            </span>
            <span className="font-heading text-3xl tracking-tight">
              {formatMoney(orderTotal(ticket.lines))}
            </span>
          </div>
          {ticket.note ? (
            <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
              {ticket.note}
            </p>
          ) : null}
          <pre className="mt-8 max-h-64 overflow-auto whitespace-pre-wrap border border-border bg-background p-4 font-sans text-sm leading-relaxed">
            {note}
          </pre>
          <div className="no-print mt-6 flex flex-wrap gap-3">
            <Button type="button" className="h-11 rounded-md px-5" onClick={copySlip}>
              {copied ? "Copied" : "Copy slip"}
            </Button>
            <Button
              type="button"
              variant="outline"
              className="h-11 rounded-md bg-card px-5"
              onClick={() => window.print()}
            >
              Print slip
            </Button>
            <Button
              type="button"
              variant="outline"
              className="h-11 rounded-md bg-card px-5"
              onClick={() => {
                setTicket(null)
                setQuantities({})
                setReadyDate("")
                setReadyTime("")
                setNote("")
              }}
            >
              New order
            </Button>
          </div>
        </div>
      </section>
    )
  }

  return (
    <div className="mx-auto grid w-full max-w-6xl gap-10 px-5 pb-28 md:px-8 lg:grid-cols-12 lg:items-start lg:pb-20">
      <div className="lg:col-span-7">
        <p
          id={`${formId}-stems`}
          tabIndex={-1}
          className="text-[0.72rem] font-medium uppercase tracking-[0.22em] text-primary outline-none"
        >
          The stems
        </p>
        {errors.stems ? (
          <p className="mt-3 text-sm text-destructive" role="alert">
            {errors.stems}
          </p>
        ) : (
          <p className="mt-3 text-sm text-muted-foreground">
            Each price is for one stem. Add as many as the bouquet needs.
          </p>
        )}
        {stemGroups.map((group) => (
          <section key={group} className="mt-8">
            <h2 className="font-heading text-2xl tracking-tight">{group}</h2>
            <ul className="mt-2 border-t border-border">
              {stems
                .filter((stem) => stem.group === group)
                .map((stem) => {
                  const quantity = quantities[stem.id] ?? 0
                  return (
                    <li
                      key={stem.id}
                      className="flex items-center gap-3 border-b border-border py-4 sm:gap-4"
                    >
                      <div className="min-w-0 flex-1">
                        <p className="font-heading text-2xl tracking-tight">
                          {stem.name}
                        </p>
                        <p className="mt-1 text-sm text-muted-foreground">
                          {formatMoney(stem.price)} a stem
                          {quantity > 0 ? (
                            <span className="sm:hidden">
                              {" "}
                              · {formatMoney(stem.price * quantity)}
                            </span>
                          ) : null}
                        </p>
                      </div>
                      <p className="hidden w-20 text-right text-sm tabular-nums sm:block">
                        {quantity > 0 ? formatMoney(stem.price * quantity) : ""}
                      </p>
                      <div className="flex items-center gap-1.5">
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          className="size-10 rounded-md bg-card"
                          aria-label={`Remove one ${stem.name}`}
                          disabled={quantity === 0}
                          onClick={() => setQuantity(stem.id, quantity - 1)}
                        >
                          <MinusIcon />
                        </Button>
                        <span
                          className="w-8 text-center font-heading text-xl tabular-nums"
                          aria-label={`${stem.name} quantity`}
                        >
                          {quantity}
                        </span>
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          className="size-10 rounded-md bg-card"
                          aria-label={`Add one ${stem.name}`}
                          disabled={quantity >= 99}
                          onClick={() => setQuantity(stem.id, quantity + 1)}
                        >
                          <PlusIcon />
                        </Button>
                      </div>
                    </li>
                  )
                })}
            </ul>
          </section>
        ))}
      </div>

      <aside id="ticket" className="scroll-mt-28 lg:sticky lg:top-24 lg:col-span-5">
        <form
          className="border border-border bg-card p-5 sm:p-7"
          onSubmit={onSubmit}
          noValidate
        >
          <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
            <label>
              Company
              <input name="company" tabIndex={-1} autoComplete="off" />
            </label>
          </div>

          <p className="text-[0.72rem] font-medium uppercase tracking-[0.22em] text-primary">
            Walk-in ticket
          </p>
          <h2 className="mt-3 font-heading text-3xl tracking-tight">
            {count === 0 ? "No stems yet" : `${count} stem${count === 1 ? "" : "s"}`}
          </h2>
          <p
            className="mt-1 font-heading text-4xl tracking-tight text-primary"
            aria-live="polite"
          >
            {formatMoney(total)}
          </p>

          <ul className="mt-5 space-y-2 text-sm">
            {lines.length === 0 ? (
              <li className="text-muted-foreground">
                The total updates as you add stems.
              </li>
            ) : (
              lines.map((line) => (
                <li key={line.name} className="flex justify-between gap-4">
                  <span>
                    {line.name} × {line.quantity}
                  </span>
                  <span className="tabular-nums">
                    {formatMoney(line.price * line.quantity)}
                  </span>
                </li>
              ))
            )}
          </ul>

          <div className="mt-6 border-t border-border pt-6">
            <Label htmlFor={`${formId}-ready-date`}>Ready for pickup</Label>
            <p id={`${formId}-ready-hint`} className="mt-2 text-sm text-muted-foreground">
              Tuesday–Saturday, 10:00 AM to 5:00 PM, Healdsburg time.
            </p>
            {suggestions.length > 0 ? (
              <div className="mt-3 flex flex-wrap gap-2">
                {suggestions.map((slot) => {
                  const selected = slot.date === readyDate && slot.time === readyTime
                  return (
                    <Button
                      key={slot.id}
                      type="button"
                      variant={selected ? "default" : "outline"}
                      className={
                        selected
                          ? "h-9 rounded-md px-3"
                          : "h-9 rounded-md bg-card px-3"
                      }
                      aria-pressed={selected}
                      onClick={() => chooseReady(slot.date, slot.time)}
                    >
                      {slot.label}
                    </Button>
                  )
                })}
              </div>
            ) : null}
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              <Input
                id={`${formId}-ready-date`}
                name="ready-date"
                type="date"
                required
                value={readyDate}
                aria-invalid={Boolean(errors.ready)}
                aria-describedby={`${formId}-ready-hint${errors.ready ? ` ${formId}-ready-error` : ""}`}
                className="h-11 bg-white"
                onChange={(event) => chooseReady(event.target.value, readyTime)}
              />
              <Input
                id={`${formId}-ready-time`}
                name="ready-time"
                type="time"
                required
                step={900}
                value={readyTime}
                aria-invalid={Boolean(errors.ready)}
                aria-describedby={`${formId}-ready-hint${errors.ready ? ` ${formId}-ready-error` : ""}`}
                className="h-11 bg-white"
                onChange={(event) => chooseReady(readyDate, event.target.value)}
              />
            </div>
            {readyLabel ? (
              <p className="mt-3 text-sm">Ready {readyLabel}.</p>
            ) : null}
            {errors.ready ? (
              <p id={`${formId}-ready-error`} className="mt-2 text-sm text-destructive" role="alert">
                {errors.ready}
              </p>
            ) : null}
          </div>

          <div className="mt-5 grid gap-4">
            <div>
              <Label htmlFor={`${formId}-name`}>Name on the order</Label>
              <Input
                id={`${formId}-name`}
                name="name"
                autoComplete="name"
                required
                aria-invalid={Boolean(errors.name)}
                aria-describedby={errors.name ? `${formId}-name-error` : undefined}
                className="mt-2 h-11 bg-white"
              />
              {errors.name ? (
                <p id={`${formId}-name-error`} className="mt-2 text-sm text-destructive" role="alert">
                  {errors.name}
                </p>
              ) : null}
            </div>
            <div>
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
              />
              {errors.phone ? (
                <p id={`${formId}-phone-error`} className="mt-2 text-sm text-destructive" role="alert">
                  {errors.phone}
                </p>
              ) : null}
            </div>
            <div>
              <Label htmlFor={`${formId}-note`}>Note</Label>
              <Textarea
                id={`${formId}-note`}
                name="note"
                placeholder="Wrap, a card, or the colors to keep."
                className="mt-2 min-h-24 bg-white"
              />
            </div>
          </div>

          <Button
            type="submit"
            className="mt-6 h-12 w-full rounded-md text-base hover:bg-wine-deep"
          >
            Set pickup and send order
          </Button>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            This opens an email to {studio.email} with the stems, the total,
            and the time the flowers will be ready. Nothing is stored on the
            website.
          </p>
        </form>
      </aside>

      <div className="no-print fixed inset-x-0 bottom-0 z-30 border-t border-border bg-background/95 px-5 py-3 backdrop-blur-md lg:hidden">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
              {count} stem{count === 1 ? "" : "s"}
            </p>
            <p className="font-heading text-2xl tracking-tight">{formatMoney(total)}</p>
          </div>
          <Button
            nativeButton={false}
            render={<a href="#ticket" />}
            className="h-11 rounded-md px-4"
          >
            Set pickup
          </Button>
        </div>
      </div>
    </div>
  )
}
