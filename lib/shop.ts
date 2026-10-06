import { shopUrl } from "@/lib/studio"

/** Everything currently for sale on the studio shop, in shop order. */
export const shopItems = [
  {
    name: "Arrangement Large",
    price: 15000,
    slug: "arrangement-large-HRQ45ME8FV63G",
  },
  {
    name: "Casket Cover Amazing",
    price: 100000,
    slug: "casket-cover-amazing-Q2MJ22BXPJMQE",
  },
  {
    name: "Casket Cover Deluxe",
    price: 75000,
    slug: "casket-cover-deluxe-G58VB502EF7VC",
  },
  {
    name: "Casket Cover Standard",
    price: 50000,
    slug: "casket-cover-standard-CV2P82VPK654J",
  },
  {
    name: "Single Rose",
    price: 1000,
    slug: "single-rose-7TSNBV7GZZKD4",
  },
  {
    name: "Sympathy Cross Wreath Amazing",
    price: 68900,
    slug: "sympathy-cross-wreath-amazing-Q0VFEG6YAJ8Y2",
  },
  {
    name: "Sympathy Cross Wreath Amazing Plus Stand",
    price: 77400,
    slug: "sympathy-cross-wreath-amazing-plus-stand-4KQZ51F6055F6",
  },
  {
    name: "Sympathy Cross Wreath Large",
    price: 34900,
    slug: "sympathy-cross-wreath-large-YGCPHA7AJ9HXE",
  },
  {
    name: "Sympathy Cross Wreath Plus Stand",
    price: 43400,
    slug: "sympathy-cross-wreath-plus-stand-R9KSCWDVVMZ2W",
  },
  {
    name: "Sympathy Cross Wreath Simple",
    price: 23900,
    slug: "sympathy-cross-wreath-simple-T53Q2ZFCPYRK6",
  },
  {
    name: "Sympathy Wreath Amazing",
    price: 68900,
    slug: "sympathy-wreath-amazing-QY16RSCZF8V2T",
  },
  {
    name: "Sympathy Wreath Amazing Plus Stand",
    price: 77400,
    slug: "sympathy-wreath-amazing-plus-stand-KTZM45F6AV3NR",
  },
  {
    name: "Sympathy Wreath Large",
    price: 34900,
    slug: "sympathy-wreath-large-VTA44JKAGEH9P",
  },
  {
    name: "Sympathy Wreath Large Plus Stand",
    price: 43400,
    slug: "sympathy-wreath-large-plus-stand-EGJ7GF72B2P72",
  },
  {
    name: "Sympathy Wreath Petite",
    price: 23900,
    slug: "sympathy-wreath-petite-HKD59Y9ETNZ1G",
  },
  {
    name: "Wreath Stand",
    price: 8400,
    slug: "wreath-stand-AG5M94BAX3QV2",
  },
] as const

export function shopItemUrl(slug: string) {
  return `${shopUrl}/${slug}`
}
