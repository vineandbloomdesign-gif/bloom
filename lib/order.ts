import { formatMoney } from "@/lib/arrangements"
import { formatPickup } from "@/lib/pickup"
import { studio } from "@/lib/studio"

export type OrderLine = {
  name: string
  quantity: number
  price: number
}

export type OrderTicket = {
  code: string
  name: string
  phone: string
  ready: string
  note: string
  lines: OrderLine[]
}

const CODE_ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"

export function orderCode() {
  const bytes = new Uint8Array(4)
  crypto.getRandomValues(bytes)
  const chars = Array.from(bytes, (byte) => CODE_ALPHABET[byte % CODE_ALPHABET.length])
  return `VB-${chars.join("")}`
}

export function lineCount(lines: OrderLine[]) {
  return lines.reduce((sum, line) => sum + line.quantity, 0)
}

export function orderTotal(lines: OrderLine[]) {
  return lines.reduce((sum, line) => sum + line.price * line.quantity, 0)
}

export function composeOrder(ticket: OrderTicket) {
  const lines = ticket.lines.map((line) => {
    const label = `${line.name} × ${line.quantity}`
    const amount = formatMoney(line.price * line.quantity)
    return `${label.padEnd(28, " ")}${amount}`
  })
  const note = ticket.note.trim()
  return [
    `Seasonal harvest ${ticket.code}`,
    `Name: ${ticket.name}`,
    `Phone: ${ticket.phone}`,
    `Ready for pickup: ${ticket.ready}`,
    "",
    ...lines,
    "",
    `Arrangements: ${lineCount(ticket.lines)}`,
    `Total: ${formatMoney(orderTotal(ticket.lines))}`,
    note ? `\nNote: ${note}` : "",
  ]
    .filter((line, index, all) => line !== "" || all[index - 1] !== "")
    .join("\n")
    .trim()
}

export function orderMailto(ticket: OrderTicket, body: string) {
  const subject = `Vine&Bloom harvest ${ticket.code} · ready ${ticket.ready}`
  return `mailto:${studio.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}

export function formatReady(date: string, time: string) {
  return formatPickup(date, time)
}
