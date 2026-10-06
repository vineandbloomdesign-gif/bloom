/** Walk-in flowers are gathered in Healdsburg, so ready times are Pacific. */
export const PICKUP_TIME_ZONE = "America/Los_Angeles"

/** Tuesday through Saturday. Sunday is 0. */
export const OPEN_DAYS = [2, 3, 4, 5, 6] as const

export const OPEN_TIME = "10:00"
export const CLOSE_TIME = "17:00"

const WEEKDAYS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
] as const

export type PickupIssue = "missing" | "closed-day" | "hours" | "past"

export type PickupSlot = {
  date: string
  time: string
}

export type PickupSuggestion = PickupSlot & {
  id: string
  label: string
}

export function weekdayOf(date: string) {
  const [year, month, day] = date.split("-").map(Number)
  return new Date(Date.UTC(year, month - 1, day)).getUTCDay()
}

export function minutesOf(time: string) {
  const [hour, minute] = time.split(":").map(Number)
  return hour * 60 + minute
}

function partsInZone(instant: Date) {
  const fmt = new Intl.DateTimeFormat("en-US", {
    timeZone: PICKUP_TIME_ZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  })
  const bag: Record<string, string> = {}
  for (const part of fmt.formatToParts(instant)) {
    if (part.type !== "literal") bag[part.type] = part.value
  }
  return bag
}

/** A calendar date and clock time, read as Pacific Time. */
export function pacificInstant(date: string, time: string) {
  const [year, month, day] = date.split("-").map(Number)
  const [hour, minute] = time.split(":").map(Number)
  const utcGuess = new Date(Date.UTC(year, month - 1, day, hour, minute, 0))
  const shown = partsInZone(utcGuess)
  const shownUtc = Date.UTC(
    Number(shown.year),
    Number(shown.month) - 1,
    Number(shown.day),
    Number(shown.hour),
    Number(shown.minute),
    0
  )
  const offset = shownUtc - utcGuess.getTime()
  return new Date(utcGuess.getTime() - offset)
}

export function pacificDateAndTime(instant: Date): PickupSlot {
  const bag = partsInZone(instant)
  return {
    date: `${bag.year}-${bag.month}-${bag.day}`,
    time: `${bag.hour}:${bag.minute}`,
  }
}

function addDays(date: string, days: number) {
  const [year, month, day] = date.split("-").map(Number)
  const utc = new Date(Date.UTC(year, month - 1, day + days))
  const y = utc.getUTCFullYear()
  const m = String(utc.getUTCMonth() + 1).padStart(2, "0")
  const d = String(utc.getUTCDate()).padStart(2, "0")
  return `${y}-${m}-${d}`
}

function isOpenDay(date: string) {
  return (OPEN_DAYS as readonly number[]).includes(weekdayOf(date))
}

export function validatePickup(
  date: string,
  time: string,
  now = new Date()
): PickupIssue | null {
  if (!date || !time) return "missing"
  if (!isOpenDay(date)) return "closed-day"
  const minutes = minutesOf(time)
  if (minutes < minutesOf(OPEN_TIME) || minutes > minutesOf(CLOSE_TIME)) {
    return "hours"
  }
  if (pacificInstant(date, time).getTime() <= now.getTime()) return "past"
  return null
}

export function pickupIssueMessage(issue: PickupIssue) {
  switch (issue) {
    case "missing":
      return "Set the day and time the flowers will be ready."
    case "closed-day":
      return "Harvest arrangements are ready Tuesday through Saturday."
    case "hours":
      return "Choose a time between 10:00 AM and 5:00 PM."
    case "past":
      return "That time has already passed. Set a later pickup."
  }
}

export function formatPickup(date: string, time: string) {
  const when = new Intl.DateTimeFormat("en-US", {
    timeZone: PICKUP_TIME_ZONE,
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(pacificInstant(date, time))
  return `${when} Pacific`
}

function roundUpQuarter(instant: Date): PickupSlot {
  const slot = pacificDateAndTime(instant)
  const remainder = minutesOf(slot.time) % 15
  if (remainder === 0) return slot
  return pacificDateAndTime(
    new Date(instant.getTime() + (15 - remainder) * 60_000)
  )
}

function nextSlot(now: Date, time: string): PickupSlot {
  let date = pacificDateAndTime(now).date
  for (let i = 0; i < 8; i++) {
    if (
      isOpenDay(date) &&
      pacificInstant(date, time).getTime() > now.getTime()
    ) {
      return { date, time }
    }
    date = addDays(date, 1)
  }
  return { date, time }
}

function clockLabel(slot: PickupSlot, now: Date, clock: string) {
  const today = pacificDateAndTime(now).date
  const tomorrow = addDays(today, 1)
  if (slot.date === today) return `Today, ${clock}`
  if (slot.date === tomorrow) return `Tomorrow, ${clock}`
  return `${WEEKDAYS[weekdayOf(slot.date)]}, ${clock}`
}

function sameSlot(a: PickupSlot, b: PickupSlot) {
  return a.date === b.date && a.time === b.time
}

/** A few ready times the counter can set in one tap. */
export function suggestPickups(now = new Date()): PickupSuggestion[] {
  const suggestions: PickupSuggestion[] = []
  const soon = roundUpQuarter(new Date(now.getTime() + 2 * 60 * 60 * 1000))
  if (!validatePickup(soon.date, soon.time, now)) {
    suggestions.push({ id: "two-hours", label: "Ready in 2 hours", ...soon })
  }

  const morning = nextSlot(now, OPEN_TIME)
  if (!validatePickup(morning.date, morning.time, now)) {
    suggestions.push({
      id: "morning",
      label: clockLabel(morning, now, "10:00 AM"),
      ...morning,
    })
  }

  const afternoon = nextSlot(now, "14:00")
  if (
    !validatePickup(afternoon.date, afternoon.time, now) &&
    !suggestions.some((slot) => sameSlot(slot, afternoon))
  ) {
    suggestions.push({
      id: "afternoon",
      label: clockLabel(afternoon, now, "2:00 PM"),
      ...afternoon,
    })
  }

  return suggestions
}
