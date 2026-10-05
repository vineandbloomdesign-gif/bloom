"use client"

import { MenuIcon } from "lucide-react"
import Link from "next/link"

import { Mark } from "@/components/mark"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { nav, studio } from "@/lib/studio"

export function SiteHeader() {
  return (
    <header
      id="top"
      className="sticky top-0 z-40 border-b border-border/80 bg-background/85 backdrop-blur-md"
    >
      <div className="mx-auto flex h-[4.25rem] w-full max-w-6xl items-center justify-between gap-4 px-5 md:px-8">
        <Link href="/" className="flex items-center gap-2.5 text-foreground">
          <Mark className="size-11 shrink-0 rounded-full" />
          <span className="font-heading text-[1.35rem] leading-none tracking-tight">
            Vine<span className="italic text-primary">&</span>Bloom
          </span>
          <span className="sr-only">, home</span>
        </Link>

        <nav className="hidden items-center gap-5 xl:gap-7 lg:flex" aria-label="Primary">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-foreground/75 transition-colors hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <Button
          nativeButton={false}
          render={<Link href="/order" />}
          className="hidden h-10 rounded-md px-4 lg:inline-flex"
        >
          Order stems
        </Button>

        <Sheet>
          <SheetTrigger
            nativeButton
            render={
              <Button
                variant="outline"
                size="icon"
                className="lg:hidden"
                aria-label="Open menu"
              />
            }
          >
            <MenuIcon />
          </SheetTrigger>
          <SheetContent
            side="right"
            className="w-full border-border bg-background sm:max-w-sm"
          >
            <SheetHeader className="pr-10">
              <SheetTitle className="font-heading text-2xl tracking-tight">
                Vine&Bloom
              </SheetTitle>
              <SheetDescription>
                {studio.descriptor} in {studio.city}
              </SheetDescription>
            </SheetHeader>
            <nav className="flex flex-col px-4" aria-label="Mobile">
              {nav.map((item) => (
                <SheetClose
                  key={item.href}
                  nativeButton={false}
                  render={
                    <Link
                      href={item.href}
                      className="border-b border-border py-4 font-heading text-3xl tracking-tight text-foreground"
                    />
                  }
                >
                  {item.label}
                </SheetClose>
              ))}
            </nav>
            <div className="mt-auto p-4">
              <SheetClose
                nativeButton={false}
                render={<Link href="/order" className="block" />}
              >
                <Button className="h-12 w-full rounded-md text-base">
                  Order stems
                </Button>
              </SheetClose>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
