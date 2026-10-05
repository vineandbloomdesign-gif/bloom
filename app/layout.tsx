import type { Metadata } from "next"
import { Fraunces, Outfit } from "next/font/google"

import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { studio } from "@/lib/studio"

import "./globals.css"

const outfit = Outfit({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
})

const fraunces = Fraunces({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-heading",
  style: ["normal", "italic"],
})

const description =
  "Vine&Bloom is a floral design studio in Healdsburg, California. Seasonal flowers for winery weddings, estate gatherings, private dinners, and weekly arrangements."

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://127.0.0.1:43123"
  ),
  title: "Vine&Bloom · Floral design in Healdsburg",
  description,
  keywords: [
    "Healdsburg florist",
    "Sonoma wedding flowers",
    "wine country floral design",
    "Vine&Bloom",
  ],
  openGraph: {
    title: "Vine&Bloom · Floral design in Healdsburg",
    description,
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/images/og.jpg",
        width: 1200,
        height: 630,
        alt: "Autumn vineyard rows in Sonoma County",
      },
    ],
  },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Florist",
  name: studio.name,
  description,
  email: studio.email,
  address: {
    "@type": "PostalAddress",
    addressLocality: studio.city,
    addressRegion: "CA",
    addressCountry: "US",
  },
  areaServed: "Sonoma County",
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${fraunces.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <a
          href="#content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:bg-background focus:px-4 focus:py-2"
        >
          Skip to content
        </a>
        <SiteHeader />
        {children}
        <SiteFooter />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  )
}
