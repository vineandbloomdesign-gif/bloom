"use server"

import {
  composeWedding,
  defaultWeddingCounts,
  formatWeddingDay,
  newWeddingCode,
  selectionFor,
  validateWeddingDate,
  weddingDateMessage,
  weddingMailto,
  weddingPackages,
  type WeddingCountKey,
  type WeddingFormErrors,
  type WeddingFormState,
} from "@/lib/wedding"
import { studio } from "@/lib/studio"

function digits(value: string) {
  return value.replace(/\D/g, "")
}

function countsFrom(formData: FormData) {
  const counts = { ...defaultWeddingCounts }
  for (const key of Object.keys(counts) as WeddingCountKey[]) {
    const raw = Number(formData.get(key))
    if (Number.isFinite(raw)) counts[key] = raw
  }
  return counts
}

export async function requestWedding(
  _previous: WeddingFormState | null,
  formData: FormData
): Promise<WeddingFormState> {
  if (String(formData.get("company") || "").trim()) {
    return {
      ok: true,
      request: {
        code: "VB-NOTE",
        name: "Studio",
        phone: studio.phone,
        day: "Not set",
        venue: "",
        note: "",
        packages: [],
      },
      body: "",
      mailto: "",
    }
  }

  const chosen = new Set(formData.getAll("package").map(String))
  const selected = weddingPackages.filter((pkg) => chosen.has(pkg.id))
  const name = String(formData.get("name") || "").trim()
  const phone = String(formData.get("phone") || "").trim()
  const venue = String(formData.get("venue") || "").trim()
  const weddingDate = String(formData.get("wedding-date") || "")
  const message = String(formData.get("note") || "").trim()
  const errors: WeddingFormErrors = {}

  if (selected.length === 0) {
    errors.packages = "Choose the basic package or the custom package."
  }
  const dateIssue = validateWeddingDate(weddingDate, new Date())
  if (dateIssue) errors.date = weddingDateMessage(dateIssue)
  if (venue.length < 2) errors.venue = "Tell us the venue."
  if (name.length < 2) errors.name = "Add a name."
  if (digits(phone).length < 10) errors.phone = "Add a phone number we can call."
  if (Object.keys(errors).length > 0) return { ok: false, errors }

  const request = {
    code: newWeddingCode(),
    name,
    phone,
    day: formatWeddingDay(weddingDate),
    venue,
    note: message,
    packages: selected.map((pkg) => selectionFor(pkg, countsFrom(formData))),
  }
  const body = composeWedding(request)
  return { ok: true, request, body, mailto: weddingMailto(request, body) }
}
