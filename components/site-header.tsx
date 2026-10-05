"use client"

import { MenuIcon } from "lucide-react"

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
        <a
          href="#top"
          className="flex items-center gap-2.5 text-foreground"
        >
          <Mark className="size-8 text-primary" />
          <span className="font-heading text-[1.35rem] leading-none tracking-tight">
            Vine<span className="italic text-primary">&</span>Bloom
          </span>
          <span className="sr-only">, home</span>
        </a>

        <nav className="hidden items-center gap-7 md:flex" aria-label="Primary">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm text-foreground/75 transition-colors hover:text-foreground"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-4 md:flex">
          <a
            href={studio.phoneHref}
            className="hidden text-sm text-foreground/80 hover:text-foreground lg:inline"
          >
            {studio.phone}
          </a>
          <Button
            nativeButton={false}
            render={<a href="#visit" />}
            className="h-10 rounded-md px-4"
          >
            Inquire
          </Button>
        </div>

        <Sheet>
          <SheetTrigger
            nativeButton
            render={
              <Button
                variant="outline"
                size="icon"
                className="md:hidden"
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
                    <a
                      href={item.href}
                      className="border-b border-border py-4 font-heading text-3xl tracking-tight text-foreground"
                    />
                  }
                >
                  {item.label}
                </SheetClose>
              ))}
            </nav>
            <div className="mt-auto flex flex-col gap-3 p-4">
              <a
                className="text-sm text-foreground underline decoration-border underline-offset-4"
                href={`mailto:${studio.email}`}
              >
                {studio.email}
              </a>
              <a className="text-sm text-foreground" href={studio.phoneHref}>
                {studio.phone}
              </a>
              <SheetClose
                nativeButton={false}
                render={<a href="#visit" className="block" />}
              >
                <Button className="h-12 w-full rounded-md text-base">
                  Inquire
                </Button>
              </SheetClose>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
