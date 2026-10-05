"use client"

import { useEffect, useId, useRef, useState, type FormEvent, type ReactNode } from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { occasions, studio } from "@/lib/studio"

type Field = "name" | "email" | "occasion" | "message"

type Values = Record<Field, string> & {
  date: string
  place: string
}

const empty: Values = {
  name: "",
  email: "",
  occasion: "",
  date: "",
  place: "",
  message: "",
}

function validate(values: Values): Partial<Record<Field, string>> {
  const errors: Partial<Record<Field, string>> = {}
  if (values.name.trim().length < 2) {
    errors.name = "Add your name so we know who to reply to."
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
    errors.email = "Add an email address we can write back to."
  }
  if (!values.occasion) {
    errors.occasion = "Choose the kind of gathering."
  }
  if (values.message.trim().length < 12) {
    errors.message = "A sentence or two about the day is enough."
  }
  return errors
}

function compose(values: Values) {
  const date = values.date.trim() || "Not set yet"
  const place = values.place.trim() || "Not set yet"
  return [
    `Name: ${values.name.trim()}`,
    `Email: ${values.email.trim()}`,
    `Occasion: ${values.occasion}`,
    `Date: ${date}`,
    `Place: ${place}`,
    "",
    values.message.trim(),
  ].join("\n")
}

function mailtoHref(values: Values, body: string) {
  const subject = `Vine&Bloom inquiry · ${values.occasion} · ${values.name.trim()}`
  return `mailto:${studio.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}

export function InquiryForm() {
  const formId = useId()
  const successRef = useRef<HTMLHeadingElement>(null)
  const [errors, setErrors] = useState<Partial<Record<Field, string>>>({})
  const [note, setNote] = useState("")
  const [sent, setSent] = useState(false)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (sent) successRef.current?.focus()
  }, [sent])

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const data = new FormData(form)
    const company = String(data.get("company") || "").trim()
    const values: Values = {
      name: String(data.get("name") || ""),
      email: String(data.get("email") || ""),
      occasion: String(data.get("occasion") || ""),
      date: String(data.get("date") || ""),
      place: String(data.get("place") || ""),
      message: String(data.get("message") || ""),
    }

    if (company) {
      setNote(compose({ ...empty, name: "Studio", occasion: "Note", message: "Hello." }))
      setSent(true)
      return
    }

    const nextErrors = validate(values)
    setErrors(nextErrors)
    const firstInvalid = (Object.keys(nextErrors) as Field[])[0]
    if (firstInvalid) {
      form.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)?.focus()
      return
    }

    const body = compose(values)
    setNote(body)
    setSent(true)
    window.location.href = mailtoHref(values, body)
  }

  async function copyNote() {
    try {
      await navigator.clipboard.writeText(`To: ${studio.email}\n\n${note}`)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      setCopied(false)
    }
  }

  if (sent) {
    return (
      <div className="flex flex-col gap-4">
        <h3
          ref={successRef}
          tabIndex={-1}
          className="font-heading text-3xl tracking-tight outline-none"
        >
          Your note is ready to send.
        </h3>
        <p className="text-sm leading-relaxed text-muted-foreground">
          Your email app should be open, addressed to {studio.email}. Send it
          from there and the studio will reply to the address you gave. If
          nothing opened, copy the note and send it yourself.
        </p>
        <pre className="max-h-64 overflow-auto whitespace-pre-wrap border border-border bg-background p-4 font-sans text-sm leading-relaxed text-foreground">
          {note}
        </pre>
        <div className="flex flex-wrap gap-3">
          <Button type="button" className="h-11 rounded-md px-5" onClick={copyNote}>
            {copied ? "Copied" : "Copy note"}
          </Button>
          <Button
            type="button"
            variant="outline"
            className="h-11 rounded-md px-5"
            onClick={() => {
              setSent(false)
              setCopied(false)
            }}
          >
            Edit note
          </Button>
        </div>
      </div>
    )
  }

  return (
    <form className="flex flex-col gap-5" onSubmit={onSubmit} noValidate>
      <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
        <label>
          Company
          <input name="company" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          id={`${formId}-name`}
          label="Name"
          error={errors.name}
        >
          <Input
            id={`${formId}-name`}
            name="name"
            autoComplete="name"
            required
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? `${formId}-name-error` : undefined}
            className="h-11 bg-white"
          />
        </Field>
        <Field
          id={`${formId}-email`}
          label="Email"
          error={errors.email}
        >
          <Input
            id={`${formId}-email`}
            name="email"
            type="email"
            autoComplete="email"
            inputMode="email"
            required
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? `${formId}-email-error` : undefined}
            className="h-11 bg-white"
          />
        </Field>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          id={`${formId}-occasion`}
          label="Occasion"
          error={errors.occasion}
        >
          <select
            id={`${formId}-occasion`}
            name="occasion"
            required
            defaultValue=""
            aria-invalid={Boolean(errors.occasion)}
            aria-describedby={
              errors.occasion ? `${formId}-occasion-error` : undefined
            }
            className="h-11 w-full rounded-lg border border-input bg-white px-2.5 text-base text-foreground outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 aria-invalid:border-destructive md:text-sm"
          >
            <option value="" disabled>
              Choose one
            </option>
            {occasions.map((occasion) => (
              <option key={occasion} value={occasion}>
                {occasion}
              </option>
            ))}
          </select>
        </Field>
        <Field id={`${formId}-date`} label="Date, if you have one">
          <Input
            id={`${formId}-date`}
            name="date"
            type="date"
            className="h-11 bg-white"
          />
        </Field>
      </div>

      <Field id={`${formId}-place`} label="Place or venue">
        <Input
          id={`${formId}-place`}
          name="place"
          autoComplete="off"
          placeholder="A winery, a house, the plaza"
          className="h-11 bg-white"
        />
      </Field>

      <Field
        id={`${formId}-message`}
        label="About the day"
        error={errors.message}
      >
        <Textarea
          id={`${formId}-message`}
          name="message"
          required
          rows={5}
          placeholder="The feeling you want in the room, and roughly how many people."
          aria-invalid={Boolean(errors.message)}
          aria-describedby={
            errors.message ? `${formId}-message-error` : undefined
          }
          className="min-h-32 bg-white"
        />
      </Field>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Button type="submit" className="h-12 rounded-md px-6 text-base">
          Write to the studio
        </Button>
        <p className="max-w-xs text-xs leading-relaxed text-muted-foreground">
          This opens your email app, addressed to {studio.email}. The website
          does not store the message.
        </p>
      </div>
    </form>
  )
}

function Field({
  id,
  label,
  error,
  children,
}: {
  id: string
  label: string
  error?: string
  children: ReactNode
}) {
  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor={id}>{label}</Label>
      {children}
      {error ? (
        <p id={`${id}-error`} className="text-sm text-destructive">
          {error}
        </p>
      ) : null}
    </div>
  )
}
