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
import { formatMoney } from "@/lib/arrangements"
import {
  composeOrder,
  lineCount,
  orderCode,
  orderMailto,
  orderTotal,
  type OrderLine,
  type OrderTicket,
} from "@/lib/order"
import { formatPickup } from "@/lib/pickup"
import {
  serviceIssueMessage,
  sympathyCopy,
  casketDeluxePrice,
  piecePrice,
  sympathyForms,
  sympathySizes,
  validateServiceWhen,
} from "@/lib/sympathy"
import { studio } from "@/lib/studio"

type Field = "name" | "phone" | "when" | "place"
type Errors = Partial<Record<Field | "form" | "size", string>>

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

export function SympathyOrder() {
  const formId = useId()
  const slipRef = useRef<HTMLHeadingElement>(null)
  const now = useSyncExternalStore(subscribeToClock, nowSnapshot, nowOnServer)

  const [formIdChoice, setFormIdChoice] = useState("")
  const [sizeId, setSizeId] = useState("")
  const [quantity, setQuantity] = useState(1)
  const [serviceDate, setServiceDate] = useState("")
  const [serviceTime, setServiceTime] = useState("")
  const [errors, setErrors] = useState<Errors>({})
  const [ticket, setTicket] = useState<OrderTicket | null>(null)
  const [note, setNote] = useState("")
  const [copied, setCopied] = useState(false)

  const form = sympathyForms.find((item) => item.id === formIdChoice)
  const size = sympathySizes.find((item) => item.id === sizeId)
  const lines: OrderLine[] = form && size
    ? [
        {
          name: `${form.name}, ${size.name.toLowerCase()}`,
          quantity,
          price: piecePrice(form.id, size.id),
        },
      ]
    : []
  const total = orderTotal(lines)
  const whenIssue =
    now === 0 || !serviceDate || !serviceTime
      ? null
      : validateServiceWhen(serviceDate, serviceTime, new Date(now))
  const whenLabel =
    serviceDate && serviceTime && whenIssue === null
      ? formatPickup(serviceDate, serviceTime)
      : ""

  function chooseForm(id: string) {
    setFormIdChoice(id)
    setErrors((current) => ({ ...current, form: undefined }))
  }

  function chooseSize(id: string) {
    setSizeId(id)
    setErrors((current) => ({ ...current, size: undefined }))
  }

  function chooseWhen(date: string, time: string) {
    setServiceDate(date)
    setServiceTime(time)
    setErrors((current) => ({ ...current, when: undefined }))
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const element = event.currentTarget
    const data = new FormData(element)
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
    const place = String(data.get("place") || "").trim()
    const message = String(data.get("note") || "").trim()
    const nextErrors: Errors = {}
    if (!form) nextErrors.form = "Choose a heart, cross, circle, or casket spray."
    if (!size) nextErrors.size = "Choose a size."
    if (name.length < 2) nextErrors.name = "Add the name for the order."
    if (digits(phone).length < 10) {
      nextErrors.phone = "Add a phone number we can call."
    }
    if (place.length < 3) {
      nextErrors.place = "Tell us where the flowers should go."
    }
    const issue = validateServiceWhen(serviceDate, serviceTime, new Date())
    if (issue) nextErrors.when = serviceIssueMessage(issue)
    setErrors(nextErrors)

    const first = (Object.keys(nextErrors) as (keyof Errors)[])[0]
    if (first) {
      const fieldName =
        first === "when" ? "service-date" : first === "form" || first === "size" ? "" : first
      const target = fieldName
        ? element.querySelector<HTMLElement>(`[name="${fieldName}"]`)
        : document.getElementById(`${formId}-${first}`)
      target?.focus()
      return
    }

    const nextTicket: OrderTicket = {
      code: orderCode(),
      name,
      phone,
      ready: formatPickup(serviceDate, serviceTime),
      place,
      note: message,
      lines,
    }
    const body = composeOrder(nextTicket, sympathyCopy)
    setNote(body)
    setTicket(nextTicket)
    window.setTimeout(() => slipRef.current?.focus(), 0)
    openMailbox(orderMailto(nextTicket, body, sympathyCopy))
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
            Sympathy
          </p>
          <h2
            ref={slipRef}
            tabIndex={-1}
            className="mt-3 font-heading text-4xl tracking-tight outline-none"
          >
            Needed {ticket.ready.replace(" Pacific", "")}.
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            Order {ticket.code} is addressed to {studio.email}. Send the note
            from your email app. If it did not open, copy the slip below.
          </p>
          <dl className="mt-8 grid gap-6 border-y border-border py-6 sm:grid-cols-2">
            <div>
              <dt className="text-[0.68rem] uppercase tracking-[0.16em] text-muted-foreground">
                Needed
              </dt>
              <dd className="mt-1 font-heading text-2xl tracking-tight">
                {ticket.ready}
              </dd>
            </div>
            <div>
              <dt className="text-[0.68rem] uppercase tracking-[0.16em] text-muted-foreground">
                Place
              </dt>
              <dd className="mt-1 text-lg">{ticket.place}</dd>
              <dd className="mt-2 text-muted-foreground">
                {ticket.name}
                <br />
                {ticket.phone}
              </dd>
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
              {lineCount(ticket.lines)} piece{lineCount(ticket.lines) === 1 ? "" : "s"}
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
                setFormIdChoice("")
                setSizeId("")
                setQuantity(1)
                setServiceDate("")
                setServiceTime("")
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
      <div className="space-y-10 lg:col-span-7">
        <div>
          <p
            id={`${formId}-form`}
            tabIndex={-1}
            className="text-[0.72rem] font-medium uppercase tracking-[0.22em] text-primary outline-none"
          >
            The form
          </p>
          {errors.form ? (
            <p className="mt-3 text-sm text-destructive" role="alert">
              {errors.form}
            </p>
          ) : (
            <p className="mt-3 text-sm text-muted-foreground">
              A heart, a cross, a circle, or a casket spray.
            </p>
          )}
          <fieldset className="mt-4 grid gap-3 sm:grid-cols-2">
            <legend className="sr-only">Sympathy arrangement</legend>
            {sympathyForms.map((item) => {
              const selected = item.id === formIdChoice
              return (
                <label
                  key={item.id}
                  className={`cursor-pointer border p-4 ${
                    selected
                      ? "border-primary bg-card"
                      : "border-border bg-background/40 hover:border-primary/40"
                  }`}
                >
                  <input
                    className="sr-only"
                    type="radio"
                    name="form"
                    value={item.id}
                    checked={selected}
                    onChange={() => chooseForm(item.id)}
                  />
                  <span className="block font-heading text-2xl tracking-tight">
                    {item.name}
                  </span>
                  <span className="mt-1 block text-sm leading-relaxed text-muted-foreground">
                    {item.copy}
                  </span>
                </label>
              )
            })}
          </fieldset>
        </div>

        <div>
          <p
            id={`${formId}-size`}
            tabIndex={-1}
            className="text-[0.72rem] font-medium uppercase tracking-[0.22em] text-primary outline-none"
          >
            The size
          </p>
          {errors.size ? (
            <p className="mt-3 text-sm text-destructive" role="alert">
              {errors.size}
            </p>
          ) : (
            <p className="mt-3 text-sm text-muted-foreground">
              Wreaths run from {formatMoney(sympathySizes[0].price)} to{" "}
              {formatMoney(sympathySizes[sympathySizes.length - 1].price)}. A
              full deluxe casket spray is {formatMoney(casketDeluxePrice)}.
            </p>
          )}
          <fieldset className="mt-4 grid gap-3">
            <legend className="sr-only">Size and price</legend>
            {sympathySizes.map((item) => {
              const selected = item.id === sizeId
              const price = piecePrice(formIdChoice, item.id)
              return (
                <label
                  key={item.id}
                  className={`cursor-pointer border p-4 ${
                    selected
                      ? "border-primary bg-card"
                      : "border-border bg-background/40 hover:border-primary/40"
                  }`}
                >
                  <input
                    className="sr-only"
                    type="radio"
                    name="size"
                    value={item.id}
                    checked={selected}
                    onChange={() => chooseSize(item.id)}
                  />
                  <span className="flex items-baseline justify-between gap-4">
                    <span className="font-heading text-2xl tracking-tight">
                      {item.name}
                    </span>
                    <span className="font-heading text-2xl tracking-tight text-primary">
                      {formatMoney(price)}
                    </span>
                  </span>
                  <span className="mt-1 block text-sm leading-relaxed text-muted-foreground">
                    {item.copy}
                  </span>
                </label>
              )
            })}
          </fieldset>
        </div>
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
            The order
          </p>
          <h2 className="mt-3 font-heading text-3xl tracking-tight">
            {form && size ? `${form.name}, ${size.name.toLowerCase()}` : "Choose a piece"}
          </h2>
          <p className="mt-1 font-heading text-4xl tracking-tight text-primary" aria-live="polite">
            {formatMoney(total)}
          </p>

          {form && size ? (
            <div className="mt-5 flex items-center justify-between gap-4 border-t border-border pt-5">
              <p className="text-sm text-muted-foreground">How many</p>
              <div className="flex items-center gap-1.5">
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  className="size-10 rounded-md bg-card"
                  aria-label="Remove one piece"
                  disabled={quantity <= 1}
                  onClick={() => setQuantity((current) => Math.max(1, current - 1))}
                >
                  <MinusIcon />
                </Button>
                <span className="w-8 text-center font-heading text-xl tabular-nums">
                  {quantity}
                </span>
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  className="size-10 rounded-md bg-card"
                  aria-label="Add one piece"
                  disabled={quantity >= 4}
                  onClick={() => setQuantity((current) => Math.min(4, current + 1))}
                >
                  <PlusIcon />
                </Button>
              </div>
            </div>
          ) : (
            <p className="mt-5 text-sm text-muted-foreground">
              Small is {formatMoney(25000)}. A full deluxe casket spray is{" "}
              {formatMoney(casketDeluxePrice)}.
            </p>
          )}

          <div className="mt-6 border-t border-border pt-6">
            <Label htmlFor={`${formId}-service-date`}>Day of the service</Label>
            <p id={`${formId}-when-hint`} className="mt-2 text-sm text-muted-foreground">
              If the time is short, send the order anyway. We will do what the
              day allows.
            </p>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              <Input
                id={`${formId}-service-date`}
                name="service-date"
                type="date"
                required
                value={serviceDate}
                aria-invalid={Boolean(errors.when)}
                aria-describedby={`${formId}-when-hint${errors.when ? ` ${formId}-when-error` : ""}`}
                className="h-11 bg-white"
                onChange={(event) => chooseWhen(event.target.value, serviceTime)}
              />
              <Input
                id={`${formId}-service-time`}
                name="service-time"
                type="time"
                required
                step={900}
                value={serviceTime}
                aria-invalid={Boolean(errors.when)}
                aria-describedby={`${formId}-when-hint${errors.when ? ` ${formId}-when-error` : ""}`}
                className="h-11 bg-white"
                onChange={(event) => chooseWhen(serviceDate, event.target.value)}
              />
            </div>
            {whenLabel ? <p className="mt-3 text-sm">Needed {whenLabel}.</p> : null}
            {errors.when ? (
              <p id={`${formId}-when-error`} className="mt-2 text-sm text-destructive" role="alert">
                {errors.when}
              </p>
            ) : null}
          </div>

          <div className="mt-5 grid gap-4">
            <div>
              <Label htmlFor={`${formId}-place`}>Where it should go</Label>
              <Input
                id={`${formId}-place`}
                name="place"
                required
                placeholder="Funeral home, church, graveside, or studio pickup"
                aria-invalid={Boolean(errors.place)}
                aria-describedby={errors.place ? `${formId}-place-error` : undefined}
                className="mt-2 h-11 bg-white"
              />
              {errors.place ? (
                <p id={`${formId}-place-error`} className="mt-2 text-sm text-destructive" role="alert">
                  {errors.place}
                </p>
              ) : null}
            </div>
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
              <Label htmlFor={`${formId}-note`}>Ribbon or note</Label>
              <Textarea
                id={`${formId}-note`}
                name="note"
                placeholder="A name for the ribbon, or colors to keep."
                className="mt-2 min-h-24 bg-white"
              />
            </div>
          </div>

          <Button
            type="submit"
            className="mt-6 h-12 w-full rounded-md text-base hover:bg-wine-deep"
          >
            Send the sympathy order
          </Button>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            This opens an email to {studio.email} with the piece, the price,
            and where it should go. Nothing is stored on the website.
          </p>
        </form>
      </aside>

      <div className="no-print fixed inset-x-0 bottom-0 z-30 border-t border-border bg-background/95 px-5 py-3 backdrop-blur-md lg:hidden">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
              {form && size ? `${form.name} · ${size.name}` : "No piece yet"}
            </p>
            <p className="font-heading text-2xl tracking-tight">{formatMoney(total)}</p>
          </div>
          <Button
            nativeButton={false}
            render={<a href="#ticket" />}
            className="h-11 rounded-md px-4"
          >
            Finish order
          </Button>
        </div>
      </div>
    </div>
  )
}
